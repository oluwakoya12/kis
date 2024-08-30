import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({setLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState('hidden')
  
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading('ml-[3px] w-6 h-6 border-4 border-t-4 border-white border-t-transparent border-solid rounded-full animate-spin')

    if (!email || !password || !name) {
        setErrorMessage('Please fill the form');
        return;
    }

    try{
        const response = await fetch('https://phone-inventory-system-api.onrender.com/user/', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        if (response.ok){
            const data = await response.json()
            console.log('Response:', data);
            setSuccessMessage("Signup successfully")
            navigate('/login')
        }else{
            const errorData = await response.json()
            setErrorMessage(errorData.message || "Signup Failed")
        }
    } catch(error){
        console.log('Error: ', error)
        setErrorMessage('An error occured. Please try again')
    } finally {
        setErrorMessage('')
    }

  }

  

  return (
    <div className='flex justify-center items-center mx-auto w-screen h-screen'>
      <div className='px-[40px] mx-auto '>
        <h3 className='text-4xl font-bold mb-[6.21px]'>Sign Up</h3>
        <h6 className='text-base font-thin mb-[14px]'>Welcome to KIS</h6>

        <form onSubmit={handleSignup}>
            <div className='relative border border-black w-[500px] h-[40px] mt-[50px] py-[6px] px-[4px]'>
                <input
                type="text"
                name='name'
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className='w-full h-full outline-none'
                />
            </div>




          <div className='relative border border-black w-[500px] h-[40px] mt-[20px] py-[6px] px-[4px]'>
            <input
              type="text"
              name='email'
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className='w-full h-full outline-none'
            />
          </div>

          <div className='relative border border-black w-[500px] h-[40px] mt-[20px] py-[6px] px-[4px]'>
            <input
              type="password"
              name='password'
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className='w-full h-full outline-none'
            />
          </div>

          {errorMessage && <p className="text-red-500 mt-[10px]">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mt-[10px]">{successMessage}</p>}

          <button
            type="submit"
            className='w-[500px]  flex justify-center items-center h-[40px] mt-[20px] bg-[#3869EB] text-white'
          >
            Signup<div className={loading}></div>
          </button>
          

        </form>

        <h3 className='mt-[20px]'>Already have an account? <span className='text-red-500' onClick={() => navigate('/login')}>Login</span></h3>
      </div>
    </div>
  );
}

export default Login;
