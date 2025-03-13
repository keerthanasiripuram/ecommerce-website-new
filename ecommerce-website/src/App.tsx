import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import Products from "./pages/Products";
import ProductDetailPage1 from "./pages/ProductPage1";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import AdminOperations from "./pages/AdminOperations";
import CustomTheme from "./themes/CustomTheme";
import HomePage1 from "./pages/HomePage1";
import ViewOrders1 from "./pages/ViewOrders1";
import AddToCart1 from "./pages/AddToCart1";
import { Loaderstyle } from "./styledComponents/StyledComponent";
const Profile = React.lazy(() => import("./pages/Profile"));
const AdminDashBoard1 = React.lazy(() => import("./pages/AdminDashBoard1"));

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
            <Suspense fallback={<Box sx={Loaderstyle}></Box>}>
              <Profile />
            </Suspense>
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
            <Suspense fallback={<Box sx={Loaderstyle}></Box>}>
              <AdminDashBoard1 />
            </Suspense>
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
