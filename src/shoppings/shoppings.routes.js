'use strict';

import { Router } from "express";
import {
    getShoppings,
    getShoppingById,
    createShopping
} from "./shoppings.controller.js";

const router = Router();

router.get("/", getShoppings);
router.get("/:id", getShoppingById);
router.post("/", createShopping);

export default router;