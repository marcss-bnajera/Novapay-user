'use strict';

import { Router } from "express";
import {
    getProducts,
    getProductById
} from "./products.controller.js";
import { validateGetProductById } from '../../middlewares/products-validator.js'

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById, validateGetProductById);

export default router;