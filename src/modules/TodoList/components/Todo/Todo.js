import React from "react";

import "./Todo.css";

const Todo = ({ task, onRemoveClick, onTaskClick }) => {
  return (
    <li className="todo list-group-item">
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn no-focus text-left w-100"
            onClick={() => onTaskClick(task.id, !task.done)}
          >
            {task.done ? <s>{task.label}</s> : task.label}
            {task.done ? <span> &#10003;</span> : null}
          </button>
        </div>
        <div className="col-auto ">
          <button
            className="btn btn-sm btn-danger col-auto w-100"
            type="button"
            onClick={() => onRemoveClick(task.id)}
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
};

export default Todo;
