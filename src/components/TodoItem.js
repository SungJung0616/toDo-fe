import React, {useState} from "react";
import { Col, Row,Dropdown, DropdownButton } from "react-bootstrap";

const TodoItem = ({item, deleteTask, updateTask, user}) => {
  console.log('TodoItem props:', { item, deleteTask, user });
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(item.task);
  const [isComplete, setIsComplete] = useState(item.isComplete);

  const handleSave = () => {
    updateTask(item._id, task, isComplete);
    setIsEditing(false);
  };
  
  const canEdit = user._id === item.author._id;
  console.log("canEdit",canEdit)

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${isComplete ? 'completed' : ''}`}>
          <div className="todo-content">
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={isComplete}
              onChange={() => {
                if (canEdit) {
                  setIsComplete(!isComplete);
                  updateTask(item._id, task, !isComplete);
                }
              }}
              disabled={!canEdit}
            />
            {isEditing ? (
              <input
                className="todo-task"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onBlur={handleSave}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSave();
                  }
                }}
                disabled={!canEdit}
              />
            ) : (
              <span>{task}</span>
            )}
          </div>
          <div className="author-box">by {item.author.name}</div>
          
            <div>
              <DropdownButton id="dropdown-basic-button" title="⋯">
                <Dropdown.Item onClick={() => {if(canEdit){setIsEditing(true)}}} >Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => {if(canEdit){deleteTask(item._id)}}}>Delete</Dropdown.Item>
              </DropdownButton>
            </div>
          
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
