import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({todoList, deleteTask, updateTask, user}) => {
  console.log('TodoBoard props:',  user._id );
  return (
    <div>
        {todoList.length>0? 
        todoList.map((item)=>          
        <TodoItem
          key={item._id}
          item={item} 
          deleteTask = {deleteTask}
          updateTask = {updateTask}
          user={user}
        />) 
        : ""}
      
    </div>
  );
};

export default TodoBoard;
