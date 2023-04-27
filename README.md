
# WTWR (What to Wear): BackEnd

Creating a server for the front-end WTWR application.


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Features

- User Registration
- User Login
- Authorization with middleware
- Authentication with JSON web tokens.


## Tech Stack

**Server:** Node, Express, Mongoose, JWT, GCP

## WTWR API Explorer

<details><summary>Authentication</summary>

`POST` /signup 

Create a new user

`POST` /signin

Log in user
</details>

<details><summary>User</summary>

`GET` /users/me

Get user details

`PATCH` /users/me

Update a user
</details>

<details><summary>Clothing Items</summary>

`GET` /items

Get clothing items

`GET` /items

Create clothing item

`DELETE` /items/:id

Delete clothing item

`PUT` /items/:id/likes

Like clothing item

`DELETE` /items/:id/likes

Dislike clothing item
</details>


## Run Locally

Clone the project

```bash
  git clone https://github.com/colburncodes/se_project_express
```

Go to the project directory

```bash
  cd se_project_express
```

Install dependencies

```bash
  npm install
```

Create a `.env` file in root directory

```
JWT_TOKEN="yoursecrethere"
MONGODB_URI="mongodb://localhost:27017/wtwr_db"
```

Start the server

```bash
  npm run start to launch the server
```

```bash
  npm run dev to launch the server with the hot reload feature
```

## Accessing Deployed Application
`Frontend Application` [What To Wear](https://wtwr.mooo.com/)

`Backend API` [WTWR API](https://api.wtwr.mooo.com/items)

Frontend application using React [Frontend Repo Here](https://github.com/colburncodes/se_project_react)
