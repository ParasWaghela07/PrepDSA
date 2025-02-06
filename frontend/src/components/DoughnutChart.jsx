import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);



export const DoughnutChart = ({easy,medium,hard}) => {
  let dataset=[];
  dataset.push(easy);
  dataset.push(medium);
  dataset.push(hard);
  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: dataset,
        backgroundColor: ["#22c55e", "#f59e0b","#ef4444"], // Colors
        hoverBackgroundColor: ["#16a34a", "#ca8a04","#dc2626"],
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: { legend: { display:false } },
  };
  return (
    <Doughnut data={data} options={options} />
  )
}
