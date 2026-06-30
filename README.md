# Novapay User - API Backend para Clientes

Microservicio backend que expone la API REST para el **portal de clientes** de NovaPay. Permite a los usuarios consultar sus cuentas, realizar transferencias, depositos, ver productos, gestionar favoritos y mas.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| Node.js | Runtime de JavaScript |
| Express 5 | Framework web |
| Sequelize 6 | ORM para PostgreSQL |
| PostgreSQL | Base de datos |
| JWT | Validacion de tokens (middleware) |
| BCryptJS | Hash de contraseñas |
| Helmet | Seguridad HTTP headers |
| Morgan | Logging de requests |
| Winston | Logging estructurado |
| Cloudinary | Subida de archivos/imagenes |
| Multer | Manejo de uploads multipart |
| Express Validator | Validacion de inputs |
| Express Rate Limit | Proteccion contra abuso |
| Axios | Comunicacion entre microservicios |

---

## Estructura

```
Novapay-user/
├── configs/
│   ├── app-user.js              # Inicializacion del servidor, rutas y middlewares
│   ├── cors-configuration.js    # Configuracion CORS
│   ├── db.js                    # Conexion y sincronizacion con PostgreSQL
│   └── logger.js                # Configuracion de Winston
├── middlewares/
│   ├── accounts-validator.js
│   ├── check-validators.js
│   ├── currencies-validator.js
│   ├── depostis-validator.js
│   ├── handle-errors.js
│   ├── products-validator.js
│   ├── request-limit.js
│   ├── shopping-validator.js
│   ├── transactoins-validator.js
│   ├── transfres-validator.js
│   └── users-validator.js
├── src/
│   ├── accounts/                # Cuentas bancarias del usuario
│   ├── cards/                   # Tarjetas del usuario
│   ├── currencies/              # Monedas y divisas
│   ├── deposits/                # Depositos
│   ├── favorites/               # Cuentas favoritas
│   ├── passbooks/               # Libretas de ahorro
│   ├── products/                # Catalogo de productos
│   ├── roles/                   # Roles
│   ├── shoppings/               # Historial de compras
│   ├── transactions/            # Transacciones
│   ├── transfers/               # Transferencias
│   └── users/                   # Perfil del usuario
├── Dockerfile
├── package.json
└── index.js                     # Punto de entrada
```

---

## Puerto

El servicio escucha en el puerto **3002** por defecto.

---

## Base URL de la API

Todas las rutas estan bajo el prefijo:

```
/NovaPay/v1
```

Ejemplo: `http://localhost:3002/NovaPay/v1/accounts`

---

## Endpoints disponibles

| Metodo | Endpoint | Descripcion | Auth |
|---|---|---|---|
| GET | `/users/:id` | Obtener perfil | User |
| PUT | `/users/:id` | Actualizar perfil | User |
| GET | `/accounts/` | Listar cuentas propias | User |
| GET | `/accounts/:id` | Obtener cuenta | User |
| POST | `/accounts/` | Crear cuenta | User |
| PUT | `/accounts/:id` | Actualizar cuenta | User |
| DELETE | `/accounts/:id` | Eliminar cuenta | User |
| GET | `/cards/` | Listar tarjetas | User |
| POST | `/cards/` | Crear tarjeta | User |
| PUT | `/cards/:id` | Actualizar tarjeta | User |
| DELETE | `/cards/:id` | Eliminar tarjeta | User |
| GET | `/transfers/` | Listar transferencias | User |
| POST | `/transfers/` | Crear transferencia | User |
| GET | `/deposits/` | Listar depositos | User |
| POST | `/deposits/` | Crear deposito | User |
| GET | `/transactions/` | Listar transacciones | User |
| GET | `/currencies/` | Listar monedas | User |
| GET | `/products/` | Listar productos | User |
| GET | `/shoppings/` | Listar compras | User |
| POST | `/shoppings/` | Crear compra | User |
| GET | `/favorites/` | Listar favoritos | User |
| POST | `/favorites/` | Agregar favorito | User |
| DELETE | `/favorites/:id` | Eliminar favorito | User |
| GET | `/passbooks/` | Listar libretas | User |
| GET | `/check` | Health check | No |

---

## Diferencias con Novapay-admin

| Caracteristica | Novapay-admin | Novapay-user |
|---|---|---|
| Base URL | `/NovaPay/admin/v1` | `/NovaPay/v1` |
| Modulos exclusivos | Dashboard, Roles, Passbooks | Favorites, Passbooks |
| Acceso | Solo administradores | Solo clientes autenticados |
| Seed de datos | Crea roles y admin inicial | No crea datos iniciales |

---

## Ejecucion local (sin Docker)

```bash
npm install
npm run dev
```

Asegurate de que PostgreSQL este corriendo en `localhost:5432` con la base de datos `novapay_db`.

---

## Ejecucion con Docker

Desde la carpeta raiz de NovaPay:

```bash
docker-compose up --build app-user
```

---

## Variables de entorno (.env)

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=novapay_db
DB_USER=postgres
DB_PASSWORD=admin
DB_DIALECT=postgres
```

En Docker, `DB_HOST` se sobreescribe con `db` (el nombre del servicio de PostgreSQL en docker-compose).
