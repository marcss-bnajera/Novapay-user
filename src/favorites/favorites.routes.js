import { Router } from "express";
import {
    addFavorite,
    getFavorites,
    removeFavorite,
    updateFavoriteAlias
} from "./favorites.controller.js";
import { validateCreateFavorite, validateUpdateFavorite, validateDeleteFavorite, validateGetFavorites } from '../../middlewares/favorites-validator.js'

const router = Router();

router.post('/add', addFavorite, validateCreateFavorite);
router.get('/:usuario_id', getFavorites, validateGetFavorites);
router.put('/:id', updateFavoriteAlias, validateUpdateFavorite);
router.delete('/:id', removeFavorite, validateDeleteFavorite);

export default router;