import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";
function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load theme from localStorage
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("isDark");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      isChecked: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const updateTodo = () => {
    if (editText.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setInput(capitalized);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setSearch(capitalized);
  };

  const handleEditInputChange = (e) => {
    const value = e.target.value;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setEditText(capitalized);
  };

  const toggleTheme = () => setIsDark(!isDark);

  const total = todos.length;
  const completed = todos.filter((todo) => todo.isChecked).length;
  const pending = total - completed;

  // Add this in your App.jsx
useEffect(() => {
  document.body.className = isDark ? "dark-mode" : "light-mode";
}, [isDark]);


  return (
    <div className={`app ${isDark ? "dark" : "light"} `}>
      <div  className="theme">
      <button className="theme-toggle" onClick={toggleTheme}>
        <i className={`fa ${isDark ? "fa-sun" : "fa-moon"}`}></i>
      </button>
      </div>
      <h1>Todo List</h1>

      <input
        type="text"
        className="input search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={handleSearchChange}
      />

      <div className="input-section">
        <input
          type="text"
          className="input add-input"
          placeholder="Add a task..."
          value={input}
          onChange={handleInputChange}
        />
        <button 
  onClick={addTodo} 
  className={`button ${isDark ? "dark-button" : "light-button"}`}
>
  Add
</button>
      </div>

      <div className="status">
  <p><i className="fa fa-list-ul"></i> Total: {total}</p>
  <p><i className="fa fa-check-circle"></i> Completed: {completed}</p>
  <p><i className="fa fa-hourglass-half"></i> Pending: {pending}</p>
</div>


      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCheck={() => toggleCheck(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={() => startEditing(todo.id, todo.text)}
            isEditing={editingId === todo.id}
            editText={editText}
            onEditChange={handleEditInputChange}
            onUpdate={updateTodo}
            onCancel={cancelEditing}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;