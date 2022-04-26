import Sidebar from "../Components/Sidebar/sidebar"

const Dashboard = () => {
    return (
        <div className="bg-[#FAFBFF] min-h-screen">
            <div className="grid grid-cols-4 gap-4 h-screen p-5">
                <div className="h-full">
                    <Sidebar />
                </div>
                <div className="col-span-3">01</div>
            </div>
        </div>
    )
}

export default Dashboard