import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateAccountId = [
    param('usuario_id')
        .isInt()
        .withMessage('El ID de el usuario debe ser un número entero válido'),
    checkValidators,
];
