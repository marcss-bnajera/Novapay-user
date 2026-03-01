`use strict`

import { Account } from "./accounts.model.js"

// Funciones de cuenta de usuario

// GetMyAccoutns (falta)

// Crear cuenta (POST)
// El usuario logueado es el que crea la cuenta (falta)
export const createAccount = async (req, res) => {
    try {
        const { numero_cuenta, nombre_cuenta, tipo_cuenta, estado, balance, usuario_id } = req.body;

        const account = await Account.create({
            numero_cuenta,
            nombre_cuenta,
            tipo_cuenta,
            estado,
            balance,
            usuario_id
        });

        res.status(201).json({
            success: true,
            message: "Cuenta creada"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear la cuenta",
            error: error.message
        });
    }
};
