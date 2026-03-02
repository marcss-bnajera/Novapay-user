`use strict`;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { corsOption } from './cors-configuration.js';

// rutas de cliente
import usersRoutes from '../scr/users/users.routes.js';
import accountsRoutes from '../scr/accounts/accounts.routes.js';
import transfersRoutes from '../scr/transfers/transfers.routes.js';
<<<<<<< HEAD
import productsRoutes from '../scr/products/products.routes.js';
import shoppingsRoutes from '../scr/shoppings/shoppings.routes.js';
=======
import favoriteRoutes from "../scr/favorites/favorites.routes.js";
import currenciesRoutes from '../scr/currencies/currencies.routes.js';

>>>>>>> 7881ea33ab8a6d73d7e987554efa686c69a84341

const setupMiddlewares = (app) => {
    app.use(helmet());
    app.use(cors(corsOption));
    app.use(morgan('dev'));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
};

const setupRoutes = (app) => {
    const BASE_URL = '/NovaPay/v1';

    // Rutas  para el Cliente
    app.use(`${BASE_URL}/users`, usersRoutes);
    app.use(`${BASE_URL}/accounts`, accountsRoutes);
    app.use(`${BASE_URL}/transfers`, transfersRoutes);
<<<<<<< HEAD
    app.use(`${BASE_URL}/products`, productsRoutes);
    app.use(`${BASE_URL}/shoppings`, shoppingsRoutes);
=======
    app.use(`${BASE_URL}/currencies`, currenciesRoutes);
    app.use(`${BASE_URL}/favorites`, favoriteRoutes);
>>>>>>> 7881ea33ab8a6d73d7e987554efa686c69a84341

    app.get(`${BASE_URL}/check`, (req, res) => {
        res.status(200).json({ message: 'NovaPay User Server is up and running' });
    });
};

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3002;

    try {
        await dbConnection();
        setupMiddlewares(app);
        setupRoutes(app);

        app.listen(PORT, () => {
            console.log(`Servidor USER corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor de User:', error);
    }
};