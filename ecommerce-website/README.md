# E-Commerce App (Frontend)

This is the frontend part of an e-commerce application built using modern web technologies. The app allows users to browse products, add items to their cart, and proceed with checkout.

### Tech Stack

- React: For building the user interface.
- Zustand: For state management.
- React Router: For handling navigation and routing.
- Styled-components: For styling the components.
- Axios: For making HTTP requests to the backend API.
- MUI: For responsive layout (optional, if used).

### Features

- Product Listing: Displays all available products.
- Search: Users can search for products by name, category, etc.
- Product Details: Shows detailed information when a user clicks on a product.
- Add to Cart: Allows users to add products to their shopping cart.
- Cart Management: Users can view, remove, and update the quantity of items in their cart.
- Checkout: Allows users to proceed to checkout.
- User Authentication: Login and Registration for users.
- Responsive Design: Fully responsive and mobile-friendly layout.

### Getting Started

Start the development server:

This will start the app on http://localhost:3000.

### File Structure

ecommerce-website/
│
├── public/ # Public files (index.html, images, etc.)
├── src/ # Source files
| ├── assets/ # Images, icons, etc.
│ ├── components/ # Reusable components (Button, Card, etc.)
| ├── customFields/ # utlity custom textfield
| ├── Interceptor/ # Interceptor
│ ├── pages/ # Pages (Home, ProductPage, CheckoutPage, etc.)
│ ├── store/ # Zustand store setup
│ ├── styledComponents/ # Utility styled components
| ├── themes/ # theme component
│ └── App.tsx # Main component with routing setup
│
├── package.json # Project dependencies and scripts
|── README.md # Project documentation
|── tsconfig.json # Typescript configuration for this project

### Available Scripts

- npm start: Starts the app in development mode.
- npm run build: Bundles the app for production.
- npm test: Runs the test suite.

### Dependencies

- react
- Zustand
- react-router-dom
- axios
- styled-components
- MUI
