import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import Layout from "./components/Layout";
import ProductsLayout from "./components/ProductsLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="products" element={<ProductsLayout />}>
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>

        <Route path="login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}