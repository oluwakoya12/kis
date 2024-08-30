import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChartComponent = ({phonevalues}) => {
  
  const chartData = {
    labels: ['Out of Stock', 'Limited Stock', 'In Stock'],
    datasets: [
      {
        data: phonevalues, 
        backgroundColor: [
          'rgba(253, 43, 26, 0.4)',
          'rgba(253, 203, 26, 0.4)',
          'rgba(126, 253, 26, 0.4)'
        ],
        borderColor: [
          'rgba(253, 43, 26, 1)',
          'rgba(253, 203, 26, 1)',
          'rgba(126, 253, 26, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='w-[290px]  py-[17px] px-[16px] shadow-md rounded-md'>
      <h3 className='font-bold'>Analytics</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartComponent;
