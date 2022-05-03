import React, { useState, useEffect } from 'react'
import './styles.css';
import Navbar from '../Components/Navbar/navbar';
import { Link } from 'react-router-dom';
import { LoginUser } from '../api';
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await LoginUser({ email, password });
        if (!res.msgError) {
            localStorage.setItem('userData', JSON.stringify(res.user));
            navigate('/dashboard');
        }
        else {
            alert(res.msg);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('userData')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className='font-manrope'>
            <Navbar />
            <div className="flex flex-col justify-center items-center mt-10 z-10 ">
                <form className="flex flex-col justify-center items-center w-[23rem] rounded-lg p-7 shadow-2xl">
                    <p className='text-center font-bold text-4xl md:text-2xl'>Login</p>
                    <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                        <input
                            type="email"
                            name='email'
                            className="bg-slate-100 p-4 min-w-full rounded-lg"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type="password"
                            name='password'
                            className="bg-slate-100 p-4 min-w-full rounded-lg"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <button
                            className="bg-color3 p-4 min-w-full rounded-lg text-white max-w-max"
                            onClick={handleSubmit}>
                            Login
                        </button>
                    </div>
                    <Link to='/register'>
                        <div className="text-sm mt-4 hover:text-sky-700 text-stone-600" href="">Create a new account?</div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login