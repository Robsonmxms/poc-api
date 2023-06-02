# POC API

[![TypeScript version](https://img.shields.io/badge/TypeScript-v5.0.4-blue)](https://www.typescriptlang.org/download) [![Nodejs version](https://img.shields.io/badge/Node.js-v20.2.0-green)](https://nodejs.org/en/download) [![NestJS version](https://img.shields.io/badge/NestJS-v9.4.2-red)](https://docs.nestjs.com) [![Prisma version](https://img.shields.io/badge/Prisma-v4.15.0-orange)](https://www.prisma.io/docs/getting-started) [![SQLite version](https://img.shields.io/badge/SQLite-v3.39.5-yellow)](https://sqlite.org/download.html)

## Description

This proof of concept aims to develop a simple api that allows using GET, POST and DELETE. In addition, integrated with a database.

The idea of the application is that each activity is defined by its id, name, description and a list of users linked to it. On the other hand, a user is defined by id, name and a list of activities linked to him.

## Running the app

- Rename file .env.example to .env

```bash
# install repository
$ npm install
```

```bash
# generate prisma
$ npx prisma generate 
```

- To quickly start a development environment for this project, we provide a seed script located at prisma/seed.ts. if you decide to use this script you can run the following command line:

```bash
#build pending migrations
$ npx prisma migrate dev

```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Requisitions

### Activities

| Method     | Path | Description |
| ---------- | ---- | ----------- |
| ![GET](https://img.shields.io/badge/-GET-blue)|  http://localhost:3000/activities   | Get all activities |
| ![GET](https://img.shields.io/badge/-GET-blue)    | http://localhost:3000/activities?name=yourAtivityName    | Get activities filtered by name    |
| ![GET](https://img.shields.io/badge/-GET-blue)    | http://localhost:3000/activities/1   | Get activity by id   |
| ![POST](https://img.shields.io/badge/-POST-green)    | http://localhost:3000/activities | Create an activity (See example below)|
| ![DELETE](https://img.shields.io/badge/-DELETE-red)    | http://localhost:3000/activities | Delete all activities |

### Users

| Method     | Path | Description |
| ---------- | ---- | ----------- |
| ![GET](https://img.shields.io/badge/-GET-blue)| http://localhost:3000/users  | Get all users    |
| ![GET](https://img.shields.io/badge/-GET-blue)    | http://localhost:3000/users?name=yourUserName    | Get users filtered by name    |
| ![GET](https://img.shields.io/badge/-GET-blue)    | http://localhost:3000/users/1   | Get user by id   |
| ![POST](https://img.shields.io/badge/-POST-green)    | http://localhost:3000/users | Create an user (See example below)|
| ![DELETE](https://img.shields.io/badge/-DELETE-red)    | http://localhost:3000/users | Delete all users |

## Examples

### Create an activity

- Input
  
  ```json
  {
    "name": "the name of your activity",
    "description": "the description of your activity",
    "users": [
      {
        "name": "name1"
      },
      {
        "name": "name2"
      }
    ]
  }
  ```

- Output

  ```json
  {
    "id": 0,
    "name": "the name of your activity",
    "description": "the description of your activity",
    "users": [
      {
        "id": 0,
        "name": "name1"
      },
      {
        "id": 1,
        "name": "name2"
      }
    ]
  }
  ```

### Create an user

- Input
  
  ```json
  {
    "name" : "User name"
  }
  ```

- Output

  ```json
  {
    "id" : 3,
    "name" : "User name"
  }
  ```
