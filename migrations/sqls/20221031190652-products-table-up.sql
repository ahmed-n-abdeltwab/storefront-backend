CREATE TABLE Products(
    id SERIAL PRIMARY  KEY,
    name VARCHAR(200) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(100)
);