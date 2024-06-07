import { useState, useEffect } from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [students, setStudents] = useState([])

  const navigate = useNavigate()

  const get_all_students = async () => {
    const peticion = await fetch("http://localhost:3000/students");
    const data = await peticion.json();

    setStudents(data);
  };

  useEffect(() => {
    get_all_students();
  }, []);

  const editar_student = (id) => {
    navigate(`/edit/${id}`)
  }

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(({_id, name,age}, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{age}</td>
              <td>
                <button className="editar" onClick={ () => editar_student(_id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
