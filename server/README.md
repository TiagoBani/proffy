# Proffy server

Application in nodejs with typescript to persists teachers and classes data.

## Frameworks

- express
- knex
- sqlite

## Requirements

- Node v12+

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3333/health](http://localhost:3333/health) to view health check.

The application will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run knex:migrate`

Run create or update database schema

### `npm run knex:migrate:rollback`

Run rollback database schema
