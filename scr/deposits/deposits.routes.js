import { Router } from "express";
import {
    getDepositById,
    createDeposit,
} from "./deposits.controller.js";

const router = Router();

router.get('/:id', getDepositById);
router.post('/', createDeposit);


export default router;