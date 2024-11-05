import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api, { API_URL } from '../../src/api';
import "../styles/main/main.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    student_id: '', 
    department: '',
    email_address: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form Data:", formData); 

      const response = await api.post(`${API_URL}api/register/`, formData);
      if (response.status === 201) {
        toast.success('Registration successful!');
      }
    } catch (error) {
      console.error("Error:", error); 
      setIsLoading(false);
      if (error.response && error.response.data) {
        console.error("Error Data:", error.response.data); 
        toast.error(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        toast.error('There was an error. Please contact support.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="contents">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input 
            type="text" 
            name="first_name" 
            placeholder="First name" 
            value={formData.first_name} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="last_name" 
            placeholder="Last name" 
            value={formData.last_name} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="student_id" 
            placeholder="Student ID" 
            value={formData.student_id} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="department" 
            placeholder="Department" 
            value={formData.department} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="email" 
            name="email_address" 
            placeholder="Email" 
            value={formData.email_address} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        <div className="lower-text">
          <div className="link">
            <p>Have an account?</p>
            <a href="/">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
