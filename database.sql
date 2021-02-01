CREATE DATABASE chitter_dev;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY, 
    handle VARCHAR (50) UNIQUE,
    password VARCHAR (50),
    session_key VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE chitter_test;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY, 
    handle VARCHAR (50) UNIQUE,
    password VARCHAR (50),
    session_key VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);