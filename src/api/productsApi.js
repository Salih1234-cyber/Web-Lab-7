const BASE_URL = "https://dummyjson.com/products";

export async function fetchProducts(signal) {
  const response = await fetch(`${BASE_URL}?limit=100`, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();
  return result.products;
}

export async function fetchProduct(id, signal) {
  const response = await fetch(`${BASE_URL}/${id}`, { signal });

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
}