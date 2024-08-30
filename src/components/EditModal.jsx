import React, { useEffect, useState } from 'react'
import Close from '../assets/bx-x.png'



function EditModal({product, editModal, setEditModal, refetchData}) {

    
    const [name, setName] = useState(product.name)
    const [brand, setBrand] = useState(product.brand)
    const [color, setColor] = useState(product.color)
    const [price, setPrice] = useState(product.price)
    const [quantity, setQuantity] = useState(product.quantity)
    const [description, setDescription] = useState(product.description)
    const [loading, setLoading] = useState('hidden')

    useEffect(() => {
      if (product) {
        setName(product.name);
        setBrand(product.brand);
        setColor(product.color);
        setPrice(product.price);
        setQuantity(product.quantity);
        setDescription(product.description);
      }
    }, [product]);

    const handleEditToApi = async(e) => {
      e.preventDefault()
      setLoading('ml-[3px] w-6 h-6 border-4 border-t-4 border-white border-t-transparent border-solid rounded-full animate-spin')

      try{
        const response = await fetch(`https://phone-inventory-system-api.onrender.com/phone/${product.id}`, {
          method: 'PUT',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            brand: brand,
            color: color,
            price: price,
            quantity: quantity,
            description: description

          })
        })
        if (response.ok){
          setLoading(false)
          setEditModal(false)
          refetchData()
        }else{
          const errorData = await response.json()
          console.log(`Something went wrong ${errorData.message}`)
        }
      }catch(error){
        console.log('Error: ', error)
      }




    }

    




  return (
    <div>
      {editModal && 
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='bg-white p-5 rounded w-[30rem]'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold mb-[3.21px]'>Update</h2>
              <img src={Close} alt="close button" onClick={() => setEditModal(false)} />
            </div>
            <p className='text-base font-thin mb-[14px]'>Update your item</p>



            <form onSubmit={handleEditToApi} >
                <div className='relative border border-black w-full h-[40px] mt-[50px] py-[6px] px-[4px]'>
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

              <div className='relative border border-black w-full h-[40px] mt-[10px] py-[6px] px-[4px]'>
                <input
                  type="text"
                  name='brand'
                  placeholder="Brand"
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                  required
                  className='w-full h-full outline-none'
                />
              </div>

              <div className='relative border border-black w-full h-[40px] mt-[10px] py-[6px] px-[4px]'>
                <input
                  type="text"
                  name='color'
                  placeholder="Color"
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                  required
                  className='w-full h-full outline-none'
                />
              </div>

              <div className='relative border border-black w-full h-[40px] mt-[10px] py-[6px] px-[4px]'>
                <input
                  type="text"
                  name='price'
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                  className='w-full h-full outline-none'
                />
              </div>

              <div className='relative border border-black w-full h-[40px] mt-[10px] py-[6px] px-[4px]'>
                <input
                  type="text"
                  name='quantity'
                  placeholder="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  required
                  className='w-full h-full outline-none'
                />
              </div>


              <div className='relative border border-black w-full h-[100px] mt-[10px] py-[6px] px-[4px]'><textarea name="description" className='outline-0 border-0 w-full bg-transparent' cols={52} rows={4} onChange={e => setDescription(e.target.value)} value={description}></textarea></div>


              
            <button
            type="submit"
            className='w-full flex justify-center items-center h-[40px] mt-[20px] bg-[#3869EB] text-white'
          >
            Save <div className={loading}></div>
          </button>
            </form>
          </div>


        </div>}
    </div>
  )
}

export default EditModal
