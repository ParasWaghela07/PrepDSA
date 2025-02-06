import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = ({topicToQst}) =>{
    
    const data = {
        labels: Object.keys(topicToQst), // Topic names as labels
        datasets: [
          {
            label: "Questions Solved",
            data: Object.values(topicToQst), // Number of questions solved per topic
            backgroundColor: "#4ade80", // Green color
          },
        ],
      };
      
      const options = {
        responsive: true,
        plugins: { legend: { display: false } },
      };
    
    return <Bar data={data} options={options} />
};

export default BarChart;
