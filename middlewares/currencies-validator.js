import { param, query } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateConvertCurrency = [
    // Validar el número de cuenta en la URL (parámetro)
    param('account_number')
        .notEmpty()
        .withMessage('El número de cuenta es obligatorio en la URL')
        .isLength({ min: 12, max: 12 })
        .withMessage('El número de cuenta debe tener exactamente 12 dígitos')
        .isNumeric()
        .withMessage('El número de cuenta debe contener solo números'),

    // Validar la moneda de destino en la Query String (?to=USD)
    query('to')
        .optional() // Es opcional porque en tu código pusiste: (req.query.to || 'USD')
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage('El código de moneda debe tener 3 caracteres (ej: USD, EUR, MXN)')
        .isAlpha()
        .withMessage('El código de moneda solo debe contener letras')
        .toUpperCase(),

    checkValidators,
];