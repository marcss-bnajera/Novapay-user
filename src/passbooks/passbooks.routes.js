'use strict'

import { Router } from "express";
import { getPassbookByAccount } from "./passbooks.controller.js";

const router = Router();

router.get("/account/:id", getPassbookByAccount);

export default router;