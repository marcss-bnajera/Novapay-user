import { Router } from "express";
import { getMyTransactions } from "./transactions.controller.js";
import { validateGetTransactionHistory } from '../../middlewares/transactions-vallidator.js'
const router = Router();

router.get('/:id', validateGetTransactionHistory, getMyTransactions);

export default router;