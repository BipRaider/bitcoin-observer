# Cryptocoin Observer

## Description

This application tracks the price changes of cryptocurrencies.

### Libraries and Frameworks

- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- [React](https://react.dev/) React documentation.
- [Vite](https://vitejs.dev/) Generation Frontend.
- [CoinMarketCap](https://coinmarketcap.com) Works with API such as CoinMarketCap.
- [Docker](https://www.docker.com/) Docker provides a suite of development tools and services.

## Setup for startup

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
