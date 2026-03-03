import { Router } from "express";
import {
    addFavorite,
    getFavorites,
    removeFavorite,
    updateFavoriteAlias
} from "./favorites.controller.js";

const router = Router();

router.post('/add', addFavorite);
router.get('/:usuario_id', getFavorites);
router.put('/:id', updateFavoriteAlias);
router.delete('/:id', removeFavorite);

export default router;