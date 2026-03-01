`use strict`

import { Router } from "express";
import {
    getProfile,
    updateUser
} from "./users.controller.js";

const router = Router();

// Rutas para el Cliente
router.get('/:id', getProfile);   // Ver mi perfil
router.put('/:id', updateUser);   // Editar datos permitidos 



export default router;