import { Router } from "express";
import { convertCurrency } from "./currencies.controller.js";
import { validateConvertCurrency } from '../../middlewares/currencies-validator.js'

const router = Router();
router.get('/convert/:id', convertCurrency, validateConvertCurrency);
export default router;