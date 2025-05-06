import Modal from "./Modal";
import { useState } from "react";
import "../styles/editTodo.css";

function EditTodo({ open, onClose, toEditTitle, toEditDescription, id }) {
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`http://localhost:5000/service/todo/update_todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo_name: title,
          todo_desc: description,
        }),
      });
  
      if (res.ok) {
        onClose();
        window.location.reload();
      } else {
        console.error("Failed to update todo");
      }
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };
  

  return (
    <Modal modalLable="Edit Todo" onClose={onClose} open={open}>
      <form className="editTodo" name="updateTodo" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTodo;
