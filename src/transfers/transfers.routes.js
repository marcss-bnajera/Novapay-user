`use strict`

import { Router } from "express";
import {
    makeTransfer,
    getTransferById
} from "./transfers.controller.js";
import { validateCreateTransfer, validateGetTransferHistory } from '../../middlewares/transfers-validator.js'

const router = Router();

// Ejecución de movimientos
router.post("/", makeTransfer, validateCreateTransfer);
router.get("/:id", getTransferById, validateGetTransferHistory);

export default router;