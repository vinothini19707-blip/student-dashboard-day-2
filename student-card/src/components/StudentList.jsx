import StudentCard from "./StudentCard";

function StudentList({ students, onDelete }) {
  return (
    <div className="student-grid">
      {students.length > 0 ? (
        students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No students found!</p>
      )}
    </div>
  );
}

export default StudentList;