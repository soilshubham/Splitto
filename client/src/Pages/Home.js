import React from 'react'
import './styles.css';
import Navbar from '../Components/Navbar/navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className='conatiner'>
                <h1 className='homeData1'>Group expenses made<br></br> easy and organised </h1>
                <h1 className='homeData2'> Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</h1>
                <button className="signUpButton"> Sign Up </button>        
            </div>
        </div>
    )
}

export default Home