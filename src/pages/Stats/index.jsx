import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useDocumentTitle from "../../utils/documentTitle";
import BeverageForm from "./BeverageForm";
import OrderForm from "./OrderForm";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Statistic(props) {
  const [formData, setFormData] = useState({
    drink_name: "",
    base_price: 0,
    ingredients: [{ ingredient_name: "", quantity: 0 }],
  });

  const [orderData, setOrderData] = useState({
    items: [{ beverage: "", quantity: 0 }],
    date_of_order: "",
    customer_name: "",
  });

  const [ingredientsList, setIngredientsList] = useState([]);
  const [topIngredients, setTopIngredients] = useState([]);
  const [beverageList, setBeverageList] = useState([]);

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchIngredientData = async () => {
    try {
      const response = await axios.post(`${apiUrl}/top_k_ingredients`, {
        top_k: 5,
      });
      const ingredient = response.data.top_k_ingredients;
      setTopIngredients(ingredient);
    } catch (error) {
      console.error("Error fetching top ingredients:", error);
    }
  };

  const fetchIngredientList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/ingredients`);
      const data = response.data;
      const ingredientsList = data.map((item) => ({
        name: item.Ingredients,
        unit: item.Unit,
      }));
      setIngredientsList(ingredientsList);
    } catch (error) {
      console.error("Error fetching ingredient list:", error);
    }
  };

  const fetchBeverageList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/beverages/prices`);
      const data = response.data;
      const BeverageList = data.map((item) => ({
        name: item.Beverage,
      }));
      setBeverageList(BeverageList);
    } catch (error) {
      console.error("Error fetching beverage list:", error);
    }
  };

  const inputBeverage = async () => {
    try {
      console.log("data", formData);
      const response = await axios.post(`${apiUrl}/drinks`, formData);
      toast.success("Beverage submitted successfully!");
      setFormData({
        drink_name: "",
        base_price: 0,
        ingredients: [{ ingredient_name: "", quantity: 0, unit: "" }],
      });
      fetchIngredientData();
    } catch (error) {
      console.error("Error submitting beverage:", error);
      toast.error("Failed to submit beverage.");
    }
  };

  const inputOrder = async () => {
    try {
      const response = await axios.post(`${apiUrl}/orders`, orderData);
      toast.success("Order submitted successfully!");
      setOrderData({
        items: [{ beverage: "", quantity: 0 }],
        date_of_order: "",
        customer_name: "",
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order.");
    }
  };

  const handleBeverageSubmit = (e) => {
    e.preventDefault();
    inputBeverage();
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    inputOrder();
  };

  useEffect(() => {
    fetchIngredientList();
    fetchIngredientData();
    fetchBeverageList();
  }, []);

  useDocumentTitle(props.title);

  return (
    <>
      <Header />
      <main className="global-px">
        {/* First Row: Beverage Form and Ingredients */}
        <section className="flex flex-col-reverse md:flex-row md:space-x-8 py-5">
          {/* Left: Beverage Form */}
          <form
            onSubmit={handleBeverageSubmit}
            className="w-full md:w-2/3 mb-6 md:mb-0"
          >
            <BeverageForm
              formData={formData}
              setFormData={setFormData}
              ingredientsList={ingredientsList}
            />
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Submit Beverage
              </button>
            </div>
          </form>

          {/* Right: Top Ingredients */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">
              Ingredients to import
            </h2>
            <ul className="space-y-2">
              {topIngredients.length === 0 ? (
                <p className="text-gray-500">No data available</p>
              ) : (
                topIngredients.map((item, index) => (
                  <li key={index} className="border p-3 rounded shadow-sm">
                    <p>
                      <strong>Name:</strong> {item.ingredient}
                    </p>
                    <p>
                      <strong>Used in:</strong> {item.usage_count} drinks
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        {/* New Row: Order Form */}
        <section className="py-5">
          <form onSubmit={handleOrderSubmit} className="w-full md:w-2/3">
            <h2 className="text-lg font-semibold mb-4">Submit New Order</h2>
            <OrderForm
              orderData={orderData}
              setOrderData={setOrderData}
              beverageList={beverageList}
            />
            <div className="flex justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                Submit Order
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Statistic;
