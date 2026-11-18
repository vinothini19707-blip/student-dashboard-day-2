import { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
    year: "1st Year"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddStudent({
      ...formData,
      id: Date.now(),
      status: "Active",
      image: `https://i.pravatar.cc/150?u=${Date.now()}`
    });

    setFormData({
      name: "",
      department: "",
      email: "",
      year: "1st Year"
    });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Add New Student</h2>

      <input
        name="name"
        placeholder="Student Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <select
        name="year"
        value={formData.year}
        onChange={handleChange}
      >
        <option>1st Year</option>
        <option>2nd Year</option>
        <option>3rd Year</option>
        <option>4th Year</option>
      </select>

      <button type="submit" className="add-btn">
        + Add Student
      </button>
    </form>
  );
}

export default StudentForm;