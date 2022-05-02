import DashHeader from "../Components/DashHeader/DashHeader"

const Dashboard = () => {
    return (
        <div className="bg-[#FAFBFF] min-h-screen px-4 md:px-32">
            <DashHeader />
            <div className="">
                <div className="font-light text-3xl">Welcome Sahil <span className="text-pink-400">❤</span></div>
                <div className="font-light text-lg mt-16">Group</div>
                <div className="flex flex-row gap-4 mt-4 flex-wrap">
                    <div className="bg-[#FCD8D8] shadow-lg md:min-w-fit min-w-full w-56 py-8 p-5 rounded-lg">
                        <span className="text-lg font-medium">Class Group</span>
                        <div className="text-sm font-normal">4 Members</div>
                    </div>
                    <div className="bg-[#C9E2F4] shadow-lg md:min-w-fit min-w-full w-56 py-8 p-5 rounded-lg">
                        <span className="text-lg font-medium">Class Group</span>
                        <div className="text-sm font-normal">4 Members</div>
                    </div>
                    <div className="bg-[#B7ECB6] shadow-lg md:min-w-fit min-w-full w-56 py-8 p-5 rounded-lg">
                        <span className="text-lg font-medium">Class Group</span>
                        <div className="text-sm font-normal">4 Members</div>
                    </div>
                    <div className="bg-[#fff] border-2 shadow-lg md:min-w-fit min-w-full w-56 py-8 p-5 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-medium">+ Add Group</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard