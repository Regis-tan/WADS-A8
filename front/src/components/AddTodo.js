import Modal from "./Modal";
import { useState } from "react";
import "../styles/addTodo.css";
import axios from "axios";

function AddTodo({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const todo_image = "https://api.dicebear.com/9.x/icons/svg?seed=Katherine";

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://localhost:5000/service/todo/add_todo", {
        todo_image,
        todo_name: title,
        todo_desc: description,
        todo_status: "active", 
      });

      onClose();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <Modal modalLable="Add Todo" onClose={onClose} open={open}>
      <form className="addTodo" name="addTodo" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter title"
          required
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          value={description}
          required
        ></textarea>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTodo;
