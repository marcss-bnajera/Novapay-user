'use strict';

import { Router } from "express";
import {
    getShoppings,
    getShoppingById,
    createShopping
} from "./shoppings.controller.js";
import { validateCreateShopping, validateGetShoppingById } from '../../middlewares/shoppings-validator.js'

const router = Router();

router.get("/", getShoppings);
router.get("/:id", getShoppingById, validateGetShoppingById);
router.post("/", createShopping, validateCreateShopping);

export default router;