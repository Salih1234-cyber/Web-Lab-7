import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
        />
        <h3>{product.title}</h3>
      </Link>

      <p>{product.category}</p>
      <p>${product.price.toFixed(2)}</p>
    </article>
  );
}