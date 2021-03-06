PS. This documentation is a work in progress.

# vidly

A video rental backend app made using Node.js. This is a sample app I made purely for display purposes. The app has a role based authenrication (user vs admin) and uses JSON Web Tokens(JWT) for auth. Passwords are salted and hashed before storage for added security. Data is stored on a cloud MongoDB instance. The app is also hosted on Heroku.

Local root url: `http://localhost:3000/api/`

## Movies

Returns json data about movies. Perform CRUD operations on movies. `POST` `DELETE` and `PUT` operations require auth token.

- **URL**

  /movies/:id

- **Methods:**

  `GET` | `POST` | `DELETE` | `PUT`
  
  ![movies-post](https://github.com/schauhan/vidly/blob/master/images/readme-images/movies-post.png?raw=true "POST example for movies API")

- **URL**

  /movies/

- **Methods:**

  `GET`

## Rentals

Returns json data about a rental, or `POST` a rental

**TODO: Add Auth**

- **URL**

  /rentals/

- **Methods:**

  `POST` | `GET`


  ![rentals-get](https://github.com/schauhan/vidly/blob/master/images/readme-images/rental-get.png?raw=true "GET example for movies API")


  ![rentals-post](https://github.com/schauhan/vidly/blob/master/images/readme-images/rentals-post.png?raw=true "POST example for movies API")

## Genres

Returns json data about genres. Only admin role can `DELETE` a genre

**TODO: Add auth**

- **URL**

  /genres/:id

- **Methods:**

  `GET` | `POST` | `DELETE` | `PUT`

- **URL**

  /genres/

- **Methods:**

  `GET`

## Users

`GET` returns json data if a user is already registered. Needs `x-auth-token` header. If the user is not registered the `POST` method can be used to register a new user.

- **URL**

  /users/me

- **Methods:**

  `GET` | `POST`
  
  Example `POST`
  ![users-post](https://github.com/schauhan/vidly/blob/master/images/readme-images/user-post.png?raw=true "POST example for the users API")

## Auth

Returns json auth-token for a registered user. Needs the user id and password.

- **URL**

  /auth/

- **Methods:**

  `POST`
  
  Example `POST`
  ![auth-post](https://github.com/schauhan/vidly/blob/master/images/readme-images/auth-post.png?raw=true "POST example for auth API")

## Running Locally

![Running locally](https://github.com/schauhan/vidly/blob/master/images/readme-images/vidly-execute.png?raw=true)
