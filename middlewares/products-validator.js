import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateGetProductById = [
    param('id')
        .isInt()
        .withMessage('El ID del producto debe ser un número entero válido'),
    checkValidators,
];