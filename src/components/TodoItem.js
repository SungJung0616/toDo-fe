import React, {useState} from "react";
import { Col, Row,Dropdown, DropdownButton } from "react-bootstrap";

const TodoItem = ({item, deleteTask, updateTask}) => {
  console.log('TodoItem props:', { item, deleteTask });
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(item.task);
  const [isComplete, setIsComplete] = useState(item.isComplete);

  const handleSave = () => {
    updateTask(item._id, task, isComplete);
    setIsEditing(false);
  };
  
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
                setIsComplete(!isComplete);
                updateTask(item._id, task, !isComplete);
              }}
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
              />
            ) : (
              <span>{task}</span>
            )}
          </div>
          <div className="author-box">by {item.author.name}</div>
          <div>
            <DropdownButton id="dropdown-basic-button" title="⋯">
              <Dropdown.Item onClick={() => setIsEditing(true)}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => deleteTask(item._id)}>Delete</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
