'use strict'

import { Passbook } from "./passbooks.model.js";
import { Account } from "../accounts/accounts.model.js";

export const getPassbookByAccount = async (req, res) => {
    try {

        const { id } = req.params;

        const account = await Account.findByPk(id);

        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        const passbook = await Passbook.findOne({
            where: { account_id: id }
        });

        if (!passbook) {
            return res.json({
                success: true,
                message: "Esta cuenta no tiene libretas asignadas",
                passbook: null
            });
        }

        return res.json({
            success: true,
            passbook
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching passbook",
            error: error.message
        });
    }
};