import React, { useState, useEffect } from "react";
import "../styles/table/table.css"; // Add appropriate CSS styles
import { FiSearch } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const CustomerTable = () => {
  const initialData = [
    {
      name: "Ronald Richards",
      course: "Computer Science",
      phone: "123-456-7890",
      email: "john@example.com",
      country: "USA",
      status: "Active",
    },
    {
      name: "Sylvie Uwase",
      course: "Mathematics",
      phone: "098-765-4321",
      email: "jane@example.com",
      country: "Canada",
      status: "Inactive",
    },
    {
      name: "Jerome Bell",
      course: "Engineering",
      phone: "555-666-7777",
      email: "alice@example.com",
      country: "UK",
      status: "Active",
    },
    {
      name: "Kathryn Murphy",
      course: "Business",
      phone: "444-555-6666",
      email: "michael@example.com",
      country: "Australia",
      status: "Active",
    },
    {
      name: "Emmanuel Karangwa",
      course: "History",
      phone: "222-333-4444",
      email: "emily@example.com",
      country: "Germany",
      status: "Inactive",
    },
    {
      name: "Thierry Rugamba",
      course: "Microsoft",
      phone: "222-333-4444",
      email: "emily@example.com",
      country: "Germany",
      status: "Inactive",
    },
    {
      name: "Yves Uwitonze",
      course: "Yahoo",
      phone: "222-333-4444",
      email: "emily@example.com",
      country: "Germany",
      status: "Inactive",
    },
    {
      name: "Chantal Mukamana",
      course: "Facebook",
      phone: "222-333-4444",
      email: "emily@example.com",
      country: "Germany",
      status: "Inactive",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(initialData); 
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(initialData);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const newFilteredData = initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.course.toLowerCase().includes(value) ||
        item.country.toLowerCase().includes(value)
    );

    setFilteredData(newFilteredData);
    setCurrentPage(1); 
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const itemsPerPage = 4;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
  
    setCurrentPage(1);
  }, [filteredData]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th colSpan="6">
              <div className="table-header">
                <h1>All students</h1>
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
        <tbody className="data">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
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
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaAngleLeft />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            <FaAngleRight />
          </button>
        </div>
      </table>
    </div>
  );
};

export default CustomerTable;
