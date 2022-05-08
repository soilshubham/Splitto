import React, { useState, useEffect } from 'react'
import './styles.css';
import Navbar from '../Components/Navbar/navbar';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../api';

const Register = () => {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await RegisterUser({ username, email, password });
            console.log(res);
            navigate('/login');
        }
        catch (err) {
            console.log(err);
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
                    <p className='text-center font-bold text-4xl md:text-2xl'>Register</p>
                    <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                        <input type="text" name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-slate-100 p-4 min-w-full rounded-lg"
                            placeholder='Username' />
                        <input type="email" name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-slate-100 p-4 min-w-full rounded-lg"
                            placeholder='Email' />
                        <input type="password" name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-slate-100 p-4 min-w-full rounded-lg"
                            placeholder='Password' />
                        <button
                            className="bg-[#9370DB] p-4 min-w-full rounded-lg text-white max-w-max"
                            onClick={handleSubmit}>
                            Register
                        </button>
                    </div>
                    <Link to='/Register'>
                        <div className="text-sm mt-4 hover:text-sky-700 text-stone-600" >Already have an account?</div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Register