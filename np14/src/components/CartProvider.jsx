import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = items.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };
  const total = items.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    total,
    itemCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useShopingCart() {
  return useContext(CartContext);
}

