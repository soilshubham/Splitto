import React, { useState } from 'react'
import DashHeader from '../Components/DashHeader/DashHeader'
import { Link, useNavigate } from 'react-router-dom'
import { AddGroup, GetUser } from '../api'
import { getGroupData } from '../utility/utilFunctions'
const Groups = () => {

  const navigate = useNavigate()
  const [gName, setGName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await AddGroup({ name: gName, userID: JSON.parse(localStorage.getItem('userData'))._id })
    if (!res.msgError) {
      setGName('')
      alert('Group created successfully')
      const userData = await GetUser(JSON.parse(localStorage.getItem('userData'))._id)
      let updatedGroupArray = await getGroupData(userData.groups)
      userData.groups = updatedGroupArray
      localStorage.setItem('userData', JSON.stringify(userData))
      navigate('/dashboard')
    } else {
      alert(res.msgError)
    }

  }

  return (
    <div className="bg-[#FAFBFF] min-h-screen px-4 md:px-32">
      <DashHeader />
      <div className="flex flex-col justify-center items-center mt-10 z-10 ">
        <form className="flex flex-col justify-center items-center w-[23rem] rounded-lg p-7 shadow-2xl">
          <p className='text-center font-bold text-4xl md:text-2xl'>Add Group</p>
          <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
            <input type="text" name='username'
              value={gName}
              onChange={(e) => setGName(e.target.value)}
              className="bg-slate-100 p-4 min-w-full rounded-lg"
              placeholder='Group Name' />

            <button
              className="bg-color3 p-4 min-w-full rounded-lg text-white max-w-max"
              onClick={handleSubmit}>
              Add Group
            </button>
          </div>
          <Link to='/Register'>
            <div className="text-sm mt-4 hover:text-sky-700 text-stone-600" >
              <Link to='/join-group'>
                Join a Group
              </Link>
            </div>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Groups