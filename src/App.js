import {useState, useEffect} from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard";
import api from './utils/api'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [filter, setFilter] = useState('all');

  const getTasks = async()=>{
      const response = await api.get('/tasks');
      console.log("response : " , response);
      setTodoList(response.data.data);      
  }

  const addTask = async()=>{
    try{
      console.log("click");
      const response = await api.post('/tasks',{task: todoValue, isComplete: false});
      if(response.status === 200){
        console.log("Succese")
        getTasks();
        setTodoValue("");
      }else{
        throw new Error('task can not be added');
      }
    }catch(err){
        console.log("error",err);
    }
  }

  const deleteTask = async (id) =>{
    try {
      await api.delete(`/tasks/${id}`);
      getTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  }

  const updateTask = async (id, task, isComplete) => {
    try {
      await api.put(`/tasks/${id}`, { task, isComplete });
      getTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  }

  const clearAllTasks = async () => {
    try {
      await api.delete('/tasks/clear');
      getTasks();
    } catch (err) {
      console.error('Error clearing tasks:', err);
    }
  }

  useEffect(()=>{
    getTasks();
  },[])

  const filteredTasks = todoList.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.isComplete;
    if (filter === 'complete') return task.isComplete;
    return false;
  });

  return (
    
     <Container>
      <Row>
        <Col>
          <h2>To Do List</h2>
        </Col>
      </Row>
      <div className="add-item-row">        
          <input
            type="text"
            placeholder="Add your Task"
            className="input-box"
            value = {todoValue}
            onChange={(event)=>setTodoValue(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                addTask();
              }
            }}
          ></input>       
        <button className="button-add" onClick={addTask}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <Row className="filter-buttons-row">
        <Col className="filter-buttons-col">
          <button className={`filter-button ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`filter-button ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
          <button className={`filter-button ${filter === 'complete' ? 'active' : ''}`} onClick={() => setFilter('complete')}>Complete</button>
        </Col>
        <Col className="clear-button-col">
          <button className="button-clear" onClick={clearAllTasks}>Clear All</button>
        </Col>
      </Row>

      <TodoBoard 
        todoList = {filteredTasks} 
        deleteTask = {deleteTask}
        updateTask = {updateTask}
      />
    </Container>
    

   
  );
}

export default App;
