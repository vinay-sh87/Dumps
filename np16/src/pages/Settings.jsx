import { useState } from "react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";

export const Settings = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    notification: true,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = () => {
    console.log("Form submitted...", formData);
    alert("settings saved successfully...");
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
      <Card className="max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2  focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              Enable email notifications
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSubmit} variant="primary">
              Save Changes
            </Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </div>
      </Card>
    </>
  );
};
