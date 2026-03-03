import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTransfer = [
    body('account_origin_id')
        .notEmpty()
        .withMessage('El ID de la cuenta de origen es obligatorio')
        .isInt()
        .withMessage('account_origin_id debe ser un número entero válido'),

    body('account_destination_id')
        .notEmpty()
        .withMessage('El ID de la cuenta de destino es obligatorio')
        .isInt()
        .withMessage('account_destination_id debe ser un número entero válido')
        .custom((value, { req }) => {
            if (parseInt(value) === parseInt(req.body.account_origin_id)) {
                throw new Error('No se permite transferir dinero a la misma cuenta de origen');
            }
            return true;
        }),

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