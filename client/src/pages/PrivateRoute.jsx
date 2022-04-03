import React from 'react';
import { useContext } from 'react';
import { Context } from '../context/Context';
import { Navigate } from 'react-router';

const PrivateRoute = ({children,redirectPath}) => {
    const {user} = useContext(Context)
    if(!user){
        return <Navigate to={redirectPath} replace />;
    }
    return children
};

export default PrivateRoute;