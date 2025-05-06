import "../styles/title.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import { useState, useEffect } from "react";
import axios from "axios";

function Title() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/service/todo/get_all")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Failed to fetch todos:", err));
  }, []);

  return (
    <div className="title">
      <header>Todo App</header>
      <div className="title__container">
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>
        <div className="title">
          {todos.map((todo) => (
            <TodoList
              key={todo._id}
              id={todo._id}
              title={todo.todo_name}
              description={todo.todo_desc}
              completed={todo.todo_status === "finished"}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default Title;
