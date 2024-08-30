import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '../assets/Windows Phone.png'
import Categorize from '../assets/Categorize.png'
import Home from '../assets/Home.png'
import Notification from '../assets/Notification.png'
import Settings from '../assets/Support.png'
import Logout from '../assets/Logout.png'

function Sidebar() {

  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen flex'>
      <div className=' h-screen w-screen max-w-[200px] flex flex-col items-center shadow-sidebarshadow mr-[30px]'>
        <div className='flex items-center justify-center w-full py-[3rem] border-b-[1px]'><img src={Logo} className='w-[5rem] h-[5rem]' alt="" /></div>
        <div className='flex flex-col w-full justify-between items-center h-full py-[39px] px-5'>
          <div className='w-full pb-[39px] '>
            <div className='sidelinks' onClick={() => navigate('/dashboard')}>
              <img src={Home} alt="" className='mr-5'/>
              <h2>Home</h2>
            </div>
            <div className='sidelinks' onClick={() => navigate('/brands')}>
              <img src={Categorize} alt="" className='mr-5' />
              <h2>Brands</h2>
            </div >
            <div className='sidelinks' onClick={() => navigate('/notification')}>
              <img src={Notification} alt="" className='mr-5' />
              <h2>Notifications</h2>
            </div>
            <div className='sidelinks' onClick={() => navigate('/settings')}>
              <img src={Settings} alt="" className='mr-5' />
              <h2>Settings</h2>
            </div>
          </div>
          <div className='w-full'>
            <div className='sidelinks'>
                <img src={Logout} alt="" className='mr-5' />
                <h2>Logout</h2>
            </div>
          </div>

        </div>

      
    </div>
      <Outlet />
    </div>
  )
}

export default Sidebar
