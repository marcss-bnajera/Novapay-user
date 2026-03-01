`use strict`

import { Transfer } from "./transfers.model.js";
import { Account } from "../accounts/accounts.model.js";
import { db } from "../../configs/db.js";
import { Op } from "sequelize";

// 1. Realizar Transferencia 
export const makeTransfer = async (req, res) => {
    const t = await db.transaction();
    try {
        const { account_origin_id, numero_cuenta_destino, amount, description } = req.body;
        const transferAmount = parseFloat(amount);

        // Validación de monto por transacción
        if (transferAmount > 2000) {
            await t.rollback();
            return res.status(400).json({ message: "El monto máximo por transferencia es de Q2,000" });
        }

        // Buscar cuenta origen y destino
        const originAccount = await Account.findByPk(account_origin_id);
        const destinationAccount = await Account.findOne({
            where: { numero_cuenta: numero_cuenta_destino, estado: 'ACTIVA' }
        });

        if (!originAccount || !destinationAccount) {
            await t.rollback();
            return res.status(404).json({ message: "Cuenta de origen o destino no encontrada o inactiva" });
        }

        // Validar Saldo Suficiente
        if (parseFloat(originAccount.balance) < transferAmount) {
            await t.rollback();
            return res.status(400).json({ message: "Saldo insuficiente" });
        }

        // Validar Límite Diario
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const dailyTotal = await Transfer.sum('amount', {
            where: {
                account_origin_id,
                date: { [Op.gte]: startOfDay }
            }
        }) || 0;

        if ((parseFloat(dailyTotal) + transferAmount) > 10000) {
            await t.rollback();
            return res.status(400).json({ message: "Has excedido el límite de transferencias diarias (Q10,000)" });
        }

        // Ejecutar Movimientos (Débito y Crédito)
        await originAccount.update({
            balance: parseFloat(originAccount.balance) - transferAmount
        }, { transaction: t });

        await destinationAccount.update({
            balance: parseFloat(destinationAccount.balance) + transferAmount
        }, { transaction: t });

        // Registrar la transferencia
        await Transfer.create({
            account_origin_id: originAccount.id,
            account_destination_id: destinationAccount.id,
            amount: transferAmount,
            description: description || "Transferencia NovaPay"
        }, { transaction: t });

        await t.commit();
        res.status(200).json({ success: true, message: "Transferencia realizada con éxito" });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ success: false, error: error.message });
    }
};

// 2. Obtener detalle de una transferencia por ID
export const getTransferById = async (req, res) => {
    try {
        const { id } = req.params;
        const transfer = await Transfer.findByPk(id, {
            include: [
                { model: Account, as: 'Origin', attributes: ['numero_cuenta', 'nombre_cuenta'] },
                { model: Account, as: 'Destination', attributes: ['numero_cuenta', 'nombre_cuenta'] }
            ]
        });

        if (!transfer) {
            return res.status(404).json({ success: false, message: "Transferencia no encontrada" });
        }

        res.status(200).json({ success: true, transfer });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener la transferencia", error: error.message });
    }
};