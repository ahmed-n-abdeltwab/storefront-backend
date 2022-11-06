CREATE TABLE Orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
);
ALTER TABLE Orders
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE SET NULL;