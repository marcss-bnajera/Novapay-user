'use strict';

import { Shopping } from "./shoppings.model.js";
import { Product } from "../products/products.model.js";
import { Account } from "../accounts/accounts.model.js";
import { db } from "../../configs/db.js";

// Funciones de usuario

//Obtener todas las compras (GET) del usuario loggueado (falta)
export const getShoppings = async (req, res) => {
    try {
        const shoppings = await Shopping.findAll();
        res.status(200).json(
            {
                success: true,
                total: shoppings.length,
                shoppings
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error al obtener las compras",
                error: error.message
            }
        );
    }
};

//Obtener una compra por ID (GET) del usuario loggueado (falta)
export const getShoppingById = async (req, res) => {
    try {
        const { id } = req.params;
        const shopping = await Shopping.findByPk(id);

        if (!shopping) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Compra no encontrada"
                }
            );
        }

        res.status(200).json(
            {
                success: true,
                shopping
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error al buscar la compra",
                error: error.message
            }
        );
    }
};

// CREAR UNA COMPRA 
export const createShopping = async (req, res) => {
    const t = await db.transaction();
    try {
        const { cuenta_id, producto_id } = req.body;


        const product = await Product.findByPk(producto_id);
        if (!product || product.state !== 'ACTIVE') {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Producto no disponible" });
        }

        const precioReal = product.dataValues.price || product.price;

        const account = await Account.findByPk(cuenta_id);
        if (!account || account.estado !== 'ACTIVA') {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Cuenta no válida o inactiva" });
        }

        const saldoActual = parseFloat(account.balance);

        if (saldoActual < precioReal) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Saldo insuficiente",
                requerido: precioReal,
                actual: saldoActual
            });
        }

        await account.update({
            balance: saldoActual - precioReal
        }, { transaction: t });

        const shopping = await Shopping.create({
            cuenta_id: cuenta_id,
            producto_id: producto_id,
            monto: precioReal,
            fecha: new Date()
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            success: true,
            message: "Compra realizada con éxito",
            shopping
        });

    } catch (error) {
        if (t) await t.rollback();
        res.status(500).json({
            success: false,
            message: "Error al procesar la compra",
            error: error.message
        });
    }
};
