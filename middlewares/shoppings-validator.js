import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateShopping = [
    body('cuenta_id')
        .notEmpty()
        .withMessage('El ID de la cuenta que realiza el pago es obligatorio')
        .isInt()
        .withMessage('cuenta_id debe ser un número entero válido'),

    body('producto_id')
        .notEmpty()
        .withMessage('El ID del producto a comprar es obligatorio')
        .isInt()
        .withMessage('producto_id debe ser un número entero válido'),

    body('monto')
        .notEmpty()
        .withMessage('El monto de la compra es requerido')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El monto debe ser un número decimal válido (ej: 99.99)')
        .custom((value) => {
            if (parseFloat(value) <= 0) {
                throw new Error('El monto de la compra debe ser mayor a 0');
            }
            return true;
        }),

    body('estado')
        .optional()
        .toUpperCase()
        .isIn(['COMPLETADO', 'ANULADO'])
        .withMessage('Estado de compra no válido (COMPLETADO o ANULADO)'),

    checkValidators,
];

export const validateGetShoppingById = [
    param('id')
        .isInt()
        .withMessage('ID de compra no válido'),
    checkValidators,
];