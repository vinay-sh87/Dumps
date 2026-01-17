import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "cart_items";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "INIT_CART":
      return action.payload;
    case "ADD_ITEM": {
      const existing = state.find((i) => i.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...state, { ...action.payload, qt: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((item) => item.id != action.payload);

    case "UPDATE_QTY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty }
          : item
      );
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      dispatch({ type: "INIT_CART", payload: JSON.parse(stored) });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  }, []);
  const removeFromCart = useCallback((id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);
  const updateQuantity = useCallback((id, qty) => {
    if (qty < 1) return;
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  }, []);
  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.qty, 0);
  }, [cart]);
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      totalItems,
      totalPrice,

      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      cart,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ]
  );

  return (
    <>
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CarProvider");
  }
  return context;
};
