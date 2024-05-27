
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/NavBar"
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage"
import RegisterPage from "./pages/RegisterPage";


function App() {
    return (  
     <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><TodoPage /></PrivateRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes> 

     </div>
       
  );
}

export default App;
