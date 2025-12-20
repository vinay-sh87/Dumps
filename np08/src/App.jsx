import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

export function Component() {
  useEffect(() => {
    console.log("Component mounted");

    return () => {
      console.log("Component will unmount");
    };
  }, []);
}

export function Timer() {
  const [totalseconds, setTotalSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const seconds = Math.floor(totalseconds % 60);
  const minutes = Math.floor((totalseconds % 3600) / 60);
  const hours = Math.floor(totalseconds / 3600);

  return (
    <>
      <div>
        <p>Hours: {String(hours).padStart(2, 0)}</p>
        <p>Minutes: {String(minutes).padStart(2, 0)}</p>
        <p>Seconds: {String(seconds).padStart(2, 0)}</p>
      </div>
    </>
  );
}

export function CountDownTimer({
  initialHours,
  initialMinutes,
  initialSeconds,
}) {
  const [totalSeconds, setTotalSeconds] = useState(
    initialHours * 3600 + initialMinutes * 60 + initialSeconds
  );

  useEffect(() => {
    if (totalSeconds <= 0) return;
    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [totalSeconds]);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return (
    <>
      <div>
        {totalSeconds > 0 ? (
          <div className="d-flex p-5 gap-4 bg-warning">
            <div className="">
              <p className="border px-3 py-2 mb-1 text-white bg-black fw-semibold fs-5 rounded-2 shadow">
                {String(hours).padStart(2, 0)}
              </p>
              <p className="">Hours</p>
            </div>
            <div className="">
              <p className="border px-3 py-2 mb-1 text-white bg-black fw-semibold fs-5 rounded-2 shadow">
                {String(minutes).padStart(2, 0)}
              </p>
              <p className="">Minutes</p>
            </div>
            <div className="">
              <p className="border px-3 py-2 mb-1 text-white bg-black fw-semibold fs-5 rounded-2 shadow">
                {String(seconds).padStart(2, 0)}
              </p>
              <p className="">Seconds</p>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-warning fs-4">Offer Ended!</div>
        )}
      </div>
    </>
  );
}

export function DiscountTimer({
  originalPrice,
  discountPercent = 20,
  durationInSeconds = 120,
}) {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const discountActive = timeLeft > 0;

  const discountedPrice = discountActive
    ? Math.floor(originalPrice * (1 - discountPercent / 100))
    : originalPrice;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ border: "1px solid red", padding: "12px" }}>
      <h3>🔥 Limited Time Offer</h3>

      {discountActive ? (
        <>
          <p>
            ⏳ Ends in {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>

          <p>
            <del>₹{originalPrice}</del> <strong>₹{discountedPrice}</strong>{" "}
            <span style={{ color: "green" }}>({discountPercent}% OFF)</span>
          </p>
        </>
      ) : (
        <>
          <p style={{ color: "gray" }}>Offer expired</p>
          <p>Price: ₹{originalPrice}</p>
        </>
      )}
    </div>
  );
}

// useState -- use state causes re-render
// useRef -- access the dom without causing re-render
// React ignores ref changes
// Ref is just a plain js object

export function LoginForm() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <input ref={inputRef} type="text" />
      <button className="btn btn-primary" onClick={focusInput}>
        Focus Input
      </button>
    </>
  );
}

export function BoxMeasure() {
  const boxRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const MeasureDimensions = () => {
    const { width, height } = boxRef.current.getBoundingClientRect();
    if (boxRef.current) {
      setDimensions({ width, height });
    }
  };
  useEffect(() => {
    MeasureDimensions();
  }, []);

  return (
    <>
      <div
        ref={boxRef}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "crimson",
          color: "#fff",
        }}
        className="d-flex align-items-center justify-content-center fs-5 mb-2"
      >
        Box
      </div>
      <p>
        Width: {dimensions.width}px, Height: {dimensions.height}px
      </p>
    </>
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Rendered again...");
  }, []); // empty dependency array will run only once on mount

  useEffect(() => {
    console.log("Runs only when count changes...");
  }, [count]);
  return (
    <>
      <Component />
      <button
        className="btn btn-danger"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Count: {count}
      </button>

      <Timer />
      <CountDownTimer initialHours={0} initialMinutes={0} initialSeconds={20} />
      <DiscountTimer
        originalPrice={1999}
        discountPercent={30}
        durationInSeconds={180}
      />
      <LoginForm />
      <BoxMeasure />
      <ShowCounter />
      <ReducerExample />
    </>
  );
}

const UserContext = createContext();

function MainParent() {
  const user = { name: "john", age: 23, email: "mail33@hotmail.com" };
  return (
    <>
      <UserContext.Provider value={user}>
        <ChildParent />
      </UserContext.Provider>
    </>
  );
}

function ChildParent() {
  return (
    <>
      <Child />
    </>
  );
}

function Child() {
  const user = useContext(UserContext);
  return (
    <>
      <p>Name : {user.name}</p>
      <p>Age : {user.age}</p>
      <p>Email : {user.email}</p>
    </>
  );
}

const CountContext = createContext();

function ShowCounter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <CountContext.Provider value={{ count, setCount }}>
        <Display />
        <Buttons />
      </CountContext.Provider>
    </>
  );
}

function Display() {
  const { count } = useContext(CountContext);
  return (
    <>
      <h1>Count: {count}</h1>
    </>
  );
}

function Buttons() {
  const { setCount } = useContext(CountContext);
  return (
    <>
      <button
        className="btn btn-danger"
        onClick={() => setCount((prev) => prev - 1)}
      >
        Decrement
      </button>
      <button
        className="btn-primary btn"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Increment
      </button>
    </>
  );
}

function ReducerExample() {
  function reducer(state, action) {
    if (action.type === "increment") {
      return state + 1;
    }
    if (action.type === "decrement") {
      return state - 1;
    }
    if (action.type === "reset") {
      return 0;
    }
    return state;
  }
  const [count, dispatch] = useReducer(reducer, 0);
  // const [state,dispatch] = useReducer(reducer, initialValue)
  // state - Current state value --> (count)
  // dispatch - Function to send actions  --> function to send the type of action
  // reducer - Function that decides how to update state --> how the state will be treated
  // initialState - Starting state --> starting value of the state 
  return (
    <>
      <p>Count: {count}</p>
      <button
        className="btn btn-outline-dark me-2"
        onClick={() => dispatch({ type: "decrement" })}
      >
        -
      </button>
      <button
        className="btn btn-outline-dark me-2"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
      <button
        className="btn btn-outline-dark me-2"
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </button>
    </>
  );
}

