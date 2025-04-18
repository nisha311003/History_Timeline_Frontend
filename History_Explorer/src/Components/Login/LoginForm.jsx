import React, { useState } from 'react';
import './LoginForm.css';
import 'boxicons';
import { useDispatch } from 'react-redux';
import { enableZoneMainPanel } from '../../redux/redux/AppUIStateReducer';
// import { someLoginAction } from '../actions'; // Optional: Your redux action

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        fetch("https://history-explorer-backend-4.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email, password })
        })
        .then(async data => {
            console.log("inside loginform", data);
            if (data) {
                console.log("Logged In");
                dispatch(enableZoneMainPanel())
                // Call the passed prop function
                onLogin(); 
            }
        })
        .catch(error=>{
            console.log("Hi",error); 
        })
    };

    return (
        <div className='login-page-wrapper'>
            <div className='form_container'>
                <span className='animation'></span>

                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input">
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="text">Email</label>
                            <box-icon name='envelope' type='solid' color='#ffffff'></box-icon>
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <box-icon name='lock-alt' type='solid' flip='horizontal' color='#ffffff'></box-icon>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" />Remember me</label>
                        </div>
                        <button type="submit">Login</button>
                        <div className="register">
                            <p>Don't have an account?<a href="#"></a></p>
                        </div>
                    </form>
                </div>

                <div className='info-text login'>
                    <h2>Welcome Back!</h2>
                    <p>Hello!</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
