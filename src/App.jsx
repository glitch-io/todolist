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
    <div className="py-10 px-8 sm:px-28 md:px-36 lg:px-40">
      <div
        className="flex flex-col mb-4 md:flex-row md:justify-between md:items-center
      "
      >
        <h1 className="text-3xl font-bold mb-5">Todo List</h1>
        <p>
          Date:{todayDate} <br />
          TIme:{time}
        </p>
      </div>
      <form
        onSubmit={handleAddTodo}
        className="flex justify-between border rounded-lg border-blue-700 p-2 mb-4 "
      >
        <input
          className="border-0 outline-0
           placeholder:bg-slate-900 placeholder:text-blue-700 w-4/5 focus:bg-slate-900 bg-slate-900"
          type="text"
          placeholder="Enter new todo"
          value={inputText}
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-700 text-blue-50 hover:bg-blue-600 rounded-md"
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
