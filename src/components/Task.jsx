function Task({ todo, toggleComplete, handleDelete }) {
  return (
    <li
      key={todo.id}
      className="g my-3 flex items-center justify-between gap-x-6 overflow-auto rounded-lg bg-slate-200 p-4 py-3
      shadow-lg dark:bg-slate-800"
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
        className=" inline-block rounded-md border border-[1] border-red-800 bg-slate-800 px-2 py-0.5 text-red-800 hover:bg-red-600 hover:text-slate-100"
        onClick={() => handleDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default Task;
