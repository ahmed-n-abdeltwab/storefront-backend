CREATE TABLE orders_products(
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL
);
ALTER TABLE orders_products
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE SET NULL;
ALTER TABLE orders_products
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE SET NULL;