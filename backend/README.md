# E-Commerce App (Backend)

This is the backend part of an e-commerce application that provides APIs for managing products, orders, user authentication, and more. The backend is built using Node.js with Express, and connects to a database (such as POSTGRES) for storing data.

### Tech Stack

- Node.js: JavaScript runtime environment for building the backend.
- Express: Web framework for Node.js to handle routing and API requests.
- Postgres: SQL database for storing data (can be replaced with SQL if needed).
- JWT (JSON Web Token): For user authentication and session management.
- Bcrypt: For password hashing and security.
- dotenv: For managing environment variables.
- Cors: For enabling Cross-Origin Resource Sharing.
- Multer: To upload multi-form data.

### Features

- User Authentication: JWT-based login and registration.
- Product Management: APIs to add, update, delete, and fetch products.
- Order Management: APIs for creating and managing orders.
- Cart Management: APIs to manage users' carts (add/remove products).
- Admin Panel:Admin routes for managing users, products, and orders.

### Getting Started

npm run dev
This will start the server on http://localhost:3001.

### API Endpoints

- Authentication

* POST /user/register: Register a new user.
* POST /user/login: Log in an existing user.
* GET /user/view-products: View products.
* GET /user/view-product/:id : View specified product.
* GET /user/fetch-user :Fetch user Details
* PUT /user/update-profile :Update profile
* GET /user/filtered-products :Get Filtered Products

- Products

* POST /product/add-review: Adds review to a product.
* GET /product/view-reviews/:id: Get review of a specified product.

- Orders

* GET /order/view-order: View orders by user.
* GET /order/view-orders-by-admin: View orders by admin.
* POST /order/place-order: Create a new order.
* PUT /order/change-order-status: Change status of a order
* PUT /order/cancel-order: Cancel a order

- Admin Routes

* POST /admin/add-product: Add a product
* GET /admin/view-products :View products by admin.
* DELETE /admin/delete-product/:id: Remove a product from the inventory.
* PUT /admin/update-product/:id :Update the product

### File Structure

backend/
│
├── controllers/ # Request handler functions for routes
│ ├── admin-controller.ts  
│ ├── product-controller.ts
│ ├── order-controller.ts
│ └── user-ontroller.ts
├── middlewares/ # Middleware functions
│ ├── token-verification.ts
│  
├── models/ # models for the database
│ ├── user-model.ts
│ ├── product-model.ts
│ ├── order-model.ts
│ └── cart-model.ts
├── repositories/ # Repositories for DB logic
│ ├── admin-repository.ts
│ ├── product-repository.ts
│ ├── order-repository.ts
│ └── user-repository.ts
├── routes/ # API routes
│ ├── admin-routes.ts
│ ├── product-routes.ts
│ ├── order-routes.ts
│ └── user-routes.ts
├── services/ # Services
│ ├── admin-services.ts
│ ├── product-services.ts
│ ├── order-services.ts
│ └── user-services.ts
├── .env # Environment variables
├── package.json # Project dependencies and scripts
├── README.md # Project documentation
└── tsconfig.json # ts configuration file

### Available Scripts

- npm run dev: Starts the server in development mode.
- npm run test: Runs the test suite.

### Dependencies

- express
- postgres
- jsonwebtoken
- bcryptjs
- dotenv
- cors
- multer
