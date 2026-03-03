import { Router } from "express";
import {
    getMyAccounts
} from "./accounts.controller.js";

const router = Router();

router.get('/:usuario_id', getMyAccounts);

export default router;