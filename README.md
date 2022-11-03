# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and install docker.


## Steps to Completion

### Create `.env` file and write inside of it

```
POSTGRES_HOST=localhost
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
ENV=dev
TOKEN_SECRET=top-secret
BCRYPT_PASSWORD=bcrypt-password
SALT_ROUNDS=10
```

###  Navigate to the project directory and run this command to install and run Postgres on port '5432'.

```sh
docker-compose up -d
```
### you can connect to the database using this command.

```sh
docker-compose exec db psql -U postgres 
```
### To migrate the database tables. Follow the steps below to run them.

* install yarn `npm install yarn -g`
* install db-migrate on the machine for terminal commands `npm install db-migrate -g`
* install all project dependencies `yarn`
* to run the migrations `db-migrate up`
* to test that it is working, run `yarn watch` should show an app starting on `0.0.0.0:3000`

