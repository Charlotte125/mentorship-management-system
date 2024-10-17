import React, { useState } from 'react';
import toast from 'react-hot-toast';
// import api, { API_URL } from '../../../api'; // Adjust the import based on your project structure
import api,{API_URL} from '../../src/api';
import "../styles/main/main.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    id: '',
    department: '',
    email: '',
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
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);

    try {
      const response = await api.post(`${API_URL}register/`, formData);
      if (response.status === 201) {
        toast.success('Registration successful!');
        // Optionally redirect or reset form
        setFormData({
          firstName: '',
          lastName: '',
          id: '',
          department: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
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
            name="firstName" 
            placeholder="First name" 
            value={formData.firstName} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="lastName" 
            placeholder="Last name" 
            value={formData.lastName} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="number" 
            name="id" 
            placeholder="Id" 
            value={formData.id} 
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
            name="email" 
            placeholder="Email" 
            value={formData.email} 
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
