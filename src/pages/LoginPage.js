import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from '../utils/api'
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async(event) =>{
    event.preventDefault();
    try{
      const response = await api.post('/user/login',{email, password});
      if(response.status === 200){
        setUser(response.data.user);
        sessionStorage.setItem("token",response.data.token);
        api.defaults.headers["authorization"]= "Bearer" + response.data.token;
        setError("")
        navigate('/');
      }
      throw new Error(response.message)
      
    }catch(error){
      setError(error.message);
    }
  }

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>Log In</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
        </Form.Group>
        {error && <div className="error-message">{error}</div>}
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            need Account? <Link to="/register"> Sign Up</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;