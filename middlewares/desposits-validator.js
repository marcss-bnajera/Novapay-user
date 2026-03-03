import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateDeposit = [
    body('cuenta_id')
        .notEmpty()
        .withMessage('El ID de la cuenta destino es obligatorio')
        .isInt()
        .withMessage('cuenta_id debe ser un número entero válido'),

    body('monto')
        .notEmpty()
        .withMessage('El monto del depósito es requerido')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El monto debe ser un número decimal válido (máximo 2 decimales)')
        .custom((value) => {
            if (parseFloat(value) <= 0) {
                throw new Error('El monto a depositar debe ser mayor a 0');
            }
            return true;
        }),

    body('estado')
        .optional()
        .isIn(['PENDIENTE', 'COMPLETADO', 'RECHAZADO'])
        .withMessage('Estado de depósito no válido'),

    checkValidators,
];

export const validateGetDeposit = [
    param('id')
        .optional()
        .isInt()
        .withMessage('El ID del depósito debe ser un número entero'),

    param('cuenta_id')
        .optional()
        .isInt()
        .withMessage('El ID de la cuenta debe ser un número entero'),

    checkValidators,
];