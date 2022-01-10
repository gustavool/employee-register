# Employee register API

A simple API to register, list and update employees.

## Technologies used

- NodeJs
- Typescript
- Express
- Jest
- Supertest
- TypeORM
- PostgreSQL
- ESLint
- Prettier
- Swagger - http://localhost:3333/api-docs/

## 100% test coverage report

<img alt="test report" src="https://i.ibb.co/sQjDVqj/coverage-tests.jpg" />

## Endpoints

| Name                     | Method |        Endpoint |
| ------------------------ | :----: | --------------: |
| Create an employee       |  POST  |      /employees |
| Get all employees        |  GET   |      /employees |
| Get an employee by ID    |  GET   | /employees/{id} |
| Update an employee by ID |  PUT   | /employees/{id} |
| Delete an employee by ID | DELETE | /employees/{id} |

## How to use

### Clone this repository

`git clone https://github.com/gustavool/employee-register.git`

### Install dependencies

`yarn`

### Run migrations

`yarn typeorm migration:run`

### Run project locally

`yarn dev`
