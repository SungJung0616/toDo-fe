import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({todoList, deleteTask, updateTask}) => {
  
  return (
    <div>
        {todoList.length>0? 
        todoList.map((item)=>
        <TodoItem
          key={item._id}
          item={item} 
          deleteTask = {deleteTask}
          updateTask = {updateTask}
        />) 
        : ""}
      
    </div>
  );
};

export default TodoBoard;
