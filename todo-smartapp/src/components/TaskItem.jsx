import React from "react";

import "../App.css";


export const TaskItem = (props) => {
  const { item, index, onDone, onDelete} = props;
  return (
    <li
      className = "task-item"
      //key       = {item.id}
    >
      <span>
        <span
          style = {{ fontWeight: "bold" }}
        >{index + 1}. </span>
        <span
          style = {{ textDecorationLine: item.completed ? "line-through" : "none", }}
        >
          {item.title}
        </span>
      </span>
      <input
        className = "done-item"
        type      = "checkbox"
        checked   = {item.completed}
        onChange  = {(event) => onDone(item) }
      />
      <input
        className = "delete-item"
        type      = "checkbox"
        checked   = {item.deleted}
        onChange  = {(event) => onDelete(item) }
      />
    </li>
  )
}


