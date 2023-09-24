## NovaDating Service

This repository is the back-end source code of the telegram [@NovaDatingBot](https://t.me/TeleDatingBot).

This bot is written as a mini-app for [Telegram Mini-App Contest](https://t.me/contest/327).

## Tech Stack

- Typescript programming language, using NodeJS framework.
- MongoDB as primary database.
- Redis as cache database and socket.io adapter.

## Build Requirements

- NodeJS
- `npm` package manager
- MongoDB
- Redis

## Build

- Clone the project.
- Run `npm install` to install required dependencies. (You can also consider using pnpm, yarn, bun or any similar package managers)
- Copy the `.env.example` to `.env` file and enter your mongodb/redis instance data into it.
- Now just start the app using `npm run build` and `npm run app` command. (or `npm run dev` for development purposes.)

## Code architecture

> src/

This directory contains all the source code.

> src/docs

Postman collection generator! It can black-box test all the endpoints one by one using given inputs and create sample responses for postman.

Finally, If the postman api data is provided in the `.env_test` file, It will update the collection automatically.

> src/endpoints

The endpoints, called using `HTTP` or `SocketIO` routers.

Each endpoint defined its `access level`, `input interface`, `expected output` and `sample data` for the documentation generator.

> src/helpers

`Exceptions`, `Localization` data and prototype extensions are here.

> src/logic

Each endpoint calls related logic tree to do the task. Finally, the result will be returned to endpoint and routers.

> src/models

Each model represents a collection in the primary database (MongoDB). Including its `interface`, `schema`, `indexes` and `properties to project` in different situations.

> src/repos

Repository is the layer responsible for running queries.

> src/services

Services are responsible to **connect the application to outer services**. For example MongoService is responsible to connect the app to mongodb.