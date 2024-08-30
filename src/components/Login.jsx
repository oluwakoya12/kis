import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({setLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState('hidden')
  

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading('ml-[3px] w-6 h-6 border-4 border-t-4 border-white border-t-transparent border-solid rounded-full animate-spin')

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('https://phone-inventory-system-api.onrender.com/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: '',
          username: email,
          password: password,
          scope: '',
          client_id: '',
          client_secret: ''
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Login successful!');
        console.log('Response:', data);
        localStorage.setItem('authToken', data.access_token);
        navigate('/dashboard')
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setErrorMessage('');
      setLogin(true)
    }
  };

  return (
    <div className='flex justify-center items-center mx-auto w-screen h-screen'>
      <div className='px-[40px] mx-auto '>
        <h3 className='text-4xl font-bold mb-[6.21px]'>Login</h3>
        <h6 className='text-base font-thin mb-[14px]'>Login to access your inventory account</h6>

        <form onSubmit={handleLogin}>
          <div className='relative border border-black w-[500px] h-[40px] mt-[50px] py-[6px] px-[4px]'>
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
            className='w-[500px] flex justify-center items-center h-[40px] mt-[20px] bg-[#3869EB] text-white'
          >
            Login<div className={loading}></div>
          </button>
          
        </form>

        <h3 className='mt-[20px]'>Don't have an account? <span className=' cursor-pointer text-red-500' onClick={() => navigate('/signup')}>Sign Up</span></h3>
      </div>
    </div>
  );
}

export default Login;
