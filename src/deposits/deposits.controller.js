`use strict`

import { Deposit } from "./deposits.model.js"

// Obtener depósito por ID (GET) del usuario logueado (falta)
export const getDepositById = async (req, res) => {
    try {
        const { id } = req.params;
        const deposit = await Deposit.findByPk(id);

        if (!deposit) {
            return res.status(404).json({
                success: false,
                message: "Depósito no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            deposit
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Error al buscar el depósito",
            error: error.message
        })
    }
}

// Crear (POST) del usuario logueado (falta)
export const createDeposit = async (req, res) => {
    try {
        const { cuenta_id, monto, fecha, estado } = req.body;

        const deposit = await Deposit.create({
            cuenta_id,
            monto,
            fecha,
            estado
        });

        res.status(201).json({
            success: true,
            message: "Depósito realizado con éxito"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el depósito",
            error: error.message
        });
    }
};
