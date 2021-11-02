import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Spinner from 'react-bootstrap/Spinner'

const PrivateRoute = (props) => {
   const {children, ...rest} = props;
   console.log( children, props)
    const {user,isLoading} = useAuth();

    if(isLoading){
        return <Spinner animation="border" variant="success"></Spinner>
    }

    return (
        <Route
        
        {...rest}
        render = {({location})=>
            user.email? (children) :(
            
            <Redirect to={{
                
                pathname:"/login",
                state: {from:location}
        
        }} ></Redirect>
        
        )
        }

        >

        </Route>
    );
};

export default PrivateRoute;