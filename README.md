# BRM-developer-test
## Project Overview:

This project encompasses several key features:

User Registration: We've implemented a basic level of security by encrypting user passwords with a simple seed.

Authentication with JWT: In the login layer, we use JSON Web Tokens (JWT) to control access to each endpoint. This adds a layer of security to the authentication process.

Database Structure: We've designed a database structure, and a rough sketch of this structure is provided.

## Programming Best Practices:

coding best practices throughout this project, including:

1. Modularization: The codebase is organized into modules for better maintainability and readability.

2. Clean Architecture: We've implemented a simple clean architecture to ensure separation of concerns and maintainability.

3. Endpoint Routing: We've grouped endpoints and applied routing for improved organization and modularization.

## Challenges Faced:

While endpoint routing improved organization, it introduced a challenge:

1. Transaction Handling: We couldn't apply transactions in the product purchase layer due to the use of the router.use() function. It doesn't easily support asynchronous functions as implemented.

2. GitHub Actions: We initially set up GitHub Actions to enforce coding best practices successfully. However, when we dockerized the project and introduced environment variables as recommended, we encountered difficulties in configuring GitHub Actions to work seamlessly.


# Steps to Install the Project
### Prerequisites
Ensure that you have Docker installed on your computer.

#### 1. Clone the Repository
First, clone the repository from GitHub using the following command:

`git clone https://github.com/SixTanDev/BRM-developer-test.git` 

#### 2. Build the Image with Docker Compose
Navigate to the directory of the cloned project and build the Docker image using the following command:

`docker-compose build`

#### 3. Start the Containers
Once the image has been built successfully, you can start the containers in the background with the following command:

`docker-compose up -d` 

#### 4. Verify the Installation
After the containers have been started, you can verify that the server and database are functioning correctly:

#### Server Test from the Web:
Open your web browser and visit the following URL:

`http://localhost:3000/`

#### Connect to PgAdmin:
You can access the PgAdmin server to manage the database. Use the following information for the connection:
URL: [http://localhost:pgadmin/](http://127.0.0.1:5050/browser/)
Credentials for enter pgadmin: correo: admin@macroferia.com, contraseña: admin

Then, REGISTER NEW SERVER
In name: You can name it whatever you want
Then in the connection tab in the **host** part: `postgres-db` (the name of the postgresSQL container)
**user: admin, password: admin**

# Test Endpoint via Postman:
URL: [Test End-point](https://elements.getpostman.com/redirect?entityId=25596787-b63026ce-7426-45e3-a3bd-d42cc21465fd&entityType=collection)

## Descripción de los endpoint:

### login and register    Obtiene: Token
POST: http://localhost:3000/user/login
`{
    "email": "test@gmail.com",
    "password": "12s3214"
}`
POST: http://localhost:3000/user/register
`{
    "name": "test",
    "lastName": "test",
    "password": "123214",
    "email": "test@gmail.com",
    "user_type_id": 1
}`

### Create  Product    Requiere: Token    send by header - token: "token example"
POST: http://localhost:3000/product/register
`{
    "lotNumber": 563453,
    "name": "gasv",
    "price": 100,
    "availableQTY": 5
}`

### Delete Product      Requiere: Token
DELETE: http://localhost:3000/product/delete/1

### Update  Product     Requiere: Token
PUT: http://localhost:3000/product/update/2?
`{
    "lotNumber": 123,
    "name": "test",
    "price": 1,
    "availableQTY": 3
}`

### View all Product
GET: http://localhost:3000/view/products

### View User's Product     Requiere: Token
GET: http://localhost:3000/product/myproducts


### Do Order
POST: http://localhost:3000/buy/order
`{
    "quantityProduct": 2,
    "product_id": 3,
    "seller_id": 7
}`

### View Order Purchase    Requiere: Token
GET: http://localhost:3000/product/purchases


Attached is an image of the data structure diagram

![Untitled](https://github.com/SixTanDev/BRM-developer-test/assets/80958543/62bcbbca-941e-4129-b37c-377b1c3e27af)
