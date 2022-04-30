import DashHeader from "../Components/DashHeader/DashHeader"

const Dashboard = () => {
    return (
        <div className="bg-[#FAFBFF] min-h-screen container px-32">
            <DashHeader />
            <div className="">
                <div className="font-light text-3xl">Welcome Sahil <span className="text-pink-400">❤</span></div>
                <div className="font-light text-lg mt-16">Group</div>
                <div className="flex flex-row gap-4 mt-4">
                    <div className="bg-[#FCD8D8] w-56 py-8 p-5 rounded-lg">
                        <span className="text-lg font-medium">Class Group</span>
                        <div className="text-sm font-normal">4 Members</div>
                    </div>
                    <div className="bg-[#C9E2F4] w-56 py-8 p-5 rounded-lg">
                        <span className="text-lg font-medium">Class Group</span>
                        <div className="text-sm font-normal">4 Members</div>
                    </div>
                    <div className="bg-[#B7ECB6] w-56 py-8 p-5 rounded-lg">
                        <span className="text-lg font-medium">Class Group</span>
                        <div className="text-sm font-normal">4 Members</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard