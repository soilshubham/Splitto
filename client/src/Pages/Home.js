import React from 'react'
import './styles.css';
import Navbar from '../Components/Navbar/navbar';
import BGBokeh from '../images/BackgroundBokeh.svg';
const Home = () => {
    return (
        <div className='relative font-manrope'>
            <img src={BGBokeh} alt="" className='absolute w-[200%] mt-32 md:mt-0 -z-10' />
            <Navbar />
            <div className=" flex flex-col justify-center items-center mt-10 z-10">
                <p className='text-center font-extrabold text-4xl md:text-[3.5rem] max-w-2xl leading-tight'>Group expenses made easy and organised</p>
                <h1 className='text-center mt-16 text-base md:text-lg tracking-wide'>Keep track of your shared expenses and balances with housemates, <br />trips, groups, friends, and family.</h1>
                <button className="bg-color3 py-4 px-10 rounded-lg text-white max-w-max mt-10">Get Started</button>
            </div>
        </div>
    )
}

export default Home  