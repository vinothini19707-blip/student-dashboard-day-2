
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const defaultStudents = [
  {
    id: 102,
    name: "Priya Sharma",
    department: "Information Technology",
    email: "priya@gmail.com",
    year: "2nd Year",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 103,
    name: "Rahul Raj",
    department: "Electronics",
    email: "rahul@gmail.com",
    year: "3rd Year",
    status: "Inactive",
    image: "https://i.pravatar.cc/150?img=12"
  }
];

function App() {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem("studentRecordsV2");
      return saved ? JSON.parse(saved) : defaultStudents;
    } catch {
      return defaultStudents;
    }
  });

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const photoInputRef = useRef(null);

  const emptyForm = {
    name: "",
    department: "",
    email: "",
    year: "1st Year",
    status: "Active"
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("studentRecordsV2", JSON.stringify(students));
  }, [students]);

  const total = students.length;
  const active = students.filter(s => s.status === "Active").length;
  const inactive = total - active;

  const filteredStudents = students.filter(s =>
    `${s.name} ${s.id} ${s.department} ${s.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addStudent = (e) => {
    e.preventDefault();

    const newStudent = {
      ...form,
      id: Date.now(),
      image: `https://i.pravatar.cc/150?u=${Date.now()}`
    };

    setStudents(prev => [...prev, newStudent]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const openProfile = (student) => {
    setSelectedStudent(student);
    setIsEditing(false);
  };

  const startEdit = () => {
    setForm({
      name: selectedStudent.name,
      department: selectedStudent.department,
      email: selectedStudent.email,
      year: selectedStudent.year,
      status: selectedStudent.status
    });

    setIsEditing(true);
  };

  const saveChanges = (e) => {
    e.preventDefault();

    const updatedStudent = {
      ...selectedStudent,
      ...form
    };

    setStudents(prev =>
      prev.map(s =>
        s.id === selectedStudent.id ? updatedStudent : s
      )
    );

    setSelectedStudent(updatedStudent);
    setIsEditing(false);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
      setSelectedStudent(null);
    }
  };

  const changeStatus = (id) => {
    const updatedStudent = {
      ...selectedStudent,
      status:
        selectedStudent.status === "Active" ? "Inactive" : "Active"
    };

    setStudents(prev =>
      prev.map(s => s.id === id ? updatedStudent : s)
    );

    setSelectedStudent(updatedStudent);
  };

  const changeProfilePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedStudent = {
        ...selectedStudent,
        image: reader.result
      };

      setStudents(prev =>
        prev.map(s =>
          s.id === selectedStudent.id ? updatedStudent : s
        )
      );

      setSelectedStudent(updatedStudent);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="app">

      <header className="main-header">
        <h1>Student Card System</h1>
        <p>Manage Your Student Information</p>
      </header>

      <main className="main-content">

        <section className="welcome">
          <h2>Welcome to Student Card System</h2>
          <p>Create and manage student ID cards easily.</p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <h3>Total Students</h3>
            <h1>{total}</h1>
          </div>

          <div className="stat-card">
            <h3>Active Students</h3>
            <h1 className="green">{active}</h1>
          </div>

          <div className="stat-card">
            <h3>Inactive Students</h3>
            <h1 className="red">{inactive}</h1>
          </div>
        </section>

        <section className="controls">
          <button
            className="add-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "+ Add Student"}
          </button>

          <input
            className="search-box"
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </section>

        {showForm && (
          <form className="student-form" onSubmit={addStudent}>
            <h2>Add New Student</h2>

            <input
              name="name"
              placeholder="Student Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <select name="year" value={form.year} onChange={handleChange}>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

            <select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button type="submit" className="save-button">
              Save Student
            </button>
          </form>
        )}

        <section className="details-section">
          <h2 className="section-title">Student ID Cards</h2>

          <div className="student-list">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <div className="id-card" key={student.id}>

                  <div className="id-card-header">
                    STUDENT ID CARD
                  </div>

                  <div className="id-card-body">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="student-image"
                    />

                    <h2>{student.name}</h2>

                    <h4>Student</h4>

                    <div className="student-info">
                      <p><b>ID:</b> {student.id}</p>
                      <p><b>Department:</b> {student.department}</p>
                      <p><b>Year:</b> {student.year}</p>
                      <p><b>Email:</b> {student.email}</p>

                      <p>
                        <b>Status:</b>
                        <span className={
                          student.status === "Active"
                            ? "active-text"
                            : "inactive-text"
                        }>
                          {" "}{student.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    className="id-card-footer"
                    onClick={() => openProfile(student)}
                  >
                    STUDENT DASHBOARD
                  </button>

                </div>
              ))
            ) : (
              <p className="no-data">No Students Found</p>
            )}
          </div>
        </section>

      </main>

      {selectedStudent && (
        <div
          className="modal-overlay"
          onClick={() => {
            setSelectedStudent(null);
            setIsEditing(false);
          }}
        >
          <div
            className="profile-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setSelectedStudent(null)}
            >
              ✕
            </button>

            {!isEditing ? (
              <>
                <img
                  src={selectedStudent.image}
                  alt={selectedStudent.name}
                  className="profile-image"
                />

                <button
                  className="photo-button"
                  onClick={() => photoInputRef.current?.click()}
                >
                  Change Photo
                </button>

                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={changeProfilePhoto}
                />

                <h2>{selectedStudent.name}</h2>

                <p><b>Student ID:</b> {selectedStudent.id}</p>
                <p><b>Department:</b> {selectedStudent.department}</p>
                <p><b>Email:</b> {selectedStudent.email}</p>
                <p><b>Year:</b> {selectedStudent.year}</p>
                <p><b>Status:</b> {selectedStudent.status}</p>

                <button className="save-button" onClick={startEdit}>
                  Edit Details
                </button>

                <button
                  className="delete-button"
                  onClick={() => deleteStudent(selectedStudent.id)}
                >
                  Delete Student
                </button>

                <button
                  className="add-button"
                  onClick={() => changeStatus(selectedStudent.id)}
                >
                  Change Status
                </button>
              </>
            ) : (
              <form className="edit-form" onSubmit={saveChanges}>
                <h2>Edit Student Details</h2>

                <label>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <label>Department</label>
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                />

                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <label>Year</label>
                <select name="year" value={form.year} onChange={handleChange}>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>

                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <button type="submit" className="save-button">
                  Save Changes
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <footer className="page-footer">
        Student Card System © 2026
      </footer>

    </div>
  );
}

export default App;
