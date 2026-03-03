`use strict`

import { User } from "./users.model.js";

// 1. Obtener Perfil 
export const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user || !user.active) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener perfil", error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { dpi, password, role_id, active, username, ...restOfData } = req.body;

        const [affectedCount] = await User.update(restOfData, {
            where: {
                id,
                active: true // Solo si el usuario no ha sido desactivado por el Admin
            }
        });

        if (affectedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado o no se realizaron cambios permitidos"
            });
        }

        res.status(200).json({
            success: true,
            message: "Perfil actualizado correctamente. (Campos sensibles como DPI o Password no fueron modificados)"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar perfil",
            error: error.message
        });
    }
};