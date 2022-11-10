# Vue-Node-Authentication

You can test app on this link :  https://damp-woodland-44015.herokuapp.com/auth

or clone the repository -> npm install -> npm run start

### Create a new user
POST https://damp-woodland-44015.herokuapp.com/auth/sign-up
content-type: application/json

{
  "email": "email1@newage.io",
  "firstName" : "firstName",
  "lastName" : "lastName",
  "birthday" : "10-28-2004",
  "password": "123456"
}

### Sign in as an existing user
POST https://damp-woodland-44015.herokuapp.com/auth/sign-in
content-type: application/json


{
  "email": "email1@newage.io",
  "password": "123456"
}

### Get the currently signed in user id
GET https://damp-woodland-44015.herokuapp.com/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQwNTkzNGI2NTRhY2ZkNjI3MmVlOSIsImlhdCI6MTY2ODA5MjYwMywiZXhwIjoxNjY4MDk0NDAzfQ.HxDaYUZdIDivc3voSc7yPhf_Hrl5Y70vn_1x5Hv7HqI



### Delete a user given id
DELETE https://damp-woodland-44015.herokuapp.com/auth/users/636d05934b654acfd6272ee9
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQwNTkzNGI2NTRhY2ZkNjI3MmVlOSIsImlhdCI6MTY2ODA5MjYwMywiZXhwIjoxNjY4MDk0NDAzfQ.HxDaYUZdIDivc3voSc7yPhf_Hrl5Y70vn_1x5Hv7HqI


### Update a user
PUT https://damp-woodland-44015.herokuapp.com/auth/users/636d05934b654acfd6272ee9
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQwNTkzNGI2NTRhY2ZkNjI3MmVlOSIsImlhdCI6MTY2ODA5MjYwMywiZXhwIjoxNjY4MDk0NDAzfQ.HxDaYUZdIDivc3voSc7yPhf_Hrl5Y70vn_1x5Hv7HqI
content-type: application/json

{
  "firstName": "wwww",
  "lastname": "asdasda"
}
