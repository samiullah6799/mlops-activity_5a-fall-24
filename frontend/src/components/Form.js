import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    country: ""
  });

  const [message, setMessage] = useState(null);  // Add state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/submit", formData)
      .then((response) => {
        setMessage(response.data.message);  // Set the success message
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
        setMessage("Error submitting data. Please try again.");
      });
  };

  return (
    <div className="container mt-5">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            id="city"
            placeholder="Enter your city"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            name="country"
            className="form-control"
            id="country"
            placeholder="Enter your country"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* Display success or error message */}
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}

export default Form;
