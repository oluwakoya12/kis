import React, { useCallback, useEffect, useState } from 'react'
import Search from '../assets/Search.png'
import Profile from '../assets/Ellipse 1.png'
import Summary from './Summary'
import PieChartComponent from './PieChartComponent'
import Spinner from './Spinner'
import Table from './Table'
import Add from '../assets/add.png'
import Create from './Create'




function Dashboard() {

  const [phones, setPhones] = useState([])
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('authToken')
  const [phonevalues, setPhoneValues] = useState()
  const [createModal, setCreateModal] = useState(false)
  
 

  const handleSetPhoneValues = useCallback((values) => {
    setPhoneValues(values);
  }, []);
  

  const fetchPhones = async() => {
    setLoading(true)
    try{
      const response = await fetch('https://phone-inventory-system-api.onrender.com/phone/', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if(response.ok){
        const data = await response.json()
        setPhones(data)
      }else {
        const errorData = await response.json();
        alert('Something went wrong', errorData)
      }
      
    }catch(error){
      console.log('Error: ', error)
    } finally {
      setLoading(false)
    }

  }
  
  useEffect(() => {
    fetchPhones()
  }, [])

  if (loading){
    return (
      <Spinner />
    )
  }


  return (
    <div className='h-screen w-full px-[24px]'>
        <div className='flex w-full items-center justify-between  py-[32px] '>
            <h2 className='font-bold text-[24px] text-[#222222CC]'>Dashboard</h2>
            <div className='flex items-center bg-[#2C2C2C08] h-[40px] w-[300px] rounded-md'>
              <input type="text" className='bg-transparent outline-0 border-0 px-5' />
              <img src={Search} alt="search icon" className='mr-[18px]' />
            </div>
            <div className='flex items-center'>
              <img src={Profile} alt="profile icon"className='mr-4'  />
              <h3>Mrs Faye Richardson</h3>
            </div>
        </div>
        

        <div className='flex items-start justify-between '>
          <div className=' w-[950px] h-[calc(100vh - 319px)]'>
              <Summary summaryData={phones} setPhoneValues={handleSetPhoneValues} />

              <h3 className='font-bold text-[20px] mt-[50px] text-[#222222CC]'>All phones</h3>

              <Table mydata={phones} refetchData={fetchPhones} />


          </div>

          <div>
            <div className='flex justify-end p-1 mb-5 cursor-pointer' onClick={() => setCreateModal(true)}><span className='bg-[#3869EB] text-white px-5 py-1 flex items-center justify-between rounded'><img src={Add} alt="add icon" width={20} className='mr-2' />Create Item</span></div>
            <PieChartComponent phonevalues={phonevalues}/>
          </div>

          <Create createModal={createModal} setCreateModal={setCreateModal} fetchPhones={fetchPhones} />
        </div>


        

        




      
    </div>
  )
}

export default Dashboard
