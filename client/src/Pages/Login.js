import React from 'react'
import './styles.css';
import Navbar from '../Components/Navbar/navbar';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='font-manrope'>
            <Navbar />
            <div className="flex flex-col justify-center items-center mt-10 z-10 ">
                <form className="flex flex-col justify-center items-center w-[23rem] rounded-lg p-7 shadow-2xl">
                    <p className='text-center font-bold text-4xl md:text-2xl'>Login</p>
                    <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                        <input type="email" name='email' className="bg-slate-100 p-4 min-w-full rounded-lg" placeholder='Email' />
                        <input type="password" name='password' className="bg-slate-100 p-4 min-w-full rounded-lg" placeholder='Password' />
                        <button className="bg-color3 p-4 min-w-full rounded-lg text-white max-w-max">Login</button>
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