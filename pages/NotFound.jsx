import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Go to home page</Link>
    </section>
  );
}