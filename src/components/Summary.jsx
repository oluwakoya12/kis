import React, { useEffect, useState } from 'react'
import AllPhone from '../assets/Frame 8.png'
import OutOfStock from '../assets/Frame 8 (1).png'
import LimitedStock from '../assets/Frame 8 (2).png'
import InStock from '../assets/Frame 8 (3).png'
import Vertical_Menu from '../assets/Menu Vertical.png'

function Summary({summaryData, setPhoneValues}) {

    const [outOfStockPhones, setOutOfStockPhones] = useState(0)
    const [limitedPhones , setLimitedPhones] = useState(0)
    const [InStockPhones, setInStockPhones] = useState(0) 

    useEffect(() => {
        let outOfStock = 0;
        let limitedStock = 0;
        let inStock = 0;
    
        summaryData.forEach((item) => {
          if (item.quantity === 0) {
            outOfStock += 1;
          } else if (item.quantity < 10) {
            limitedStock += 1;
          } else {
            inStock += 1;
          }
        });
    
        setOutOfStockPhones(outOfStock);
        setLimitedPhones(limitedStock);
        setInStockPhones(inStock);

        
        
        setPhoneValues([outOfStockPhones, limitedPhones, InStockPhones])
      }, [summaryData, setPhoneValues]);

      useEffect(() => {
        setPhoneValues([outOfStockPhones, limitedPhones, InStockPhones]);
    }, [outOfStockPhones, limitedPhones, InStockPhones, setPhoneValues]);

 


  return (
    <div className='flex items-center justify-between'>
        <div className='w-[200px] h-[151px] rounded-[10px] py-[17px] px-[16px] shadow-md mr-[16px]'>
            <div className='flex w-full items-center justify-between px-3 mb-[12px] '>
                <img src={AllPhone} alt="all ohone icon" />
                <img src={Vertical_Menu} alt="vertical menu" />
            </div>
            <div className='mb-[12px]'>All Phones</div>
            <div className='bg-[#1872C6] w-full h-[6px] mb-[12px] rounded-lg'></div>
            <div>{summaryData.length} products</div>
        </div>

        <div className='w-[200px] h-[151px] rounded-[10px] py-[17px] px-[16px] shadow-md mr-[16px]'>
            <div className='flex w-full items-center justify-between px-3 mb-[12px] '>
                <img src={OutOfStock} alt="all ohone icon" />
                <img src={Vertical_Menu} alt="vertical menu" />
            </div>
            <div className='mb-[12px]'>Out of Stock</div>
            <div className='bg-[#FD2B1A29] w-full h-[6px] mb-[12px] rounded-lg relative'>
                <div className='bg-[#FD2B1A] h-[6px] absolute top-0 left-0 rounded-lg' style={{ width: `${(outOfStockPhones / summaryData.length) * 100}%` }}></div>
            </div>
            <div >{outOfStockPhones} Products</div>
        </div>

        <div className='w-[200px] h-[151px] rounded-[10px] py-[17px] px-[16px] shadow-md mr-[16px]'>
            <div className='flex w-full items-center justify-between px-3 mb-[12px] '>
                <img src={LimitedStock} alt="all ohone icon" />
                <img src={Vertical_Menu} alt="vertical menu" />
            </div>
            <div className='mb-[12px]'>Limited Stock</div>
            <div className='bg-[#FDCB1A29] w-full h-[6px] mb-[12px] rounded-lg relative'>
                <div className='bg-[#FDCB1A]  h-[6px] absolute top-0 left-0 rounded-lg' style={{ width: `${(limitedPhones / summaryData.length) * 100}%` }}></div>
            </div>
            <div >{limitedPhones} Products</div>
        </div>

        <div className='w-[200px] h-[151px] rounded-[10px] py-[17px] px-[16px] shadow-md'>
            <div className='flex w-full items-center justify-between px-3 mb-[12px] '>
                <img src={InStock} alt="all ohone icon" />
                <img src={Vertical_Menu} alt="vertical menu" />
            </div>
            <div className='mb-[12px]'>In Stock</div>
            <div className='bg-[#7EFD1A29] w-full h-[6px] mb-[12px] rounded-lg relative '>
                <div className='bg-[#7EFD1A]  h-[6px] absolute top-0 left-0 rounded-lg' style={{ width: `${(InStockPhones / summaryData.length) * 100}%` }}></div>

            </div>
            <div >{InStockPhones} Products</div>
        </div>
      
    </div>
  )
}

export default Summary
