import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const uploadTabs = [
  { label: "New Orders", endpoint: "/upload/new-orders" },
  { label: "Prices Upload", endpoint: "/upload/prices" },
  { label: "New Stocks", endpoint: "/upload/stock" },
  { label: "Ingredients Upload", endpoint: "/upload/ingredients" },
];

function UploadCSVForm({ apiUrl }) {
  const [csvFile, setCsvFile] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleCSVChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleCSVUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      toast.error("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      await axios.post(`${apiUrl}${uploadTabs[activeTab].endpoint}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("CSV uploaded successfully!");
      setCsvFile(null);
    } catch (error) {
      console.error("Error uploading CSV:", error);
      toast.error("Failed to upload CSV.");
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="w-full md:w-1/3 mt-8 md:mt-0">
      <h2 className="text-lg font-semibold mb-4">Upload CSV File</h2>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Upload Tabs"
        >
          {uploadTabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <Box className="pt-4">
        <Typography variant="subtitle1" gutterBottom>
          Selected Upload Type: <strong>{uploadTabs[activeTab].label}</strong>
        </Typography>

        <form onSubmit={handleCSVUpload} className="space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVChange}
            className="block w-full text-sm text-gray-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-blue-50 file:text-blue-700
              file:font-medium file:text-sm
              hover:file:bg-blue-100
              transition-all duration-150 ease-in-out"
          />

          <button type="submit" className="btn btn-secondary w-full">
            Upload CSV
          </button>
        </form>
      </Box>
    </div>
  );
}

export default UploadCSVForm;
