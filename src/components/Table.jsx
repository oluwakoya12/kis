import React, { Fragment, useState } from 'react'
import Edit from '../assets/Edit.png'
import Delete from '../assets/Trash.png'
import EditModal from './EditModal'


function Table({mydata, refetchData}) {
 
  const [message, setMessage] = useState('')
  const token = localStorage.getItem('authToken')
  const [editModal, setEditModal] = useState(false)
  const [product, setProduct] = useState({})


  const handleEdit = (item) => {
    setEditModal(true)
    setProduct(item)
  }



  


  const handleDelete = async(item) => {
    
    try{
      const response = await fetch(`https://phone-inventory-system-api.onrender.com/phone/${item.id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok){
        setMessage(`Item has been deleted successfully`)
        refetchData();
        

      }else{
        const errorData = await response.json()
        setMessage(`Something went wrong ${errorData.message}`)
      }
    }catch(error){
    
      setMessage('An error occured. Please try again', error)

    }

    
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

      {mydata.map((item) => {
        return(
            <Fragment key={item.id}>
                <div style={{ gridColumn: 'span 2' }} className='mb-[16px]'>{item.name}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px]'>{item.brand}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px]'>{item.price}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px]'>{item.quantity}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px]'>{item.color}</div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px] cursor-pointer' onClick={() => handleEdit(item)}>
                    <button className="px-2 py-1 rounded"><img src={Edit} alt='edit icon' /></button>
                </div>
                <div style={{ gridColumn: 'span 1' }} className='mb-[16px] cursor-pointer' onClick={() => handleDelete(item)}>
                    <button className="px-2 py-1 rounded"><img src={Delete} alt="delete icon" /></button>
                </div>
            </Fragment>
        )


      })}


      <EditModal product={product} editModal={editModal} setEditModal={setEditModal} refetchData={refetchData}/>
 
      


     









    </div>
  )
}

export default Table
