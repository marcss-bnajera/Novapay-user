'use strict';

import { Product } from "./products.model.js";
import { Op } from "sequelize";

/**
 * Obtener todos los productos ACTIVOS (GET)
 * El usuario solo debe ver lo que está disponible para la venta
 */
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                state: 'ACTIVE'
            }
        });

        res.status(200).json({
            success: true,
            total: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener productos",
            error: error.message
        });
    }
};

/**
 * Obtener producto por ID (GET)
 * Verifica existencia y que el estado sea ACTIVE
 */
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product || product.state !== 'ACTIVE') {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado o no disponible"
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar el producto",
            error: error.message
        });
    }
};