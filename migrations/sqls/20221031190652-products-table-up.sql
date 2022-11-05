CREATE TABLE Products(
    id SERIAL PRIMARY  KEY,
    name VARCHAR(200) NOT NULL,
    price INTEGER,
    category VARCHAR(100),
    description TEXT
);