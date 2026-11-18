function StudentCard({ student, onDelete }) {
  return (
    <div className="student-card">
      <div className="card-top">
        <img
          src={student.image}
          alt={student.name}
          className="student-image"
        />

        <span className={
          student.status === "Active" ? "active" : "inactive"
        }>
          {student.status}
        </span>
      </div>

      <h3>{student.name}</h3>

      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Year:</strong> {student.year}</p>

      <button
        className="delete-btn"
        onClick={() => onDelete(student.id)}
      >
        Delete Student
      </button>
    </div>
  );
}

export default StudentCard;