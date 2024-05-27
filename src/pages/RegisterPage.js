import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from '../utils/api'

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit= async (event)=>{
    try{
      event.preventDefault();
      if(password !== repeatPassword){
      throw new Error("Password does not match, try again!")
      }
      const response = await api.post('/user', {name, email, password});
      if(response.status === 200){
        navigate('/login');
      }else{
        throw new Error(response.data.error)
      }
    }catch(error){
      setError(error.message);
    }
    
  }

  return (
    <div className="display-center">
      
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>Sign UP</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(event)=>{setName(event.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>{setEmail(event.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"onChange={(event)=>{setPassword(event.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter your password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password"onChange={(event)=>{setRepeatpassword(event.target.value)}} />
        </Form.Group>

        {error && <div className="error-message">{error}</div>}

        <Button className="button-primary" type="submit">
          register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;