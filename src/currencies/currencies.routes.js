import { Router } from "express";
import { convertCurrency } from "./currencies.controller.js";

const router = Router();
router.get('/convert/:id', convertBalance);
export default router;