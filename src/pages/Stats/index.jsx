import "react-loading-skeleton/dist/skeleton.css";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useDocumentTitle from "../../utils/documentTitle";
import BeverageForm from "./BeverageForm";
import IngredientForm from "./IngredientForm";

function Statistic(props) {
  const [formData, setFormData] = useState({
    beverageName: '',
    price: '',
    compounds: [{ name: '', quantity: '' }],
  });
  
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', price: '' }]);

  // Submit handler for BeverageForm
  const handleBeverageSubmit = (e) => {
    e.preventDefault();
    console.log("Beverage Data Submitted:", formData);
  };

  // Submit handler for IngredientForm
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
          {/* Beverage Form */}
          <form 
            onSubmit={handleBeverageSubmit} 
            className="w-full md:w-2/3 mb-6 md:mb-0"  // 100% width on mobile, 65% width on medium+ screens
          >
            <BeverageForm formData={formData} setFormData={setFormData} />
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">Submit Beverage</button>
            </div>
          </form>
          
          {/* Ingredient Form */}
          <form 
            onSubmit={handleIngredientSubmit} 
            className="w-full md:w-1/3"  // 100% width on mobile, 35% width on medium+ screens
          >
            <IngredientForm ingredients={ingredients} setIngredients={setIngredients} />
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">Submit Ingredient</button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Statistic;
