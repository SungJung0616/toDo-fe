import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user,children }) => {
    

    return user ? React.cloneElement(children, { user }) : <Navigate to="/login" />;
}

export default PrivateRoute
