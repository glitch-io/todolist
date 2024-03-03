import Task from "./Task";
import { verse } from "../assets/verse.json";
let randomId = Math.floor(Math.random() * 701) + 1;
let shlok = verse[randomId].text;
function Tasks({ todos, toggleComplete, handleDelete }) {
  return (
    <>
      <h2 className="my-2 text-2xl font-semibold">Your Task</h2>
      <div className="not-prose relative overflow-hidden rounded-xl bg-slate-800/25 ">
        <ul className="bg-grid-slate-700/25 inset-0 px-3">
          {todos.length === 0 && (
            <p className="flex items-center justify-center p-4 text-center">
              {shlok}
            </p>
          )}
          {todos.map((todo) => (
            <Task
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Tasks;
