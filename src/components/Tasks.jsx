import Task from "./Task";
import { verse } from "../assets/verse.json";
let randomId = Math.floor(Math.random() * 701) + 1;
let shlok = verse[randomId].text;
function Tasks({ todos, toggleComplete, handleDelete }) {
  return (
    <>
      <h2 className="my-2 text-2xl font-semibold">Your Task</h2>
      <div className="not-prose relative overflow-hidden rounded-xl ">
        <ul className="">
          {todos.length === 0 && (
            <p className="flex items-center justify-center rounded-lg border-black p-4 text-center shadow-lg dark:bg-slate-800">
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
