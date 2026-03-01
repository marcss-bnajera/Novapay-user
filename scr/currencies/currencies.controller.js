`use strict`

import { Currency } from "./currencies.model.js"

// Funciones de usuario

// Ver todas las divisas disponibles (GET)
export const getCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.findAll();
        res.status(200).json({
            success: true,
            total: currencies.length,
            currencies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching currencies",
            error: error.message
        });
    }
};
