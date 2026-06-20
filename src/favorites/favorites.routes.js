import { Router } from "express";
import {
    addFavorite,
    getFavorites,
    removeFavorite,
    updateFavoriteAlias
} from "./favorites.controller.js";
import { validateCreateFavorite, validateUpdateFavorite, validateDeleteFavorite, validateGetFavorites } from '../../middlewares/favorites-validator.js'

const router = Router();

router.post('/add', validateCreateFavorite, addFavorite);
router.get('/:usuario_id', validateGetFavorites, getFavorites);
router.put('/:id', validateUpdateFavorite, updateFavoriteAlias);
router.delete('/:id', validateDeleteFavorite, removeFavorite);

export default router;