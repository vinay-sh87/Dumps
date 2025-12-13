import { useState } from "react";

const Toggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="mt-4">
        <button
          className="btn btn-warning my-3"
          onClick={() => setIsOpen(true)}
        >
          Open Model
        </button>
        {isOpen && (
          <div>
            <div className="d-flex justify-content-between">
              <h2>Model Opened</h2>
              <button
                className="btn fs-5 p-1 bg-white"
                onClick={() => setIsOpen(false)}
              >
                ❌
              </button>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              nihil temporibus, error possimus aperiam repellendus ex facere eum
              vel, provident voluptate. Officia, nostrum sapiente? Quod facere
              aut sunt eos ducimus?
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default Toggle;
