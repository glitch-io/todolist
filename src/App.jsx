// App.js
import { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import { Plus } from "phosphor-react";

function App() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let todayDate = `${day}/0${month}/${year}`;
  let [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const hours = date.getHours();
      const minutes =
        date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      setTime(`${hours}:${minutes}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || [],
  );

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (inputText.trim() !== "") {
      const newTodo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        text: inputText,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputText("");
    }
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };
  return (
    <div className="px-4 py-10 sm:px-28 md:px-36 lg:px-40">
      <div
        className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between
      "
      >
        <h1 className="mb-5 text-3xl font-bold">Todo List</h1>
        <p>
          Date:{todayDate} <br />
          TIme:{time}
        </p>
      </div>
      <form
        onSubmit={handleAddTodo}
        className="mb-4 flex justify-between rounded-lg border border-blue-700 p-2 "
      >
        <input
          className="w-4/5 border-0
           bg-slate-900 outline-0 placeholder:bg-slate-900 placeholder:text-blue-700 focus:bg-slate-900"
          type="text"
          placeholder="Enter new todo"
          value={inputText}
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          className="rounded-md bg-blue-700 px-4 py-2 text-blue-50 hover:bg-blue-600"
        >
          <Plus />
        </button>
      </form>
      <Tasks
        todos={todos}
        handleDelete={handleDelete}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
