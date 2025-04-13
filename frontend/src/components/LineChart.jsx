import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ scores }) => {
  const data = {
    labels: scores?.map((_, i) => `Quiz ${i + 1}`),
    datasets: [
      {
        label: 'Quiz Score',
        data: scores,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: 'Score',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
