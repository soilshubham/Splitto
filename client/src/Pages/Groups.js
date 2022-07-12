import React, { useEffect, useState } from 'react'
import DashHeader from '../Components/DashHeader/DashHeader';
import { useParams, Link } from 'react-router-dom';
import { GetGroup, AddEntry } from '../api';

const Groups = () => {

  let { id: groupIDParam } = useParams();

  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(true);
  const [entryName, setEntryName] = useState('');
  const [entryAmount, setEntryAmount] = useState(0);
  const [entryPayer, setEntryPayer] = useState('');
  const [entryPaidFor, setEntryPaidFor] = useState([]);

  const [entryModal, setEntryModal] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [paidForModal, setPaidForModal] = useState(false);
  const [copyClip, setCopyClip] = useState(false);

  const fetchGroupData = async (gID) => {
    const group = await GetGroup(gID);
    console.log(group);
    setGroup(group);
    setEntryPayer(group.users[0]._id);
    setLoading(false);
  }

  const handleAddEntry = async (e) => {
    e.preventDefault();
    try {
      const res = await AddEntry({
        groupID: groupIDParam,
        name: entryName,
        amount: entryAmount,
        payer: entryPayer,
        paidFor: entryPaidFor,
      });
      setEntryName('');
      setEntryAmount(0);
      setEntryPayer('');
      setEntryPaidFor([]);
      setEntryModal(false);
      fetchGroupData(groupIDParam);
    }
    catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    fetchGroupData(groupIDParam);
  }, [])

  if (!loading) {
    return (
      <>
        {
          paidForModal &&
          <div className="fixed bg-[#2d234392] z-20 w-screen h-screen">
            <form className="absolute left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 rounded-lg p-7 shadow-2xl bg-white w-[23rem]">
              <div className="absolute top-4 right-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPaidForModal(false)
                  }}
                  className='text-xl p-1 hover:scale-110 transition-all'
                >
                  x
                </button>
              </div>
              <p className='text-center font-bold text-4xl md:text-2xl'>Paid For</p>
              <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                {group.users.map(user => {
                  return (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{user.name}</span>
                      <input
                        type="checkbox"
                        name={user.name}
                        value={user._id}
                        checked={entryPaidFor.includes(user._id)}
                        className="w-4 h-4"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEntryPaidFor([...entryPaidFor, user._id])
                          }
                          else {
                            setEntryPaidFor(entryPaidFor.filter(id => id !== user._id))
                          }
                          console.log(entryPaidFor)

                        }}
                      />
                    </div>
                  )
                })}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPaidForModal(false)
                  }
                  }
                  className='bg-[#9370DB] px-12 py-3 mt-4 ml-auto rounded-lg text-white w-fit '>
                  Save
                </button>
              </div>
            </form>
          </div>
        }
        {
          isInviteModalOpen &&
          <div className="fixed bg-[#2d234392] z-10 w-screen h-screen">
            <form className="absolute left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 rounded-lg p-7 shadow-2xl bg-white w-[23rem]">
              <div className="absolute top-4 right-6">
                <button
                  onClick={() => {
                    setIsInviteModalOpen(false)
                    setCopyClip(false)
                  }}
                  className='text-xl p-1 hover:scale-110 transition-all'
                >
                  x
                </button>
              </div>
              <p className='text-center font-bold text-4xl md:text-2xl'>Invite Code</p>
              <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(groupIDParam);
                    setCopyClip(true);
                  }}
                  className="text-center bg-gray-200 transition-all cursor-pointer hover:scale-105 p-4 truncate rounded-xl text-lg">
                  {groupIDParam}
                </div>
                <div className={`text-center font-normal text-sm ${copyClip ? "text-green-600" : "text-gray-500"}`}>
                  {copyClip ? "Copied To Clipboard!" : "Click to copy"}
                </div>
              </div>
            </form>
          </div>
        }
        {
          // Update this later !!!!!!!!!!!!!
          isReportModalOpen &&
          <div className="fixed bg-[#2d234392] z-10 w-screen h-screen">
            <form className="absolute left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 rounded-lg p-7 shadow-2xl bg-white w-[23rem]">
              <div className="absolute top-4 right-6">
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className='text-xl p-1 hover:scale-110 transition-all'
                >
                  x
                </button>
              </div>
              <p className='text-center font-bold text-4xl md:text-2xl'>Report</p>
              <div className="flex flex-col max-w-2xl w-full mt-10 gap-5 items-center">
                Coming Soon!
              </div>
            </form>
          </div>
        }
        {
          entryModal &&
          <div className="fixed bg-[#2d234392] z-10 w-screen h-screen">
            <form className="absolute left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2 rounded-lg p-7 shadow-2xl bg-white w-[23rem]">
              <div className="absolute top-4 right-6">
                <button
                  onClick={() => setEntryModal(false)}
                  className='text-xl p-1 hover:scale-110 transition-all'
                >
                  x
                </button>
              </div>
              <p className='text-center font-bold text-4xl md:text-2xl'>Entries</p>
              <div className="flex flex-col max-w-2xl w-full mt-10 gap-5">
                <input
                  type="text"
                  name='Entry Name'
                  className="bg-slate-50 p-4 min-w-full rounded-lg border-2 border-gray-100 outline-none"
                  placeholder='Entry Title'
                  value={entryName}
                  onChange={(e) => setEntryName(e.target.value)}
                />
                <input
                  type="number"
                  name='Amount'
                  className="bg-slate-50 p-4 min-w-full rounded-lg border-2 border-gray-100 outline-none"
                  placeholder='Amount'
                  value={entryAmount}
                  onChange={(e) => setEntryAmount(e.target.value)}
                />
                <div className="flex justify-between items-center bg-slate-50 p-4 min-w-full rounded-lg border-2 border-gray-100">
                  <span>Payer:</span>
                  <select
                    name="payer"
                    id="payer"
                    className='bg-transparent outline-none w-auto font-bold text-primary'
                    value={entryPayer}
                    onChange={(e) => setEntryPayer(e.target.value)}
                  >
                    {
                      group.users.map((user, index) => {
                        return (
                          <option key={index} value={user._id}>{user.name}</option>
                        )
                      })
                    }
                  </select>

                </div>
                <div className="flex justify-between items-center bg-slate-50 p-4 min-w-full rounded-lg border-2 border-gray-100">
                  <span>Paid For:</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPaidForModal(true)
                    }}
                    className="text-primary font-bold"
                  >
                    {entryPaidFor.length} {entryPaidFor.length > 1 ? "Members" : "Member"}
                  </button>
                </div>
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
          <div className="bg-white p-8 pb-10 rounded-lg border-2 border-[#f3f3f3]">
            <h1 className='font-bold text-4xl capitalize text-primary'>{group.name}</h1>
            <h5 className='font-light text-md mt-2'>{group.users.length} {group.users.length > 1 ? "Members" : "Member"}</h5>
          </div>
          <div className="mt-6 flex gap-4 flex-wrap">
            <button onClick={() => setEntryModal(true)} className="hover:scale-105 transition-all bg-gray-900 px-5 py-3 text-white rounded-md text-sm font-medium">
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
                    <div key={key} className='border-2 bg-[#ffffff72] flex justify-between py-4 px-8 rounded-lg shadow-lg shadow-[#a1a9bd3a]'>
                      <div className="left">
                        <div className="font-bold text-xl ">{entry.name}</div>
                        <div className="font-base text-base text-[#00000080]">{entry.payer.name}</div>
                      </div>
                      <div className="right flex flex-col items-end">
                        <div className="font-base text-2xl">Rs. {entry.amount}</div>
                        <div className="font-semibold text-base text-primary ">+{entry.paidFor.length} {entry.paidFor.length > 1 ? " members" : " member"}</div>
                      </div>
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