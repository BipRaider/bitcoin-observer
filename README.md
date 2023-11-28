# Cryptocoin Observer

## Description

This application tracks the price changes of cryptocurrencies.

The application is built using **TypeScript**.

### Libraries and Frameworks

#### Backend

- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- [PostgreSQL](https://www.postgresql.org/download/) is a free and open-source relational database
  management system (RDBMS) emphasizing extensibility and SQL compliance.
- [Prisma ORM](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#get-all-post-records-where-date_created-is-greater-than-march-19th-2020)
  Open source Node.js and TypeScript ORM with an intuitive data model, automated migrations,
  type-safety, and auto-completion.
- [class-validator](https://github.com/typestack/class-validator) Allows use of decorator and
  non-decorator based validation. Internally uses validator.js to perform validation.

#### Frontend

- [React](https://react.dev/) React documentation.
- [Vite](https://vitejs.dev/) Generation Frontend.
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) A small, fast, and scalable
  bearbones state management solution. Zustand has a comfy API based on hooks.
- [Zod](https://zod.dev/) TypeScript-first schema validation with static type inference
- [CoinMarketCap](https://coinmarketcap.com) Works with API such as CoinMarketCap.
- [Docker](https://www.docker.com/) Docker provides a suite of development tools and services.

## Setup for startup

- Receive a random [Email](https://temp-mail.org)
- You need to get the API key. [Api key](https://coinmarketcap.com/api/) and add it to the .env
  files. There is a need for it.
- You have only 10k free of the query to **CoinMarketCap** api.
- [CoinMarketCap api](https://coinmarketcap.com/api/documentation/v1/#section/Introduction)
  documentation
- Complete all the env files. Also for production inside the envs folder.

## Installation

```bash
# Sets up all the dependencies
$ npm run init
```

```bash
# Up docker services and migrate db.
$ npm run init-docker
```

## Running the applications

```bash
# Start development mode
$ npm run docker:dev
```

```bash
# Start production mode
$ npm run docker:prod
```

## Working with applications

```bash
# Updating api service when adding any library.
$ npm run reup:dev:api
```

```bash
# Updating client service when adding any library.
$ npm run reup:dev:client
```

```bash
# Clean up docker if it has containers or images that are not used.
$ npm run docker:clear
```

```bash
# Build docker image and send to the docker cloud.
$ npm run docker:build
```
