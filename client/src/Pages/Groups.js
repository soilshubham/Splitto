import React from 'react'
import Navbar from '../Components/Navbar/Navbar';

const Groups = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen container px-32">
        <h1 className='font-light text-2xl'>Group Name</h1>
        <button className="tracking-wide bg-color3 py-2 px-5 rounded-lg text-white max-w-max text-base my-8">Add Entry</button>
        <button className="tracking-wide bg-color3 py-2 px-5 rounded-lg text-white max-w-max text-base mx-5">Generate Report</button>
        <h1 className='bg-[#ffffff] container px-2 mx-auto'>hi</h1>
      </div>
    </div>
  )
}

export default Groups