import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./formulario.css";
import { useEffect, useState } from "react";

const Formulario = () => {
  const navigate = useNavigate();

  const params = useParams();
  const location = useLocation();

  const [student, setStudent] = useState({
    name: "",
    age: "",
    grades : [],
  });

  const edit_student = async (event) => {
    const id = params.id;

    event.preventDefault();

    let _grades = [];

    student.grades.map((grade) => {
      _grades.push({
        semester: grade.semester,
        grade: document.getElementById(`grade-${grade.semester}`).value,
      });
    });

    const _student = {
      name: nombre.value,
      age: edad.value,
      grades: _grades,
    };

    console.log(_student);

    const peticion = await fetch(
      `http://localhost:3000/students/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(_student),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ok = await peticion.json();

    if (ok !== undefined) return navigate("/");

    alert("Error en el servidor");
  };

  const buscar_student = async (id) => {
    const peticion = await fetch(
      `http://localhost:3000/students/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const objeto = await peticion.json();

    if (objeto !== undefined) {
      return setStudent(objeto);
    }

    alert("Error buscando buscando a la persona");
  };

  useEffect(() => {
    const id = params.id;
    buscar_student(id);
  }, [params, location]);

  return (
    <section className="form-container">
      <h2>Editar estudiante</h2>
      <form onSubmit={edit_student}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>

          <input
            type="text"
            id="nombre"
            name="nombre"
            defaultValue={student.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cantidad">Edad:</label>
          <input
            type="number"
            id="edad"
            name="edad"
            defaultValue={student.age}
            required
          />
        </div>
        {student.grades.map((grade, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`grade-${grade.semester}`}>Semestre {grade.semester}:</label>
            <input
              type="number"
              id={`grade-${grade.semester}`}
              name={`grade-${grade.semester}`}
              defaultValue={grade.grade}
              required
            />
          </div>
        ))}
        <div className="button-group">
          <button
            type="submit"
            className="back-button"
          >
            Editar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Formulario;
