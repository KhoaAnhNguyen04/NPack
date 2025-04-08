import React from "react";

function OrderForm({ orderData, setOrderData, beverageList }) {
  const handleCustomerChange = (e) => {
    setOrderData({ ...orderData, customer_name: e.target.value });
  };

  const handleDateChange = (e) => {
    const [year, month, day] = e.target.value.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    setOrderData({ ...orderData, date_of_order: formattedDate });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...orderData.items];
    newItems[index][field] = value;
    setOrderData({ ...orderData, items: newItems });
  };

  const addItem = () => {
    setOrderData({
      ...orderData,
      items: [...orderData.items, { beverage: "", quantity: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = [...orderData.items];
    newItems.splice(index, 1);
    setOrderData({ ...orderData, items: newItems });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Customer Name</label>
        <input
          type="text"
          value={orderData.customer_name}
          onChange={handleCustomerChange}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Date of Order</label>
        <input
          type="date"
          value={formatDateForInput(orderData.date_of_order)}
          onChange={handleDateChange}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Items</label>
        {orderData.items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <select
              value={item.beverage}
              onChange={(e) =>
                handleItemChange(index, "beverage", e.target.value)
              }
              className="select select-bordered flex-1"
            >
              <option value="">Select Beverage</option>
              {beverageList.map((bev, idx) => (
                <option key={idx} value={bev.name}>
                  {bev.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              className="input input-bordered w-24"
            />
            {orderData.items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="btn btn-error btn-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="btn btn-secondary btn-sm mt-2"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}

export default OrderForm;
