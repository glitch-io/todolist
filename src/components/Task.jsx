function Task({ todo, toggleComplete, handleDelete }) {
  return (
    <li
      key={todo.id}
      className="flex justify-between items-center gap-x-6 py-3 overflow-auto p-4 shadow-lg rounded-lg bg-slate-800
      g my-3"
    >
      <div className="flex gap-2 text-cyan-50">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        <p className="text-base font-normal">{todo.text}</p>
      </div>
      <button
        className=" border-[1] border-red-800 px-2 py-0.5 text-red-800 bg-slate-800 border hover:bg-red-600 hover:text-slate-100 inline-block rounded-md"
        onClick={() => handleDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default Task;
