import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTransfer = [
    body('account_origin_id')
        .notEmpty()
        .withMessage('El ID de la cuenta de origen es obligatorio')
        .isInt()
        .withMessage('account_origin_id debe ser un número entero válido'),

    body('numero_cuenta_destino')
        .notEmpty()
        .withMessage('El número de cuenta destino es obligatorio')
        .isLength({ min: 10, max: 10 })
        .withMessage('El número de cuenta destino debe tener exactamente 10 dígitos')
        .isNumeric()
        .withMessage('El número de cuenta destino solo debe contener números'),

    body('amount')
        .notEmpty()
        .withMessage('El monto es requerido')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El monto debe ser un número decimal válido (ej: 100.00)')
        .custom((value) => {
            if (parseFloat(value) <= 0) {
                throw new Error('El monto a transferir debe ser mayor a cero');
            }
            return true;
        }),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('La descripción de la transferencia es obligatoria')
        .isLength({ min: 5, max: 255 })
        .withMessage('La descripción debe tener entre 5 y 255 caracteres'),

    checkValidators,
];

export const validateGetTransferHistory = [
    param('id')
        .isInt()
        .withMessage('El ID de la cuenta debe ser un número entero'),
    checkValidators,
];