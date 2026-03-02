import { Router } from "express";
import { convertBalance } from "./currencies.controller.js";

const router = Router();
router.get('/convert/:id', convertBalance);
export default router;