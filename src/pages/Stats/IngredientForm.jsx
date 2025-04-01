import React from "react";

function IngredientForm({ ingredients, setIngredients }) {
  const handleChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add Ingredient</h1>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="form-group mb-6 flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter ingredient name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={ingredient.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={ingredient.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Remove button if there are more than one ingredient */}
          {ingredients.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className="self-start px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 duration-300"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default IngredientForm;
