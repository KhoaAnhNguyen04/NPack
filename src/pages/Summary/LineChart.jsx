import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart
(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Sales Over Time",
        font: {
          size: 20,  
          weight: "bold",  
          family: "Arial", 
        },
      }
    }
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Line data={props.data} options={options} />
    </div>
  );
}

export default LineChart
;
