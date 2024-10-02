import React, { useState } from "react";
import "../styles/table/table.css"; // Add appropriate CSS styles
import { FiSearch } from "react-icons/fi";

const CustomerTable = () => {
  const initialData = [
    {
      name: "John Doe",
      course: "Computer Science",
      phone: "123-456-7890",
      email: "john@example.com",
      country: "USA",
      status: "Active",
    },
    {
      name: "Jane Smith",
      course: "Mathematics",
      phone: "098-765-4321",
      email: "jane@example.com",
      country: "Canada",
      status: "Inactive",
    },
    {
      name: "Alice Johnson",
      course: "Engineering",
      phone: "555-666-7777",
      email: "alice@example.com",
      country: "UK",
      status: "Active",
    },
    {
      name: "Michael Brown",
      course: "Business",
      phone: "444-555-6666",
      email: "michael@example.com",
      country: "Australia",
      status: "Active",
    },
    {
      name: "Emily Davis",
      course: "History",
      phone: "222-333-4444",
      email: "emily@example.com",
      country: "Germany",
      status: "Inactive",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(initialData);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.course.toLowerCase().includes(value) ||
        item.country.toLowerCase().includes(value)
    );
    setData(filteredData);
  };

  return (
    <div className="table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th colSpan="6">
              <div className="table-header">
                <h1>All Customers</h1>
                <div className="search-bar">
                  <div className="input-container">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th>Student Names</th>
            <th>Course</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.email || index}>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.country}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
