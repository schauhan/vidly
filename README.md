# vidly
A video rental backend app made using Node.js

Root url: http://localhost:3000/api/

## Movies ##

Returns json data about a movies.

* **URL**

  /movies/:id

* **Methods:**

  `GET` | `POST` | `DELETE` | `PUT`

## Rentals ##

Returns json data about a rentals.

* **URL**

  /rentals/:id

* **Methods:**

  `GET` | `POST` | `DELETE` | `PUT`

## Genres ##

Returns json data about a genres.

* **URL**

  /genres/:id

* **Methods:**

  `GET` | `POST` | `DELETE` | `PUT`

## Users ##

`GET` returns json data if a user is already registered. Needs `x-auth-token` header. If the user is not registered the `POST` method can be used to register a new user.

* **URL**

  /users/me

* **Methods:**

  `GET` | `POST`

## Auth ##

Returns json auth-token for a registered user. Needs the user id and password.

* **URL**

  /auth/

* **Methods:**

  `POST`
