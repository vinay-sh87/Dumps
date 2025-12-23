import { useReducer } from "react";

const initialState = {
  items: [],
  total: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'addItem':
      { const existingItem = state.items.find(
        item => item.id === action.item.id
      );
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.item.price
        };
      } else {
        return {
          items: [...state.items, { ...action.item, quantity: 1 }],
          total: state.total + action.item.price
        };
      } }
    
    case 'removeItem': {
      const item = state.items.find(item => item.id === action.id);
      
      return {
        items: state.items.filter(item => item.id !== action.id),
        total: state.total - (item.price * item.quantity)
      };
    }
    
    case 'clearCart':
      return initialState;
    
    default:
      return state;
  }
}

export default function Cart() {
  const [cart, dispatch] = useReducer(reducer, initialState);
  
  const products = [
    { id: 1, name: 'Apple', price: 1 },
    { id: 2, name: 'Banana', price: 0.5 },
    { id: 3, name: 'Orange', price: 0.75 }
  ];
  
  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => dispatch({ 
            type: 'addItem', 
            item: product 
          })}>
            Add to Cart
          </button>
        </div>
      ))}
      
      <h2>Cart</h2>
      {cart.items.map(item => (
        <div key={item.id}>
          <span>{item.name} x {item.quantity}</span>
          <button onClick={() => dispatch({ 
            type: 'removeItem', 
            id: item.id 
          })}>
            Remove
          </button>
        </div>
      ))}
      
      <p>Total: ${cart.total}</p>
      <button onClick={() => dispatch({ type: 'clearCart' })}>
        Clear Cart
      </button>
    </div>
  );
}
