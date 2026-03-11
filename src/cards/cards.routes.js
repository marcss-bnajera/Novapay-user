'use strict'

import { Router } from "express";
import { getCardsByAccount } from "./cards.controller.js";

const router = Router();

router.get("/account/:id", getCardsByAccount);

export default router;