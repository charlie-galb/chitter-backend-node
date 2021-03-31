# Chitter Back End  

This is a RESTful back end social media API designed to serve my pre-existing [front end in React](https://github.com/charlie-galb/chitter-frontend-react). 

It is deployed at `https://chitter-backend-node.herokuapp.com/`  

## Features  

Users can...  

- sign up
- log in
- log out
- create a peep (post)
- delete a peep
- like someone else's peep  
- Unlike a peep  

## Routes  

### Users 

- POST `/users`
- DELETE `/users/:id`

### Sessions

- POST `/sessions`  

### Peeps  

- POST `/peeps`
- GET `/peeps`
- DELETE `/peeps/:id`

### Likes  

- PUT `/peeps/:peep_id/likes/:user_id`  
- DELETE `/peeps/:peep_id/likes/:user_id`

## Technologies

- JavaScript
- Postgres
- Jest
- Supertest
- Knex
- ESLint

## Models and Diagrams  

![Entity relationship](https://i.ibb.co/LQCmCJw/Chitter-entity-relationship.jpg)
