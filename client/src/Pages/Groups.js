import React, { useEffect, useState } from 'react'
import DashHeader from '../Components/DashHeader/DashHeader';
import { useParams, Link } from 'react-router-dom';
import { GetGroup, AddEntry } from '../api';

const Groups = () => {

  let { id } = useParams();

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(true);
  const [entryName, setEntryName] = useState('');
  const [entryAmount, setEntryAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [copyClip, setCopyClip] = useState(false);

  const fetchGroupData = async (gID) => {
    const group = await GetGroup(gID);
    setGroup(group);
    setLoading(false);
  }

  const handleAddEntry = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        name: entryName,
        amount: entryAmount,
        paidBy: JSON.parse(localStorage.getItem('userData')).username,
        payerID: JSON.parse(localStorage.getItem('userData'))._id,
      }
      const res = await AddEntry({
        groupID: id,
        userID: JSON.parse(localStorage.getItem('userData'))._id,
        name: newEntry?.name,
        amount: newEntry?.amount,
        paidBy: newEntry?.paidBy,
        payerID: newEntry?.payerID
      });
      setEntryName('');
      setEntryAmount(0);
      setIsModalOpen(false);
      fetchGroupData(id);

    }
    catch (err) {
      console.log(err);
    }
  }

  const getUserReportData = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userReportData = group.entries.filter(entry => entry.payerID === userData._id);
    return userReportData;
  }

  const getOweAmount = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    let oweAmount = 0;

    for (let i = 0; i < group.entries.length; i++) {
      if (group.entries[i].payerID === userData._id) {
        oweAmount -= parseInt(group.entries[i].amount) / group.users.length;
        console.log(oweAmount);
      }
      else {
        oweAmount += parseInt(group.entries[i].amount) / group.users.length;
        console.log(oweAmount);
      }
    }

    return oweAmount;
  }

  const getOwedAmount = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userReportData = group.entries.filter(entry => entry.payerID === userData._id);
    let oweAmount = 0;

    for (let i = 0; i < group.entries.length; i++) {
      if (group.entries[i].payerID === userData._id) {
        oweAmount += parseInt(group.entries[i].amount) / group.users.length;
      }
      else {
        oweAmount -= parseInt(group.entries[i].amount) / group.users.length;
      }
    }

    return oweAmount;
  }

  useEffect(() => {
    fetchGroupData(id);
  }, [])

  if (!loading) {
    return (
      <>
        {
          isInviteModalOpen &&
          <div className="fixed instance-0 bg-[#191d2ec4] z-10 flex items-center justify-center w-screen h-screen">
            <form className="bg-white flex flex-col justify-center items-center w-[30rem] rounded-lg p-7 shadow-2xl relative">
              <div className="absolute top-4 right-6"><button onClick={() => {
                setIsInviteModalOpen(false)
                setCopyClip(false)
              }} className='text-xl p-1 hover:scale-110 transition-all'>x</button></div>
              <p className='text-center font-bold text-4xl md:text-2xl'>Invite Code</p>
              <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(id);
                    setCopyClip(true);
                  }}
                  className="text-center bg-gray-200 transition-all cursor-pointer hover:scale-105 p-4 truncate rounded-xl text-lg">
                  {id}
                </div>
                <div className={`text-center font-semibold ${copyClip ? "text-green-600" : "text-white"}`}>
                  Copied to clipboard!
                </div>
                {/* <button
                  className="bg-[#9370DB] p-4 min-w-full rounded-lg text-white max-w-max"
                  onClick={handleAddEntry}
                >
                  Add Entry
                </button> */}
              </div>
            </form>
          </div>
        }
        {
          isReportModalOpen &&
          <div className="fixed instance-0 bg-[#191d2ec4] z-10 flex items-center justify-center w-screen h-screen">
            <form className="bg-white flex flex-col justify-center items-center w-[23rem] rounded-lg p-7 shadow-2xl relative">
              <div className="absolute top-4 right-6"><button onClick={() => setIsReportModalOpen(false)} className='text-xl p-1 hover:scale-110 transition-all'>x</button></div>
              <p className='text-center font-bold text-4xl md:text-2xl'>Report</p>
              <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                <div className="flex justify-between items-center">
                  <span>Overall Spent:</span>
                  <span className='text-lg font-medium'>
                    ${group.entries.reduce((acc, curr) => parseInt(acc) + parseInt(curr.amount), 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>You Spent:</span>
                  <span className='text-lg font-medium'>Rs. {getUserReportData().reduce((acc, curr) => parseInt(acc) + parseInt(curr.amount), 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>You Owe:</span>
                  <span className='text-lg font-medium'>Rs. {getOweAmount() >= 0 ? getOweAmount().toFixed(2) : 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>You are Owed:</span>
                  <span className='text-lg font-medium'>Rs. {getOwedAmount() >= 0 ? getOwedAmount().toFixed(2) : 0}</span >
                </div>

              </div>
            </form>
          </div>
        }
        {
          isModalOpen &&
          <div className="fixed instance-0 bg-[#191d2ec4] z-10 flex items-center justify-center w-screen h-screen">
            <form className="bg-white flex flex-col justify-center items-center w-[23rem] rounded-lg p-7 shadow-2xl relative">
              <div className="absolute top-4 right-6"><button onClick={() => setIsModalOpen(false)} className='text-xl p-1 hover:scale-110 transition-all'>x</button></div>
              <p className='text-center font-bold text-4xl md:text-2xl'>Entries</p>
              <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                <input
                  type="text"
                  name='Entry Name'
                  className="bg-slate-100 p-4 min-w-full rounded-lg"
                  placeholder='Entry Title'
                  value={entryName}
                  onChange={(e) => setEntryName(e.target.value)}
                />
                <input
                  type="number"
                  name='Amount'
                  className="bg-slate-100 p-4 min-w-full rounded-lg"
                  placeholder='Amount'
                  value={entryAmount}
                  onChange={(e) => setEntryAmount(e.target.value)}
                />
                <button
                  className="bg-[#9370DB] p-4 min-w-full rounded-lg text-white max-w-max"
                  onClick={handleAddEntry}
                >
                  Add Entry
                </button>
              </div>
            </form>
          </div>
        }

        <div className="bg-[#FAFBFF] min-h-screen px-4 md:px-32">
          <DashHeader />
          <h1 className='font-light text-4xl capitalize'>{group.name}</h1>
          <div className="mt-6 flex gap-4 flex-wrap">
            <button onClick={() => setIsModalOpen(true)} className="hover:scale-105 transition-all bg-gray-900 px-5 py-3 text-white rounded-md text-sm font-medium">
              + Add Entries
            </button>
            <button onClick={() => setIsInviteModalOpen(true)} className="hover:scale-105 transition-all bg-gray-900 px-5 py-3 text-white rounded-md text-sm font-medium">
              {'>'} Invite Friends
            </button>
            <button onClick={() => setIsReportModalOpen(true)} className="hover:scale-105 transition-all bg-[#9370DB] px-5 py-3 text-white rounded-md text-sm font-medium">
              {'$'} Generate Report
            </button>
          </div>
          <div className="">
            <div className="font-normal text-lg mt-16">Entries</div>
            <div className="flex flex-col gap-4 mt-2 flex-wrap">
              {
                group?.entries?.length > 0 && group?.entries?.map((entry, key) => {
                  return (
                    <div key={key} className='grid grid-cols-3 bg-white shadow-lg py-4 px-5 rounded-lg border-l-[10px] border-[#c1a2ff]'>
                      <div className="font-semibold text-base truncate">{entry.name}</div>
                      <div className="font-base text-base truncate">Rs. {entry.amount}</div>
                      <div className="font-base text-base truncate"> ~ {entry.paidBy}</div>
                    </div>
                  )
                })
              }
              {
                group?.entries?.length === 0 &&
                <div className="font-base text-base max-w-[10rem] truncate text-gray-400">No Entries</div>
              }
            </div>
          </div>
        </div >
      </>
    )
  }
  else {
    return (
      <div className="text-center bg-[#FAFBFF] min-h-screen pt-10">Loading...</div>
    )
  }
}

export default Groups