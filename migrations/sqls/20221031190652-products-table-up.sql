CREATE TABLE Products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price NUMERIC,
    category VARCHAR(100),
    description TEXT
);