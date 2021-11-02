import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const {signInUsingGoogle} = useAuth();
    return (
        <div className="login-form">
            <div>
                <h2>Register : Create Account</h2>
                <form onSubmit="">
                    <input type="email" name="" id="" placeholder="your email"/>
                    <br/>
                    <input type="password" name="" id="" placeholder="your password" />
                    <br/>
                    <input type="password" name="" id="" placeholder="re-enter password" />
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
                <p>Already have an account ? <Link to="login">Log in</Link></p>

                <div>...........or............</div>
                <button onClick={signInUsingGoogle} className="btn-regular">Sign in with Google</button>
            </div>
        </div>
    );
};

export default Register;