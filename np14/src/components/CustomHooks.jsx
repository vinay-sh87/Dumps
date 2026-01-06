import { useState } from "react";

function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  return { isOpen, toggleOpen, setIsOpen };
}

function useCounter(initialValue = 0) {
  const [value, setValue] = useState(initialValue);
  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => prev - 1);
  const reset = () => setValue(0);
  const set = (val) => setValue(val);

  return { value, setValue, increment, decrement, reset, set };
}

function useArray(initialValue = []) {
  const [arr, setArr] = useState(initialValue);
  const push = (element) => setArr((prev) => [...prev, element]);
  const remove = (element) => {
    setArr((prev) => {
      if (!prev.includes(element)) {
        alert("element does not exists...");
        return prev;
      }
      return prev.filter((item) => item !== element);
    });
  };
  const filter = (callback) => {
    setArr((prev) => prev.filter(callback));
  };
  const update = (index, newItem) => {
    setArr((prev) => prev.map((item, i) => (i === index ? newItem : item)));
  };
  const clear = () => setArr([]);

  return {
    arr,
    setArr,
    push,
    remove,
    filter,
    update,
    clear,
  };
}

export default function CustomHooks() {
  const { isOpen, toggleOpen, setIsOpen } = useToggle(false);
  const { value, setValue, increment, decrement, reset, set } = useCounter("");
  const [target, setTarget] = useState(0);
  const { arr, setArr, push, remove, filter, update, clear } = useArray([
    10, 20, 37, 11,
  ]);
  

  return (
    <>
      <button
        className="bg-red-500 px-5 py-2 m-5 rounded shadow-lg text-white"
        onClick={toggleOpen}
      >
        Toggle : {isOpen ? "ON" : "OFF"}
      </button>
      <div>
        <p className="p-5">Value: {value}</p>
        <div>
          <button
            className="px-5 py-2 me-3 bg-orange-700 text-white rounded shadow-md "
            onClick={increment}
          >
            Increment
          </button>
          <button
            className="px-5 py-2 me-3 bg-orange-700 text-white rounded shadow-md "
            onClick={decrement}
          >
            Decrement
          </button>
          <button
            className="px-5 py-2 me-3 bg-orange-700 text-white rounded shadow-md "
            onClick={reset}
          >
            Reset
          </button>
          Set{" "}
          <input
            className="border px-5 py-2 me-3 rounded"
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
          <button
            className="px-5 py-2 me-3 bg-orange-700 text-white rounded shadow-md "
            onClick={() => set(Number(target))}
          >
            Click to set
          </button>
        </div>
      </div>
    </>
  );
}
