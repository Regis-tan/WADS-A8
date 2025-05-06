import "../styles/todolist.css";
import { useState } from "react";
import Todo from "./Todo";
import EditTodo from "./EditTodo";

function TodoList({ id, title, description, completed }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  return (
    <div className={`todoList ${checked && "todoList--borderColor"}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          type="checkbox"
          onChange={async () => {
            const newStatus = !checked;
            setChecked(newStatus);
          
            try {
              await fetch(`http://localhost:5000/service/todo/update_todo/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  todo_status: newStatus ? "finished" : "active"
                }),
              });
            } catch (err) {
              console.error("Failed to update todo status:", err);
            }
          }}          
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
        ></label>
      </div>
      <div className="todoList__body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="todoList__buttons">
          <div className="todoList__deleteNedit">
            <button
              className="todoList__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button
              className="todoList__deleteButton"
              onClick={async () => {
                try {
                  await fetch(`http://localhost:5000/service/todo/delete_todo/${id}`, {
                    method: "DELETE",
                  });
                  window.location.reload();
                } catch (err) {
                  console.error("Failed to delete todo:", err);
                }
              }}
            >
              Delete
            </button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>

      {open.view && (
        <Todo
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditTodo
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default TodoList;
