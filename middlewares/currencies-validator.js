import { param, query } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateConvertCurrency = [
    param('id')
        .notEmpty()
        .withMessage('El número de cuenta es obligatorio en la URL')
        .isLength({ min: 10, max: 12 })
        .withMessage('El número de cuenta debe tener entre 10 y 12 dígitos')
        .isNumeric()
        .withMessage('El número de cuenta debe contener solo números'),

    query('to')
        .optional()
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage('El código de moneda debe tener 3 caracteres (ej: USD, EUR)')
        .isAlpha()
        .withMessage('El código de moneda solo debe contener letras'),

    checkValidators,
];