'use strict'

import { Transfer } from "./transfers.model.js";
import { Account } from "../accounts/accounts.model.js";
import { Transaction } from "../transactions/transactions.model.js";
import { db } from "../../configs/db.js";

export const makeTransfer = async (req, res) => {

    const t = await db.transaction();

    try {
        const { account_origin_id, numero_cuenta_destino, amount, description } = req.body;
        const transferAmount = parseFloat(amount);
        const originAccount = await Account.findByPk(account_origin_id);
        const destinationAccount = await Account.findOne({
            where: { numero_cuenta: numero_cuenta_destino }
        });

        if (!originAccount || !destinationAccount) {
            await t.rollback();
            return res.status(404).json({ message: "Cuenta inválida" });
        }

        if (parseFloat(originAccount.balance) < transferAmount) {
            await t.rollback();
            return res.status(400).json({ message: "Saldo insuficiente" });
        }

        const newOriginBalance = parseFloat(originAccount.balance) - transferAmount;
        const newDestinationBalance = parseFloat(destinationAccount.balance) + transferAmount;

        await originAccount.update({
            balance: newOriginBalance
        }, { transaction: t });

        await destinationAccount.update({
            balance: newDestinationBalance
        }, { transaction: t });

        await Transfer.create({
            account_origin_id: originAccount.id,
            account_destination_id: destinationAccount.id,
            amount: transferAmount,
            description
        }, { transaction: t });

        await Transaction.create({
            account_id: originAccount.id,
            type: "transfer_out",
            amount: transferAmount,
            reference_account_id: destinationAccount.id,
            description: "Transferencia enviada",
            balance_after: newOriginBalance
        }, { transaction: t });

        await Transaction.create({
            account_id: destinationAccount.id,
            type: "transfer_in",
            amount: transferAmount,
            reference_account_id: originAccount.id,
            description: "Transferencia recibida",
            balance_after: newDestinationBalance
        }, { transaction: t });

        await t.commit();

        res.status(200).json({
            success: true,
            message: "Transferencia realizada"
        });

    } catch (error) {

        await t.rollback();

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

};