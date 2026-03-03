import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateFavorite = [
    body('usuario_id')
        .notEmpty()
        .withMessage('El ID del usuario dueño de la lista es requerido')
        .isInt()
        .withMessage('usuario_id debe ser un número entero válido'),

    body('numero_cuenta_favorito')
        .notEmpty()
        .withMessage('El número de cuenta favorito es obligatorio')
        .isLength({ min: 12, max: 12 })
        .withMessage('El número de cuenta debe tener exactamente 12 dígitos')
        .isNumeric()
        .withMessage('El número de cuenta solo debe contener números'),

    body('alias')
        .trim()
        .notEmpty()
        .withMessage('El alias es requerido (ej: "Cuenta de Ahorros Mamá")')
        .isLength({ min: 2, max: 50 })
        .withMessage('El alias debe tener entre 2 y 50 caracteres'),

    checkValidators,
];

export const validateUpdateFavorite = [
    param('id')
        .isInt()
        .withMessage('El ID del favorito debe ser un número entero'),

    body('alias')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El alias debe tener entre 2 y 50 caracteres'),

    body('numero_cuenta_favorito')
        .optional()
        .isLength({ min: 12, max: 12 })
        .withMessage('El número de cuenta debe tener 12 dígitos'),

    checkValidators,
];

export const validateDeleteFavorite = [
    param('id')
        .isInt()
        .withMessage('ID de favorito no válido'),
    checkValidators
];
export const validateGetFavorites = [
    param('usuario_id')
        .notEmpty()
        .withMessage('El ID del usuario es requerido para ver su lista de favoritos')
        .isInt()
        .withMessage('usuario_id debe ser un número entero válido (Postgres ID)'),
    checkValidators,
];