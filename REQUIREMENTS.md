# API Endpoints
### Products
- Index `/products` [GET]
- Show `/products/:product_id` [GET]
- Create `/products` [POST] [token required] [body]
```json
{
    "user_id":<number>,
    "name": <string>,
	"price": <number>,
	"category": <string>
}
```
- Delete `/products/:product_id` [DELETE] [token required] [body]
```json
{
    "user_id":<number>
}
```
### Users
- Index `/users` [GET] [token required] [body]
```json
{
    "user_id":<number>
}
```
- Create `/users` [POST] [body]
```json
{
    "username":<string>,
    "firstname":<string>,
    "lastname":<string>,
    "password":<string>
}
```
- Show `/users/:user_id` [GET] [token required]
- Update `/users/:user_id` [PUT] [token required] [body]
```json
{
    "username":<string>,
    "firstname":<string>,
    "lastname":<string>,
    "password":<string>
}
```
- Delete `/users/:user_id` [DELETE] [token required]
- Refresh the Token `/users/authenticate` [POST] [body]
```json
{
    "username": <string>,
    "password": <string>
}
```

### Orders
- Index `/orders` [GET]
- Create `/orders` [POST] [token required] [body]
```json
{
    "product_id": <number>,
	"quantity": <number>,
	"user_id": <number>
}
```
- Show `/orders/:order_id` [GET] 
- Update `/orders/:order_id` [PUT] [token required] [body]
```json
{
    "user_id": <number>,
    "product_id": <number>,
    "quantity": <number>,
    "status": <"active" or "complete">
}
```
- Delete `/orders/:order_id` [DELETE] [token required] [body]
```json
{
    "user_id":<number>
}
```
### Dashboard
- Current Order by user `/user_with_orders/:user_id` [GET] [token required]


## Data Shapes
#### Product
- id [PK] [SERIAL]
- name [VARCHAR 200] [NOT NULL]
- price [INTEGER] [NOT NULL]
- category [VARCHAR 100]

#### User
- id [PK] [SERIAL]
- username [VARCHAR 100] [NOT NULL]
- firstName [VARCHAR 50] [NOT NULL]
- lastName [VARCHAR 50] [NOT NULL]
- password [VARCHAR] 

#### Orders
- id [PK] [SERIAL]
- product_id [bigint] [NOT NULL] [REFERENCES Products.id]
- quantity [INTEGER] [NOT NULL]
- user_id [bigint] [NOT NULL] [REFERENCES Users.id]
- status [VARCHAR 20] [NOT NULL]

