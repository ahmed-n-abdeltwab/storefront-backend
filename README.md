# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and install docker.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### Install docker from there [website](https://docs.docker.com/desktop/).

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

###  Open a terminal and navigate to the project dir and run this's command, to install and run the postgres on port '5432'.

```sh
docker-compose up -d
```
### To migrate the database tables. To run them, follow the instructions below

* install yarn `npm install yarn -g`
* install db-migrate on the machine for terminal commands `npm install db-migrate -g`
* install all project dependencies `yarn`
* to run the migrations `db-migrate up`
* to test that it is working, run `yarn watch` should show an app starting on `0.0.0.0:3000`

