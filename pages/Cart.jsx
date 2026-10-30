import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore(
    (state) => state.setQuantity
  );
  const removeItem = useCartStore(
    (state) => state.removeItem
  );
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your cart</h1>

      {items.map((item) => (
        <article className="cart-item" key={item.id}>
          <h2>{item.title}</h2>
          <p>Price: ${item.price.toFixed(2)}</p>

          <label>
            Quantity
            <input
              type="number"
              min="1"
              step="1"
              value={item.quantity}
              onChange={(event) => {
                const quantity = Number(event.target.value);

                if (Number.isInteger(quantity)) {
                  setQuantity(item.id, quantity);
                }
              }}
            />
          </label>

          <p>
            Subtotal: $
            {(item.price * item.quantity).toFixed(2)}
          </p>

          <button
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </article>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>

      <button onClick={clear}>Clear cart</button>

      <p>
        <Link to="/products">Continue shopping</Link>
      </p>
    </section>
  );
}