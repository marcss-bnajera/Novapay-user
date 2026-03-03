`use strict`

import { Router } from "express";
import {
    makeTransfer,
    getTransferById
} from "./transfers.controller.js";

const router = Router();

// Ejecución de movimientos
router.post("/", makeTransfer);
router.get("/:id", getTransferById);

export default router;