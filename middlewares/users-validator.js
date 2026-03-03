import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// 1. Validar para obtener el perfil (GET)
export const validateGetProfile = [
    param('id')
        .notEmpty().withMessage('El ID del usuario es necesario')
        .isInt().withMessage('El ID debe ser un número entero válido'),
    checkValidators
];

// 2. Validar para actualizar el perfil (PUT)
export const validateUpdateUser = [
    param('id')
        .isInt().withMessage('El ID en la URL debe ser un número entero'),

    body('nombre')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('apellido')
        .optional()
        .trim()
        .notEmpty().withMessage('El apellido no puede estar vacío'),

    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Debe ser un formato de email válido'),

    body('telefono')
        .optional()
        .trim()
        .isLength({ min: 8 }).withMessage('El teléfono debe tener al menos 8 dígitos'),

    body('direccion')
        .optional()
        .trim()
        .notEmpty().withMessage('La dirección no puede estar vacía'),

    body('nombre_trabajo')
        .optional()
        .trim()
        .notEmpty().withMessage('El lugar de trabajo no puede estar vacío'),

    body('ingresos_mensuales')
        .optional()
        .isDecimal({ decimal_digits: '0,2' }).withMessage('Los ingresos deben ser un número válido')
        .custom(value => parseFloat(value) >= 0).withMessage('Los ingresos no pueden ser negativos'),

    body(['dpi', 'password', 'role_id', 'active', 'username'])
        .not().exists()
        .withMessage('No tienes permisos para modificar campos sensibles (DPI, Password, Rol, etc.) desde esta ruta'),

    checkValidators
];