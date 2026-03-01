`use strict`

import { User } from "./users.model.js";

// Funciones de usuario

// get profile falta

// login falta

// Crear usuario (POST)
export const createUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = await User.create(userData);

        res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el usuario",
            error: error.message
        });
    }
};

// Actualizar usuario (PUT)
// Permitir actualizar unicamente el usuario logueado (falta)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const [affectedCount] = await User.update(userData, {
            where: { id }
        });

        if (affectedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado o no hubo cambios"
            });
        }

        res.status(200).json({
            success: true,
            message: "Usuario actualizado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar usuario",
            error: error.message
        });
    }
};
