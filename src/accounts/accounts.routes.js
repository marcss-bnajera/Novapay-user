import { Router } from "express";
import {
    getMyAccounts
} from "./accounts.controller.js";
import { validateAccountId } from '../../middlewares/accounts-validator.js'

const router = Router();

router.get('/:usuario_id', getMyAccounts, validateAccountId);

export default router;