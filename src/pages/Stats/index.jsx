import "react-loading-skeleton/dist/skeleton.css";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useDocumentTitle from "../../utils/documentTitle";
import BeverageForm from "./BeverageForm";
import IngredientForm from "./IngredientForm";
import axios from "axios";

function Statistic(props) {
  const [formData, setFormData] = useState({
    drink_name: '',
    base_price: '',
    ingredients: [{ ingredient_name: '', quantity: 0, unit: '' }],
  });

  const [ingredients, setIngredients] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchIngredientList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/ingredients`);
      const data = response.data;
      console.log(data);
      const ingredientsList = data.map(item => ({
        name: item.Ingredients,
        unit: item.Unit,
      }));
      setIngredientsList(ingredientsList);
    } catch (error) {
      console.error("Error fetching ingredient list:", error);
    }
  };

  const inputBeverage = async () => {
    try {
      console.log("Form Data:", formData);
      const response = await axios.post(`${apiUrl}/drinks`, formData);
      console.log("Beverage data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting beverage:", error);
    }
  };

  useEffect(() => {
    fetchIngredientList();
  }, []);

  const handleBeverageSubmit = (e) => {
    e.preventDefault();
    inputBeverage(); 
  };

  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    console.log("Ingredient Data Submitted:", ingredients);
  };

  useDocumentTitle(props.title);

  return (
    <>
      <Header />
      <main className="flex flex-col-reverse md:flex-row global-px">
        <section className="flex-1 flex flex-col md:flex-row md:space-x-8 py-5">
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

          <form
            onSubmit={handleIngredientSubmit}
            className="w-full md:w-1/3"
          >
            <IngredientForm
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Submit Ingredient
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Statistic;
