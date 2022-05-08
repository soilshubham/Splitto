import DashHeader from "../Components/DashHeader/DashHeader"
import { useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import GroupCard from "../Components/GroupCard/GroupCard"
import { GetGroup } from "../api"

const Dashboard = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    useEffect(() => {
        if (localStorage.getItem("userData") === null) {
            navigate("/login")
        }
        else {
            const userData = JSON.parse(localStorage.getItem("userData"))
            setUser(userData)
        }
    }, [])
    return (
        <div className="bg-[#FAFBFF] min-h-screen px-4 md:px-32">
            <DashHeader />
            <div className="">
                <div className="font-light text-4xl">Welcome {user.username} <span className="text-[#9370DB]">❤</span></div>
                <div className="mt-6 flex gap-4">
                    <Link to="/add-group">
                        <button className="hover:scale-105 transition-all bg-gray-900 px-5 py-3 text-white rounded-md text-sm font-medium">
                            + Add Group
                        </button>
                    </Link>
                    <Link to="/join-group">
                        <button className="hover:scale-105 transition-all bg-gray-900 px-5 py-3 text-white rounded-md text-sm font-medium">
                            {'>'} Join Group
                        </button>
                    </Link>
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
                        <Link to="/add-group" className="cursor-pointer hover:scale-105 transition-all bg-[#fff] border-2 shadow-lg md:min-w-fit min-w-full w-56 py-8 p-5 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-medium">+ Add Group</span>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard