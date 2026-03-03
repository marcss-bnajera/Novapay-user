`use strict`;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { corsOption } from './cors-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js'

// rutas de cliente 
import usersRoutes from '../src/users/users.routes.js';
import accountsRoutes from '../src/accounts/accounts.routes.js';
import transfersRoutes from '../src/transfers/transfers.routes.js';
import productsRoutes from '../src/products/products.routes.js';
import shoppingsRoutes from '../src/shoppings/shoppings.routes.js';
import favoriteRoutes from "../src/favorites/favorites.routes.js";
import currenciesRoutes from '../src/currencies/currencies.routes.js';


const setupMiddlewares = (app) => {
    app.use(helmet());
    app.use(cors(corsOption));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(morgan('dev'));
};

const setupRoutes = (app) => {
    const BASE_URL = '/NovaPay/v1';

    // Rutas  para el Cliente
    app.use(`${BASE_URL}/users`, usersRoutes);
    app.use(`${BASE_URL}/accounts`, accountsRoutes);
    app.use(`${BASE_URL}/transfers`, transfersRoutes);
    app.use(`${BASE_URL}/products`, productsRoutes);
    app.use(`${BASE_URL}/shoppings`, shoppingsRoutes);
    app.use(`${BASE_URL}/currencies`, currenciesRoutes);
    app.use(`${BASE_URL}/favorites`, favoriteRoutes);

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