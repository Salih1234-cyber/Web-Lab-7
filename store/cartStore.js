import { create } from "zustand";

function loadItems() {
  try {
    const storedItems = localStorage.getItem("cart");

    if (storedItems === null) {
      return [];
    }

    const parsedItems = JSON.parse(storedItems);

    if (!Array.isArray(parsedItems)) {
      return [];
    }

    return parsedItems.filter(
      (item) =>
        Number.isInteger(item.id) &&
        typeof item.title === "string" &&
        Number.isFinite(item.price) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

export const useCartStore = create((set) => ({
  items: loadItems(),

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1
                }
              : item
          )
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
          }
        ]
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.id !== id
      )
    })),

  setQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity < 1
          ? state.items.filter(
              (item) => item.id !== id
            )
          : state.items.map((item) =>
              item.id === id
                ? { ...item, quantity }
                : item
            )
    })),

  clear: () => set({ items: [] })
}));

useCartStore.subscribe((state, previousState) => {
  if (state.items !== previousState.items) {
    try {
      localStorage.setItem(
        "cart",
        JSON.stringify(state.items)
      );
    } catch {
      return;
    }
  }
});