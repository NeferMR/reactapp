import { useState, useEffect } from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [personas, setPersonas] = useState([])

  const navigate = useNavigate()

  const get_all_personas = async () => {
    const peticion = await fetch("https://api-generator.retool.com/jYYEW7/data");
    const data = await peticion.json();

    setPersonas(data);
  };

  useEffect(() => {
    get_all_personas();
  }, []);

  const ver_person = (id) => {
    navigate(`/person/${id}`)
  }

  const editar_person = (id) => {
    navigate(`/edit/${id}`)
  }

  const eliminar_person = async (id) => {

    const peticion = await fetch(`https://api-generator.retool.com/jYYEW7/data/${id}`, {
      method: 'DELETE'
    })
    
    await peticion.json()

    await get_all_personas()
  }


  return (
    <section>
      <button className="add-button" onClick={() => navigate('/create')}>+</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Rating</th>
            <th>Link</th>
            <th>Tipo de pago</th>
            <th>Tarjeta de crédito</th>
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map(({ Name,cant,date,rating,link,payment_type,credit_card,discount,id }, index) => (
            <tr key={index}>
              <td>{id}</td>
              <td>{Name}</td>
              <td>{cant}</td>
              <td>{rating}</td>
              <td>{link}</td>
              <td>{payment_type}</td>
              <td>{credit_card}</td>
              <td>{discount}</td>
              <td>
                <button className="ver" onClick={ () => ver_person(id)}>Ver</button>
                <button className="editar" onClick={ () => editar_person(id)}>Editar</button>
                <button className="eliminar" onClick={ () => eliminar_person(id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
