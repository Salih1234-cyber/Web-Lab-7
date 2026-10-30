import { useCallback } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";
import { fetchProduct } from "../api/productsApi";
import useFetch from "../hooks/useFetch";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const fetcher = useCallback(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const { loading, error, data } = useFetch(
    fetcher,
    [id]
  );

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p role="alert">Product not found.</p>;
  }

  if (!data) {
    return <p>Product not found.</p>;
  }

  return (
    <section className="product-detail">
      <button onClick={() => navigate("/products")}>
        Back to products
      </button>

      <img src={data.thumbnail} alt={data.title} />

      <div>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <p>Category: {data.category}</p>
        <p>Price: ${data.price.toFixed(2)}</p>

        <button onClick={() => addItem(data)}>
          Add to cart
        </button>
      </div>
    </section>
  );
}