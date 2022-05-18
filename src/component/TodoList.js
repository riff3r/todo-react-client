import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const TodoList = ({ todo, refetch }) => {
  const [status, setStatus] = useState(todo.status);

  const { title, _id } = todo;

  const handleStatus = () => {
    const url = `http://localhost:5000/list/${_id}`;
    axios.put(url).then((res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success("Task Complete");
        setStatus(true);
        refetch();
      }
    });
  };

  const handleDelete = () => {
    const url = `http://localhost:5000/list/${_id}`;
    axios.delete(url).then((res) => {
      if (res.status === 200) {
        refetch();
        toast.error("Todo Deleted");
      }
    });
  };

  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-500 rounded p-5 flex justify-between items-center mb-5 ">
      <h2 className={`text-white font-semibold text-2xl ${status && "done"}`}>
        {title}
      </h2>

      <div className="flex gap-5">
        <button
          onClick={handleStatus}
          className="btn btn-xs btn-success"
          disabled={status}
        >
          Done
        </button>

        <button onClick={handleDelete} className="btn btn-xs btn-error">
          X
        </button>
      </div>
    </div>
  );
};

export default TodoList;
