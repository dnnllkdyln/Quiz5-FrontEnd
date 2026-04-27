import React, { useState } from 'react';
import './TalentForm.css';

const TalentForm = () => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    email: '',
    category: '',
    description: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const fullName = `${formData.firstName} ${formData.lastName}`;

  const finalData = {
    participantName: fullName,
    age: formData.age,
    address: formData.address,
    email: formData.email,
    category: formData.category,
    description: formData.description
  };

  try {
    console.log("FETCH IS ABOUT TO RUN");
    const response = await fetch("https://magnificent-crisp-7127fb.netlify.app/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalData)
    });

    let result;
    
    try {
      result = await response.json();
    } catch {
      result = { message: "No JSON response" };
    }

    console.log("Server response:", result);

    if (!response.ok) {
      throw new Error(result.error || "Failed to submit");
    }

    alert("Form submitted successfully!");

    setFormData(initialFormState);

  } catch (error) {
    console.error("Error:", error);
    alert("Submission failed");
  }
};

  return (
    <div className="talent-page-wrapper">
      <div className="form-container">
        <header className="form-header">
          <h1>Talent Form</h1>
          <div className="gold-divider"></div>
          <p>Don't just hold the stage own it. This is your moment to shine.</p>
        </header>

        <form onSubmit={handleSubmit} className="talent-form">
          <div className="form-group">
            <label className="main-label">Participant Name</label>
            <div className="grid-2">
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label>Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Category/Talent Type</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="" disabled>Select your talent</option>
              <option value="singing">Singing</option>
              <option value="dancing">Dancing</option>
              <option value="musical_instrument">Musical Instrument</option>
              <option value="comedy">Comedy</option>
              <option value="magic">Magic</option>
            </select>
          </div>

          <div className="form-group">
            <label>Brief Description of Talent</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us a bit about your talent..."
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default TalentForm;