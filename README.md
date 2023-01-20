# Tasks API (with nodejs, knex and swagger)

A simple tasks api with nodejs, knex, joi and swagger

Demo: TODO

## Install

```
$ git clone https://github.com/danielschmitz/tasks-node-knex-swagger.git
$ cd tasks-node-knex-swagger
$ npm install
$ cp .env.example .env
$ npm run createdb
$ npm run dev
```

Go to http://localhost:3000

## How get the Authorization Token 

To make some calls to the API, you must be logged in. To do this, go to the `/auth/login` row in swagger and click on the "Try it Out" button:

<details>
  <summary>Image Example</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213529709-1cf94fa8-f3c8-474b-9cbe-eeb7c4dd4eca.png">
</details>

The swagger setup already comes with the email and password information for user 1. Thus, you do not need to provide any information. Just click the "Execute" button

<details>
  <summary>Image Example</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213527879-ecf0f3fd-bf59-4671-a526-d1d694513482.png">
</details>

After performing this action, you get the authentication token as an answer:

<details>
  <summary>Image Example</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213528135-4fe59b90-8ddb-4ed5-bedb-296f4d6d7d03.png">
</details>

Copy the token, go to the top of the page, and click on the "Authorize" button. 

<details>
  <summary>Image Example</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213528495-da3b2c82-8eba-47d9-9c2e-89d8ade4ab90.png">
</details>

With this token, you can access other API calls, such as "/categories".

## Database

The database used in development mode is sqlite3. And in production, postgreSQL.

<details>
  <summary>ORM</summary>
  <img src="Tasks.png">
</details>

## Deploy at Vercel

We recomend vercel servers to deploy. The `vercel.json` is ready to use, you just need fork this project and create a vercel account at `vercel.com`. After create your account, link your vercel account with github and select the repository `tasks-node-knex-swagger`.

<details>
  <summary>Image</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213718163-8df36959-9cfd-4006-ab05-c7dfbc48f4cb.png">
</details>


You need a PostgreSQL database. We recommend https://www.elephantsql.com/ services (it's free for test). Create a account at elephantsql and create a new instance. Choose a "tiny turtle" free plan and copy the connection url:


<details>
  <summary>Image</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213721095-7e822e0e-7fc9-41bd-9c30-308df5ef5efd.png">
</details>

Back to vercel configuration, choose `Enviroment variables` and set two values:

- JWT_SECRET: Use any string here. You can generate a string in the https://www.md5hashgenerator.com/
- DATABASE_URL: Paste the URL copied from elephantsql.com

<details>
  <summary>Image</summary>
  <img src="https://user-images.githubusercontent.com/1509692/213723090-78b0e883-5a09-4757-99e5-c0a4d23b5fce.png">
</details>

