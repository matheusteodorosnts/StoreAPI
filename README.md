# StoreAPI

## Features

- User management: create, update, delete users
- Category management: create, update, delete, and fetch categories
- Product management: create, update, delete, and fetch products
- Dockerized environment for easy setup
- Database connection using environment variables

## Endpoints

### User

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /user/register   | Register a new user |
| POST   | /user/login      | User login          |
| DELETE | /user/:id/delete | Delete a user by ID |
| PATCH  | /user/:id/edit   | Update a user by ID |

### Category

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | /category/create     | Create a new category   |
| PATCH  | /category/:id/edit   | Update a category by ID |
| DELETE | /category/:id/delete | Delete a category by ID |
| GET    | /category/all        | Get all categories      |
| GET    | /category/:id        | Get category by ID      |

### Product

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | /product/all        | Get all products       |
| GET    | /product/:id        | Get product by ID      |
| DELETE | /product/:id/delete | Delete product by ID   |
| POST   | /product/create     | Create a new product   |
| PATCH  | /product/:id/edit   | Update a product by ID |

## How to Connect to the Database

1. Create a `.env` file in the root of your project with the following content:

```
DATABASE_URL="mysql://root:password@db:3306/database"
DATABASE_PORT=3306
DATABASE_PASSWORD="your_password_here"
DATABASE_IMAGE="mysql:8"
```

2. In your `docker-compose.yml` file, add the MySQL and app service configurations as below:

```yaml
version: '3.8'

services:
  db:
    image: ${DATABASE_IMAGE}
    ports:
      - '${DATABASE_PORT}:${DATABASE_PORT}'
    environment:
      MYSQL_ROOT_PASSWORD: ${DATABASE_PASSWORD}
    volumes:
      - db_data:/var/lib/mysql

  app:
    build: .
    ports:
      - '3000:3000'
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
    command: npm run start:dev
    environment:
      DATABASE_URL: ${DATABASE_URL}

volumes:
  db_data:
```

3. Run the docker compose command to start the database and app:

```bash
docker-compose up -d
```

4. Make sure your application uses the `DATABASE_URL` from the `.env` file to connect to the database.
