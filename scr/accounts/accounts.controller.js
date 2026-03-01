`use strict`

import { Account } from "./accounts.model.js"

// Ver mis cuentas y saldo
export const getMyAccounts = async (req, res) => {
    try {
        const { usuario_id } = req.params; // Después será por Token
        const accounts = await Account.findAll({
            where: { usuario_id, estado: 'ACTIVA' }
        });

        res.status(200).json({ success: true, accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener cuentas", error: error.message });
    }
};