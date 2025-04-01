import React from "react";

function BeverageForm({ formData, setFormData }) {
  const handleChange = (index, field, value) => {
    const updatedCompounds = [...formData.compounds];
    updatedCompounds[index][field] = value;
    setFormData({ ...formData, compounds: updatedCompounds });
  };

  const handleAddCompound = () => {
    setFormData({
      ...formData,
      compounds: [...formData.compounds, { name: '', quantity: '' }],
    });
  };

  const handleRemoveCompound = (index) => {
    const updatedCompounds = [...formData.compounds];
    updatedCompounds.splice(index, 1);
    setFormData({ ...formData, compounds: updatedCompounds });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add Beverage</h1>

      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700">Beverage Name</label>
        <input
          type="text"
          value={formData.beverageName}
          onChange={(e) => setFormData({ ...formData, beverageName: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter beverage name"
          required
        />
      </div>

      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter price"
          required
        />
      </div>

      {formData.compounds.map((compound, index) => (
        <div key={index} className="form-group mb-4 flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Beverage Compound Name</label>
            <input
              type="text"
              value={compound.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter compound ingredients"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={compound.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter quantity"
              required
            />
          </div>
          {formData.compounds.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveCompound(index)}
              className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 duration-300"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddCompound}
        className="mb-4 px-4 py-2 text-sm font-medium text-tertiary bg-secondary rounded-md shadow-sm hover:bg-secondary-200 duration-300"
      >
        Add Compound
      </button>
    </div>
  );
}

export default BeverageForm;
