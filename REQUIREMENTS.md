# API Endpoints
### Products
- Index `/api/products` **[GET]**
- Show `/api/products/:product_id` **[GET]**
- Create `/api/products` **[POST] [token required] [body]**
```json
{
    "name": "<string>",
    "price": "<number>",
    "category": "<string>",
    "description": "<string>"
}
```
- Update `/api/products/:product_id` **[PUT] [token required] [body]**
```json
{
    "name": "<string>",
    "price": "<number>",
    "category": "<string>",
    "description": "<string>"
}
```
- Delete `/api/products/:product_id` **[DELETE] [token required]**
### Users
- Index `/api/users` **[GET] [token required] [ADMIN]**
- Show `/api/users/:user_id` **[GET] [token required] [ADMIN]**
- Create `/api/users` **[POST] [body]**
```json
{
    "username":"<string>",
    "firstname":"<string>",
    "lastname":"<string>",
    "password":"<string>",
    "role": "admin | user"
}
```
- Update `/api/users/:user_id` **[PUT] [token required] [body]**
```json
{
    "username":"<string>",
    "firstname":"<string>",
    "lastname":"<string>",
    "password":"<string>",
    "role": "admin | user"
}
```
- Delete `/api/users/:user_id` **[DELETE] [token required]**
- Get a Token `/api/users/authenticate` **[POST] [body]**
```json
{
    "username": "<string>",
    "password": "<string>"
}
```

### Orders
- Index `/api/orders` **[GET]**
- Show `/api/orders/:order_id` **[GET]**
- Create `/api/orders` **[POST] [token required] [body]**
```json
{
	"user_id": "<number>",
    "completed": "<boolean>"
}
```
- Update `/api/orders/:order_id` **[PUT] [token required] [body]**
```json
{
    "user_id": "<number>",
    "completed": "<boolean>"
}
```
- Delete `/api/orders/:order_id` **[DELETE] [token required]**

### orders_products
- Index `/api/ordersProducts` **[GET]**
- Show `/api/ordersProducts/:orderProduct_id` **[GET]**
- Create `/api/ordersProducts` **[POST] [token required] [body]**
```json
{
	"order_id": "<number>",
	"product_id": "<number>",
	"quantity": "<number>"
}
```
- Update `/api/ordersProducts/:orderProduct_id` **[PUT] [token required] [body]**
```json
{
	"order_id": "<number>",
	"product_id": "<number>",
	"quantity": "<number>"
}
```
- Delete `/api/ordersProducts/:orderProduct_id` **[DELETE] [token required]**

- Get a list of the Current Orders completed or not `/api/ordersProducts/currentOrders/:orderProduct_id` **[GET] [token required] [body]**
```json
{
	"completed": "<boolean>",
}
```

## Database Schema
#### Product
- id **[PK] [SERIAL]**
- name **[VARCHAR 200] [NOT NULL]**
- price **[NUMERIC]**
- category **[VARCHAR 100]**
- description **[TEXT]**

#### User
- id **[PK] [SERIAL]**
- username **[VARCHAR 100] [NOT NULL]**
- firstname **[VARCHAR 50]**
- lastname **[VARCHAR 50]**
- password **[VARCHAR] [NOT NULL]**
- role **['admin' | 'user'] [NOT NULL] DEFAULT 'user'**

#### Orders
- id **[PK] [SERIAL]**
- user_id **[INTEGER] [NOT NULL] [REFERENCES Users.id]**
- completed **[BOOLEAN] [NOT NULL] DEFAULT FALSE**

#### orders_products
- id **[PK] [SERIAL]**
- order_id **[INTEGER] [REFERENCES Orders.id]**
- product_id **[INTEGER] [REFERENCES Products.id]**
- quantity **[INTEGER] [NOT NULL]**