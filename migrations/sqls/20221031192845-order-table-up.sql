CREATE TABLE Orders(
    id SERIAL PRIMARY KEY,
    product_id bigint NOT NULL,
    quantity INTEGER NOT NULL,
    user_id bigint NOT NULL,
    status VARCHAR(20) NOT NULL
);
ALTER TABLE Orders
    ADD CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES Users(id);
ALTER TABLE Orders
    ADD CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES Products(id);