import {
  useSearchParams
} from "react-router-dom";
import { fetchProducts } from "../api/productsApi";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const { loading, error, data } = useFetch(
    fetchProducts,
    []
  );

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const products = data || [];

  const categories = [
    ...new Set(products.map((product) => product.category))
  ].sort();

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory =
      category === "" || product.category === category;

    return matchesQuery && matchesCategory;
  });

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    setSearchParams(nextParams);
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  return (
    <section>
      <h1>Products</h1>

      <div className="filters">
        <label>
          Search by title
          <input
            type="text"
            value={query}
            onChange={(event) =>
              updateFilter("q", event.target.value)
            }
            placeholder="Search products"
          />
        </label>

        <label>
          Category
          <select
            value={category}
            onChange={(event) =>
              updateFilter("category", event.target.value)
            }
          >
            <option value="">All categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}