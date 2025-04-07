import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function PieChart({ data, name }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
           
          },
      },
      title: {
        display: true,
        text: name,
        font: {
          size: 20,  
          weight: "bold",  
          family: "Arial", 
        
        },

      }
    }
  };

  return (
    <div style={{ width: "560px", marginTop: "2rem" }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;
