import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';
import { useLocation, useHistory } from 'react-router';

const Login = () => {
    const {signInUsingGoogle,setIsLoading} = useAuth();
    const location = useLocation();
    console.log(" this is location",location)
    const history = useHistory();
    console.log( "came from" ,location.state?.from);
    const redirect_uri = location.state?.from || '/shop';

    const handleGoogleLogin = () =>{
        signInUsingGoogle()
        .then(result =>{
            history.push(redirect_uri);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }
    return (
        <div className="login-form">
            <div>
                <form>
                    <input type="email" placeholder="your email"/>
                    <br/><br/>
                    <input type="password" placeholder="your email"/>
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                </form>

                <p>new to Ema-Jhon? <Link to="/register">Creat Account</Link> </p>

                <div>..........or............</div>

                <button onClick={handleGoogleLogin} className="btn-regular">Sign in with Google</button>
            </div>
        </div>
    );
};

export default Login;