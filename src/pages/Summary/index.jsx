import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab, colors } from "@mui/material";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

function Summary() {
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const [lineData, setLineData] = useState(null);
  const [ordersData, setOrdersData] = useState(null);
  const [ingredientData, setIngredientData] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const periods = ["month", "week", "day"];
  const color = [
    "#e91e63", "#f06292", "#9c27b0", "#7e57c2", "#0288d1", 
    "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ff9800",
    "#ff5722", "#607d8b", "#3f51b5", "#8e24aa", "#c2185b",
    "#ffeb3b", "#ff9800", "#cddc39", "#f44336", "#2196f3"
  ];
  
  
  const getRandomPastelColors = (count) => {
    const shuffled = [...color].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const period = periods[tabIndex];
        const response = await axios.get(`${apiUrl}/reports/recent-sales`, {
          params: { period: period, number: 7 },
        });
        
        const rawData = response.data;
        const labels = rawData.map((item) => item.Period.slice(0, item.Period.length - 5));
        const salesData = rawData.map((item) => item["Total (1000 VND)"]);
        
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "Sales Data",
              data: salesData,
              backgroundColor: "#f9e3b4", 
              borderColor: "#f9e3b4",
              tension: 0.4,
              fill: true,
            },
          ],
        };
        
        setLineData(chartData);
      } catch (error) {
        console.error("There was an error fetching the order data:", error);
      }
    };

    const fetchOrdersData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reports/drinks-quantity/monthly`);
        const orders = response.data;    
        const orderLabels = orders.data.map((item) => item.Beverages); 
        const orderValues = orders.data.map((item) => item.Quantity); 
        const pieChartData = {
          labels: orderLabels,
          datasets: [
            {
              data: orderValues,
              backgroundColor: getRandomPastelColors(orderLabels.length),
              borderColor: "#f9e3b4",
            },
          ],
        };
        setOrdersData(pieChartData);
      } catch (error) {
        console.error("There was an error fetching the orders data:", error);
      }
    };
    const fetchIngredientData = async () => {
      try {
        const response = await axios.post(`${apiUrl}/top_k_ingredients`, {
          top_k: 5,
        });
        const orders = response.data.top_k_ingredients;
        const orderLabels = orders.map((item) => item.ingredient);
        const orderValues = orders.map((item) => item.usage_count);

        const ingredientData = {
          labels: orderLabels,
          datasets: [
            {
              data: orderValues,
              backgroundColor: getRandomPastelColors(orderLabels.length),     
              borderColor: "#f9e3b4",
            },
          ],
        };
       setIngredientData(ingredientData);
      } catch (error) {
        console.error("There was an error fetching the orders data:", error);
      }
    };
    
    
    fetchIngredientData()
    fetchOrderData();
    fetchOrdersData();
  },  [tabIndex]); // Make sure to include tabIndex in the dependency array

  return (
    <>
      <Header />
      <main className="flex flex-col-reverse md:flex-row global-px">
        <section className="flex-1 flex flex-col py-5">
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Month" />
            <Tab label="Week" />
            <Tab label="Day" />
          </Tabs>
          <div className="mt-5 flex flex-col space-y-20">
            <div className="mx-auto w-full max-w-5xl">
              {lineData ? (
                <LineChart data={lineData} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
            <div className="mt-5 flex flex-row justify-between">
              {ordersData ? (
                <>
                  <PieChart name="Order Chart" data={ordersData} />
                  <PieChart name="Ingredient usage" data={ingredientData} />
                </>
              ) : (
                <p>Loading charts...</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Summary;
