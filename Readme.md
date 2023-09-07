# Project Listing Platform

This project is a platform for listing and managing products. It provides several API endpoints for user registration, authentication, and product display. Below are the available routes and their descriptions.

## Routes

### User Routes

#### Register User

- **Endpoint**: `POST /register`
- **Description**: Allows users to register by providing their details.
- **Handler**: `createUser`

#### Login User

- **Endpoint**: `POST /login`
- **Description**: Allows registered users to log in and obtain an authentication token.
- **Handler**: `loginUser`

### Product Routes

#### Add Product

- **Endpoint**: `POST /add`
- **Description**: Allows authenticated users to add a new product to the platform.
- **Middleware**: `authTokenHandler` (Authentication required)
- **Handler**: `createProduct`

#### Get All Products

- **Endpoint**: `GET /all`
- **Description**: Retrieves a list of all products available on the platform.
- **Handler**: `getProducts`

#### Get Product by ID

- **Endpoint**: `GET /:id`
- **Description**: Retrieves detailed information about a specific product by its ID.
- **Middleware**: `authTokenHandler` (Authentication required)
- **Handler**: `getProduct`

#### Update Product by ID

- **Endpoint**: `PATCH /:id`
- **Description**: Allows authenticated users to update the details of a specific product by its ID.
- **Handler**: `updateProduct`

#### Delete Product by ID

- **Endpoint**: `DELETE /:id`
- **Description**: Allows authenticated users to delete a specific product by its ID.
- **Middleware**: `authTokenHandler` (Authentication required)
- **Handler**: `deleteProduct`

## Authentication

To access routes that require authentication (marked with the `authTokenHandler` middleware), clients must include a valid authentication token in the request headers.

Example header:  Authorization: Bearer <YOUR_AUTH_TOKEN>


## How to Use

1. Clone this repository.
2. Install the required dependencies by running `npm install` or `yarn install`.
3. Start the application using `npm start` or `yarn start`.
4. You can now make HTTP requests to the provided endpoints using a tool like Postman or your preferred API client.

