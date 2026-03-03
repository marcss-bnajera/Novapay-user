import { Router } from "express";
import {
    getTransactions,
    getTransactionById
} from "./transactions.controller.js";
import { validateGetTransactionHistory } from '../../middlewares/transactions-vallidator.js'
const router = Router();

router.get('/', getTransactions);
router.get('/:id', getTransactionById, validateGetTransactionHistory);

export default router;