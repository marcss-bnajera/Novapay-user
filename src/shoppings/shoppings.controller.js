'use strict';

import { Shopping } from "./shoppings.model.js";
import { Product } from "../products/products.model.js";
import { Account } from "../accounts/accounts.model.js";
import { db } from "../../configs/db.js";

// 1. Get obtener compras de un usuario
export const getShoppings = async (req, res) => {
    try {
        const { cuenta_id } = req.query;

        if (!cuenta_id) {
            return res.status(400).json({
                success: false,
                message: "Se requiere el cuenta_id para ver el historial"
            });
        }

        const shoppings = await Shopping.findAll({
            where: { cuenta_id },
            include: [{ model: Product, attributes: ['name', 'category'] }],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: "Historial de compras obtenido correctamente",
            total: shoppings.length,
            shoppings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las compras",
            error: error.message
        });
    }
};

// 2. Get obtener una cuenta por id
export const getShoppingById = async (req, res) => {
    try {
        const { id } = req.params;
        const shopping = await Shopping.findByPk(id, {
            include: [Product, Account]
        });

        if (!shopping) {
            return res.status(404).json({
                success: false,
                message: "Compra no encontrada"
            });
        }

        res.status(200).json({
            success: true,
            shopping
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar la compra",
            error: error.message
        });
    }
};

// 3. Post Crear compra
export const createShopping = async (req, res) => {
    const t = await db.transaction();
    try {
        const { cuenta_id, producto_id } = req.body;

        const product = await Product.findByPk(producto_id);
        if (!product || product.state !== 'ACTIVE') {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Producto no disponible" });
        }

        const precioReal = parseFloat(product.dataValues.price || product.price);

        const account = await Account.findOne({
            where: { numero_cuenta: cuenta_id }
        });

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
                detalles: { requerido: precioReal, actual: saldoActual }
            });
        }

        const nuevoSaldo = saldoActual - precioReal;

        // Actualizar Saldo
        await account.update({ balance: nuevoSaldo }, { transaction: t });

        const shopping = await Shopping.create({
            cuenta_id: account.id, // ID interno para la relación
            producto_id,
            monto: precioReal,
            estado: 'COMPLETADO',
            fecha: new Date()
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            success: true,
            message: "¡Compra exitosa! Disfruta tu producto.",
            data: {
                ticket: shopping.id,
                monto_pagado: precioReal,
                nuevo_saldo: nuevoSaldo,
                producto: product.name
            }
        });

    } catch (error) {
        if (t) await t.rollback();
        res.status(500).json({
            success: false,
            message: "Error crítico al procesar la compra",
            error: error.message
        });
    }
};