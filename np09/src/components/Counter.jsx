import { useReducer } from "react";

function reducer(state, action){
  switch(action.type){
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return 0;
    default:
      state;
  }
}

export default function Counter(){
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <>
    <p>Count: {count}</p>
    <button onClick={()=>dispatch({type: 'decrement'})}>Decrement</button>
    <button onClick={()=>dispatch({type: 'reset'})}>Reset</button>
    <button onClick={()=>dispatch({type: 'increment'})}>Increment</button>
    </>
  )
}