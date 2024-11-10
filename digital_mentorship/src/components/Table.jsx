import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "../styles/table/table.css"; 
import { FiSearch } from "react-icons/fi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const CustomerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const itemsPerPage = 4;

  
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/registrations/");
      setData(response.data);
      setFilteredData(response.data); 
      setLoading(false); 
    } catch (err) {
      setError("Failed to fetch data."); 
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const newFilteredData = data.filter(
      (item) =>
        item.first_name.toLowerCase().includes(value) ||
        item.last_name.toLowerCase().includes(value) ||
        item.email_address.toLowerCase().includes(value) ||
        item.department.toLowerCase().includes(value)
    );

    setFilteredData(newFilteredData);
    setCurrentPage(1); 
  };

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>; 
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
            <th>First name</th>
            <th>Last name</th>
            <th>Student ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="data">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={item.student_id || index}>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.student_id}</td>
                <td>{item.email_address}</td>
                <td>{item.department}</td>
                <td>{item.status || "Active"}</td> 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
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
          disabled={currentPage === totalPages}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default CustomerTable;
