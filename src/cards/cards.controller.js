'use strict'

import { Card } from "./cards.model.js";
import { Account } from "../accounts/accounts.model.js";

export const getCardsByAccount = async (req, res) => {
    try {

        const { id } = req.params;

        const account = await Account.findByPk(id);

        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        const cards = await Card.findAll({
            where: { account_id: id }
        });

        if (cards.length === 0) {
            return res.json({
                success: true,
                message: "Esta cuenta no tiene tarjetas asignadas",
                cards: []
            });
        }

        return res.json({
            success: true,
            cards
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching cards",
            error: error.message
        });
    }
};