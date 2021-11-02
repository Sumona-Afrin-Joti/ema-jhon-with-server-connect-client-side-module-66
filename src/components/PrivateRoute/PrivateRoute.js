import userEvent from '@testing-library/user-event';
import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = (props) => {
   const {children, ...rest} = props;
   console.log( children, props)
    const {user} = useAuth();
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