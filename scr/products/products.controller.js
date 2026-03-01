'use strict';

import { Product } from "./products.model.js";

// Funciones de usuario 

// Obtener todos los productos (GET)
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
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

// Obtener producto por ID (GET)
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
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
        })
    }
}
