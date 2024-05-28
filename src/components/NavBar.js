import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();  
 

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
        <Link className="navbar-home" to="/">Home</Link>
        <div className="navbar-buttons">
        {user ? (
          <button className="navbar-logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link className="navbar-button" to="/login">Login /</Link>            
            <Link className="navbar-button" to="/register"> Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;