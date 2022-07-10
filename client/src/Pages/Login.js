import React, { useState, useEffect } from 'react'
import './styles.css';
import Navbar from '../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { LoginUser } from '../api';
import { useNavigate } from "react-router-dom";
import { getGroupData } from '../utility/utilFunctions';

const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

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
        else {
            setLoading(false);
        }
    }, [navigate]);

    return (
        <div className='font-manrope'>
            <Navbar />
            {
                !loading ?
                    <div className="flex flex-col justify-center items-center mt-10 z-10">
                        <form className="flex flex-col justify-center items-center w-[23rem] rounded-lg p-7 shadow-2xl bg-white">
                            <p className='text-center font-bold text-4xl md:text-2xl'>Login</p>
                            <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                                <input
                                    type="email"
                                    name='email'
                                    className="bg-slate-50 p-4 min-w-full rounded-lg border-gray-100"
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <input
                                    type="password"
                                    name='password'
                                    className="bg-slate-50 p-4 min-w-full rounded-lg border-gray-100"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <button
                                    className="bg-[#9370DB] p-4 min-w-full rounded-lg text-white max-w-max"
                                    onClick={handleSubmit}>
                                    Login
                                </button>
                            </div>
                            <Link to='/register'>
                                <div className="text-sm mt-4 hover:text-sky-500 text-stone-600" href="">Create a new account?</div>
                            </Link>
                        </form>
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center mt-10 z-10">
                        <div className="flex flex-col justify-center items-center w-[23rem] p-7">
                            <p className='text-center font-bold text-4xl md:text-2xl'>Loading...</p>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Login