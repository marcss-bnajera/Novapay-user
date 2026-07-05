`use strict`

import { Router } from "express";
import {
    makeTransfer
} from "./transfers.controller.js";
import { validateCreateTransfer, validateGetTransferHistory } from '../../middlewares/transfers-validator.js'

const router = Router();

// Ejecución de movimientos
router.post("/", validateCreateTransfer, makeTransfer);

export default router;