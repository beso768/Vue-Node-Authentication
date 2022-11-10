# Vue-Node-Authentication

You can test app on this link :  https://serene-retreat-48510.herokuapp.com/api/

or clone the repository -> npm install -> npm run start

### Create a new user
POST https://serene-retreat-48510.herokuapp.com/api/auth/sign-up
content-type: application/json

{
  "email": "email1@newage.io",
  "firstName" : "asd",
  "lastName" : "asdad",
  "birthday" : "10-28-2004",
  "password": "123456"
}

### Sign in as an existing user
POST https://serene-retreat-48510.herokuapp.com/api/auth/sign-in
content-type: application/json


{
  "email": "email1@newage.io",
  "password": "123456"
}

### Get the currently signed in user id
GET https://serene-retreat-48510.herokuapp.com/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxODAzZmZhYjAzYjI0OTc2YTU5OCIsImlhdCI6MTY2ODA5NTIzNCwiZXhwIjoxNjY4MDk3MDM0fQ._iXc0VVfnYDwLFIz2xheeptavY1pPEvL6gDWbbQ6Ln4



### Delete a user given id
DELETE https://serene-retreat-48510.herokuapp.com/api/users/636d202d74db930a5feea960
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQyMDJkNzRkYjkzMGE1ZmVlYTk2MCIsImlhdCI6MTY2ODA5NjA0NSwiZXhwIjoxNjY4MDk5NjQ1fQ.KqRl8ouwMlV0gmMcP2Cc_B34nTxr0WvBc6MUlmFNeMA


### Update a user
PUT https://serene-retreat-48510.herokuapp.com/api/users/636d1803ffab03b24976a598
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQxODAzZmZhYjAzYjI0OTc2YTU5OCIsImlhdCI6MTY2ODA5NTIzNCwiZXhwIjoxNjY4MDk3MDM0fQ._iXc0VVfnYDwLFIz2xheeptavY1pPEvL6gDWbbQ6Ln4
content-type: application/json

{
  "firstName": "wwww",
  "lastname": "asdasda"
}
