import DashHeader from "../Components/DashHeader/DashHeader"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import GroupCard from "../Components/GroupCard/GroupCard"
import { AddGroup, GetUser, JoinGroup } from "../api"
import { getGroupData } from '../utility/utilFunctions'

const Dashboard = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [addModal, setAddModal] = useState(false)
    const [joinModal, setJoinModal] = useState(false)
    const [addGroupName, setAddGroupName] = useState('')
    const [joinGroupID, setJoinGroupID] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem("userData")) {
            getUserData(JSON.parse(localStorage.getItem("userData"))._id)
        }
        else {
            navigate("/login")
        }
    }, [])

    const getUserData = async (id) => {
        const userData = await GetUser(id)
        localStorage.setItem('userData', JSON.stringify(userData))
        setUser(userData)
        setLoading(false)
    }

    const handleAddGroup = async (e) => {
        e.preventDefault()
        const res = await AddGroup({ name: addGroupName, userID: JSON.parse(localStorage.getItem('userData'))._id })
        if (!res.msgError) {
            setAddGroupName('')
            alert('Group created successfully')
            localStorage.setItem('userData', JSON.stringify(res.user))
            setUser(res.user)
            setAddModal(false)
        } else {
            alert(res.msgError)
        }

    }

    const handleJoinGroup = async (e) => {
        e.preventDefault()
        const res = await JoinGroup({ groupID: joinGroupID, userID: JSON.parse(localStorage.getItem('userData'))._id })
        if (!res.msgError) {
            setJoinGroupID('')
            alert('Group joined successfully')
            localStorage.setItem('userData', JSON.stringify(res.user))
            setUser(res.user)
            setJoinModal(false)
        } else {
            alert(res.msgError)
        }

    }

    return (
        <>
            {
                addModal &&
                <div className="fixed w-screen h-screen bg-[#2d234392] z-50">
                    <form className="absolute left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 rounded-lg p-7 shadow-2xl bg-white w-[23rem]">
                        <button className="absolute right-0 top-0 px-4 py-3"
                            onClick={() => setAddModal(false)}
                        >
                            x
                        </button>
                        <p className='text-center font-bold text-2xl md:text-2xl'>Add Group</p>
                        <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                            <input type="text" name='username'
                                value={addGroupName}
                                onChange={(e) => setAddGroupName(e.target.value)}
                                className="bg-slate-50 p-4 min-w-full rounded-lg border-2 border-gray-100 outline-none"
                                placeholder='Group Name' />

                            <button
                                className="bg-primary p-4 min-w-full rounded-lg text-white max-w-max"
                                onClick={handleAddGroup}>
                                Add Group
                            </button>
                        </div>
                    </form>
                </div>
            }
            {
                joinModal &&
                <div className="fixed w-screen h-screen bg-[#2d234392]">
                    <form className="absolute left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 rounded-lg p-7 shadow-2xl bg-white w-[23rem]">
                        <button className="absolute right-0 top-0 px-4 py-3"
                            onClick={() => setJoinModal(false)}
                        >
                            x
                        </button>
                        <p className='text-center font-bold text-2xl md:text-2xl'>Join Group</p>
                        <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                            <input type="text" name='inviteCode'
                                value={joinGroupID}
                                onChange={(e) => setJoinGroupID(e.target.value)}
                                className="bg-slate-50 p-4 min-w-full rounded-lg border-2 border-gray-100 outline-none"
                                placeholder='Invite Code' />

                            <button
                                className="bg-primary p-4 min-w-full rounded-lg text-white max-w-max"
                                onClick={handleJoinGroup}>
                                Join Group
                            </button>
                        </div>
                    </form>
                </div>
            }
            {
                !loading ?
                    <div className="bg-[#FAFBFF] min-h-screen px-4 md:px-32">
                        <DashHeader />
                        <div className="">
                            <div className="font-light text-3xl">Welcome {user.name} <span className="text-[#9370DB]">❤</span></div>
                            <div className="mt-6 flex gap-4">
                                <button
                                    className="hover:scale-105 transition-all bg-gray-900 px-5 py-3 text-white rounded-md text-sm font-medium"
                                    onClick={() => setAddModal(true)}
                                >
                                    + Add Group
                                </button>
                                <button
                                    className="hover:scale-105 transition-all bg-gray-900 px-5 py-3 text-white rounded-md text-sm font-medium"
                                    onClick={() => setJoinModal(true)}
                                >
                                    {'>'} Join Group
                                </button>
                            </div>
                            <div className="font-normal text-lg mt-16">Groups</div>
                            <div className="flex flex-row gap-4 mt-2 flex-wrap">
                                {
                                    user?.groups?.length > 0 && user?.groups?.map(group => {
                                        return (
                                            <GroupCard key={group._id} groupID={group._id} name={group.name} members={group?.users?.length} />
                                        )
                                    })
                                }
                                {
                                    user?.groups?.length === 0 &&
                                    <button
                                        className="cursor-pointer hover:scale-105 transition-all bg-[#fff] border-2 shadow-lg md:min-w-fit min-w-full w-56 py-8 p-5 rounded-lg flex items-center justify-center"
                                        onClick={() => setAddModal(true)}
                                    >
                                        <span className="text-lg font-medium">+ Add Group</span>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    : null
            }

        </>
    )
}

export default Dashboard