import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';


export const validateGetTransactionHistory = [
    param('id')
        .isInt()
        .withMessage('ID de la transaccion no válido para consultar historial'),
    checkValidators,
];