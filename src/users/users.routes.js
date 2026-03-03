`use strict`

import { Router } from "express";
import {
    getProfile,
    updateUser
} from "./users.controller.js";
import { validateGetProfile, validateUpdateUser } from '../../middlewares/users-validator.js'

const router = Router();

// Rutas para el Cliente
router.get('/:id', getProfile, validateGetProfile);   // Ver mi perfil
router.put('/:id', updateUser, validateUpdateUser);   // Editar datos permitidos 

export default router;