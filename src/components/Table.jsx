import React, { Fragment, useState } from 'react'
import Edit from '../assets/Edit.png'
import Delete from '../assets/Trash.png'

function Table({mydata, setMyData}) {
  // const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState('')

  const token = localStorage.getItem('authToken')

  


  const handleDelete = async(index, item) => {
    console.log('Deleting item:', index, item.name);
    try{
      const response = await fetch(`https://phone-inventory-system-api.onrender.com/phone/${index + 1}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok){
        setMyData(prevData => prevData.filter((_, i) => i !== index));
        setMessage(`${item.name} has been deleted successfully`)

      }else{
        const errorData = await response.json()
        setMessage(`Something went wrong ${errorData.message}`)
      }
    }catch(error){
      console.log('Error: ', error)
      setMessage('An error occured. Please try again')

    }

    console.log(message)
  }


  return (
    <div className="grid grid-cols-8 gap-0 pr-4 pt-4 overflow-hidden overflow-y-auto h-[350px]">
      
      <div style={{ gridColumn: 'span 2' }} className="font-bold mb-[20px] ">Phone Name</div>
      <div style={{ gridColumn: 'span 1' }} className="font-bold mb-[20px] ">Brand</div>
      <div style={{ gridColumn: 'span 1' }} className="font-bold mb-[20px] ">Price</div>
      <div style={{ gridColumn: 'span 1' }} className="font-bold mb-[20px] ">Quantity</div>
      <div style={{ gridColumn: 'span 1' }} className="font-bold mb-[20px] ">Color</div>
      <div style={{ gridColumn: 'span 1' }} className="font-bold mb-[20px] ">Edit</div>
      <div style={{ gridColumn: 'span 1' }} className="font-bold mb-[20px] ">Delete</div>

      {mydata.map((item, index) => {
        return(
            <Fragment key={index}>
                <div style={{ gridColumn: 'span 2' }} className='mb-[16px]'>{item.name}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px]'>{item.brand}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px]'>{item.price}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px]'>{item.quantity}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px]'>{item.color}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px]'>
                    <button className="px-2 py-1 rounded"><img src={Edit} alt='edit icon' /></button>
                </div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px] cursor-pointer' onClick={() => handleDelete(index,item)}>
                    <button className="px-2 py-1 rounded"><img src={Delete} alt="delete icon" /></button>
                </div>
            </Fragment>
        )


      })}


     









    </div>
  )
}

export default Table
