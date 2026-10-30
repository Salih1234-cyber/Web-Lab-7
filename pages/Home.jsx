import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <h1>Welcome to My Shop</h1>
      <p>Discover products for everyday life.</p>
      <Link to="/products">Browse products</Link>
    </section>
  );
}