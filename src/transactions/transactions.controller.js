'use strict'

import { Transaction } from "./transactions.model.js";
import { Account } from "../accounts/accounts.model.js";

export const getMyTransactions = async (req, res) => {
    try {

        const { id } = req.params;

        const accounts = await Account.findAll({
            where: { usuario_id: id }
        });

        const accountIds = accounts.map(acc => acc.id);

        const transactions = await Transaction.findAll({
            where: {
                account_id: accountIds
            },
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            success: true,
            total: transactions.length,
            transactions
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching transactions",
            error: error.message
        });
    }
};