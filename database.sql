CREATE DATABASE chitter_dev;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY, 
    handle VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    session_key VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE chitter_test;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY, 
    handle VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    session_key VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);