import React from "react";

function BeverageForm({ formData, setFormData, ingredientsList }) {
  const handleChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { ingredient_name: '', quantity: 0, unit: '' }],
    });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add Beverage</h1>

      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700">Beverage Name</label>
        <input
          type="text"
          value={formData.drink_name}
          onChange={(e) => setFormData({ ...formData, drink_name: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter beverage name"
          required
        />
      </div>

      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700">Base Price</label>
        <input
          type="number"
          value={formData.base_price}
          onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter base price"
          required
        />
      </div>

      {formData.ingredients.map((ingredient, index) => (
        <div key={index} className="form-group mb-4 flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Ingredient Name</label>
            <select
              value={ingredient.drink_name}
              onChange={(e) => {
                const selectedIngredient = ingredientsList.find(
                  (ingredient) => ingredient.name === e.target.value
                );
                // Update the ingredient name
                handleChange(index, "drink_name", e.target.value);
                // Update the unit field based on the selected ingredient
                handleChange(index, "unit", selectedIngredient ? selectedIngredient.unit : '');
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="">Select Ingredient</option>
              {ingredientsList.map((ingredient, idx) => (
                <option key={idx} value={ingredient.name}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1" style={{ flex: '0 0 20%' }}>
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
          <div className="flex-1" style={{ flex: '0 0 20%' }}>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <input
              type="text"
              value={ingredient.unit}
              onChange={(e) => handleChange(index, "unit", e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Unit"
              disabled
            />
          </div>
          {formData.ingredients.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 duration-300"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddIngredient}
        className="mb-4 px-4 py-2 text-sm font-medium text-tertiary bg-secondary rounded-md shadow-sm hover:bg-secondary-200 duration-300"
      >
        Add Ingredient
      </button>
    </div>
  );
}

export default BeverageForm;
