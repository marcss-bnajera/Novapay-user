import { Router } from "express";
import {
    getDepositById,
    createDeposit,
} from "./deposits.controller.js";
import { validateCreateDeposit, validateGetDeposit } from '../../middlewares/desposits-validator.js'

const router = Router();

router.get('/:id', getDepositById, validateGetDeposit);
router.post('/', createDeposit, validateCreateDeposit);


export default router;