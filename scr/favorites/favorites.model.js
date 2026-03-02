import { DataTypes } from "sequelize";
import { db } from "../../configs/db.js";

export const Favorite = db.define('favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero_cuenta_favorito: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'favorites'
});