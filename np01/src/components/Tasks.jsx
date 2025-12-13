import { useState } from "react";
import { Trash2 } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTasks = () => {
    if (!input.trim()) return;

    setTasks((p) => {
      return [...p, { id: Date.now(), text: input }];
    });
    setInput("");
  };
  const removeTask = (id) => {
    setTasks((p) => {
      return p.filter((task) => task.id !== id);
    });
  };

  return (
    <>
      <div className="py-4">
        <h2>Tasks</h2>
        <div className="d-flex gap-3 pt-3">
          <input
            className="border-0 p-2 text-black bg-white w-50"
            type="text"
            placeholder="Add tasks"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="w-25 btn btn-success rounded-1" onClick={addTasks}>
            Add Task
          </button>
        </div>
        <ul className="px-0 py-3">
          {tasks.map((task) => (
            <li
              className="list-unstyled px-3 mb-2 rounded-2 d-flex justify-content-between align-items-center bg-white text-black fw-semibold"
              key={task.id}
            >
              {task.text}{" "}
              <button
                className="border-0 p-2 bg-white rounded-5"
                onClick={() => removeTask(task.id)}
              >
                <Trash2 color="darkred" style={{ background: "white" }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Tasks;
