import React from 'react'
import NoImage from '../assets/Screenshot_2024-08-30_144922-removebg-preview.png'
import { Navigate, useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className=''>
                
            <img src={NoImage} alt="not found image" />
            <h2 className='text-2xl font-semibold'>Oops! Page Not Found</h2>
            <h5 className='text-base font-light'>We couldn't find what you were looking for</h5>

            <button className='w-[400px] flex justify-center items-center h-[40px] mt-[20px] bg-[#3869EB] text-white rounded' onClick={() => navigate('/')}>Go to Login</button>

        </div>

      
    </div>
  )
}

export default NotFound
