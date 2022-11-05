CREATE TYPE user_role AS ENUM('admin', 'user');
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    password VARCHAR NOT NULL,
    role user_role NOT NULL
);