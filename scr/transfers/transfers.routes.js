`use strict`

import { Router } from "express";
import { getTransfers, getTransferById, createTransfer } from "./transfers.controller.js";

const router = Router();

router.get("/", getTransfers);
router.get("/:id", getTransferById);
router.post("/", createTransfer);

export default router;