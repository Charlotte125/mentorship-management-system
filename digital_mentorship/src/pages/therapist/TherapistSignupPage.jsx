import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import api, { API_URL } from "../../src/api";
import api, { API_URL }from '../../api';
import "../../styles/main/main.css";
import Conditions from '../../components/Conditions';

const TherapistSignupPage = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    level_education: '',
    email_address: '',
    password: '',
    document: null
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    setIsLoading(true);
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await api.post(`${API_URL}api/register/therapist/`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 201) {
        setPopupMessage('Registration successful');
        setPopupType('success');
        toast.success('Registration successful!');
        setShowPopup(true);
        setTimeout(() => {
          navigate('/Dashboard');
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setPopupMessage(errorMessage);
      setPopupType('error');
      toast.error(errorMessage);
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="popups">
        {showPopup && (
          <div className={`popup ${popupType}`}>
            <span className="close-icon" onClick={() => setShowPopup(false)}>×</span>
            <p>{popupMessage}</p>
          </div>
        )}
      </div>
      <div className="contents">
        {isPopupOpen && <Conditions closePopup={closePopup} />}
        <form onSubmit={handleSubmit}>
          <h2>Register as Therapist</h2>
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}

          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}

          <input
            type="text"
            name="level_education"
            placeholder="Level of education"
            value={formData.level_education}
            onChange={handleChange}
          />
          {errors.level_education && <p className="error">{errors.level_education}</p>}

          <input
            type="email"
            name="email_address"
            placeholder="Email"
            value={formData.email_address}
            onChange={handleChange}
          />
          {errors.email_address && <p className="error">{errors.email_address}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="field">
            <label htmlFor="document">Attach diploma/certificate</label>
            <input
              id="document"
              type="file"
              name="document"
              onChange={handleChange}
            />
            {errors.document && <p className="error">{errors.document}</p>}
          </div>

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

export default TherapistSignupPage;
