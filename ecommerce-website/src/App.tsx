import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import HomePage1 from "./pages/HomePage1";
import Products from "./pages/Products";
import ProductDetailPage1 from "./pages/ProductPage1";
import AddToCart1 from "./pages/AddToCart1";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Profile from "./pages/ProfileLayout";
import ViewOrders1 from "./pages/ViewOrders1";
import AdminDashBoard1 from "./pages/AdminDashBoard1";
import AdminOperations from "./pages/AdminOperations";
import CustomTheme from "./themes/CustomTheme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { path: "/", element: <HomePage1 /> },
      { path: "/:category", element: <Products /> },
      { path: "/product-detail-page/:id", element: <ProductDetailPage1 /> },
      { path: "/add-to-cart", element: <AddToCart1 /> },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute role={"customer"}>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute role={"customer"}>
              <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-orders",
        element: (
          <ProtectedRoute role={"customer"}>
            <ViewOrders1 />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute role={"admin"}>
              <AdminDashBoard1 />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-operations",
        element: (
          <ProtectedRoute role={"admin"}>
            <AdminOperations />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <h1>Page Not Available</h1> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
