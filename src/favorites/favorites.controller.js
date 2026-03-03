import { Favorite } from "./favorites.model.js";
import { Account } from "../accounts/accounts.model.js";

// AGREGAR FAVORITO
export const addFavorite = async (req, res) => {
    try {
        const { usuario_id, numero_cuenta_favorito, alias } = req.body;

        const miCuenta = await Account.findOne({ where: { usuario_id } });
        if (miCuenta && miCuenta.numero_cuenta === numero_cuenta_favorito) {
            return res.status(400).json({
                success: false,
                message: "No puedes agregarte a ti mismo como favorito."
            });
        }

        const accountExists = await Account.findOne({ where: { numero_cuenta: numero_cuenta_favorito } });
        if (!accountExists) {
            return res.status(404).json({
                success: false,
                message: "La cuenta que intentas agregar no existe en NovaPay."
            });
        }

        const newFavorite = await Favorite.create({ usuario_id, numero_cuenta_favorito, alias });

        res.status(201).json({
            success: true,
            message: "Favorito guardado",
            favorite: newFavorite
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// LISTAR FAVORITOS
export const getFavorites = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const favorites = await Favorite.findAll({ where: { usuario_id } });
        res.status(200).json({ success: true, total: favorites.length, favorites });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// EDITAR ALIAS
export const updateFavoriteAlias = async (req, res) => {
    try {
        const { id } = req.params;
        const { alias } = req.body;

        const favorite = await Favorite.findByPk(id);
        if (!favorite) return res.status(404).json({ success: false, message: "Favorito no encontrado." });

        favorite.alias = alias;
        await favorite.save();

        res.status(200).json({ success: true, message: "Alias actualizado", favorite });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ELIMINAR FAVORITO
export const removeFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Favorite.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ success: false, message: "No se encontró el favorito." });
        res.status(200).json({ success: true, message: "Favorito eliminado." });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};