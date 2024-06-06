import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./formulario.css";
import { useEffect, useState } from "react";

const Formulario = () => {
  const navigate = useNavigate();

  const params = useParams();
  const location = useLocation();

  const [op, setOp] = useState(undefined);
  const [title, setTitle] = useState("Crear Persona");
  const [object, setObject] = useState({
    Name: "",
    cant: "",
    rating: "",
    link: "",
    payment_type: "",
    credit_card: "",
    discount: "",
  });

  const ejecutar = async (event) => {
    event.preventDefault();

    if (op === undefined) {
      create(event);
    } else {
      edit(event);
    }
  };

  const edit = async (event) => {
    const id = params.id;

    const { Name, cant, rating, link, payment_type, credit_card, discount } =
      event.target;
    console.log(nombre.value);
    const objecto = {
      Name: nombre.value,
      cant: cant.value,
      rating: rating.value,
      link: link.value,
      payment_type: tipo_pago.value,
      credit_card: tarjeta.value,
      discount: descuento.value,
    };

    const peticion = await fetch(
      `https://api-generator.retool.com/jYYEW7/data/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(objecto),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ok = await peticion.json();

    if (ok !== undefined) return navigate("/");

    alert("Error en el servidor");
  };

  const create = async (event) => {
    const { Name, cant, rating, link, payment_type, credit_card, discount } =
      event.target;
    let _id = 1;
    for (let index = 1; index < 500; index++) {
      try {
        const peticion = await fetch(
          `https://api-generator.retool.com/jYYEW7/data/${index}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (peticion.status === 200) continue;
        _id = index;
        break;
      } catch (error) {
        _id = index;
        break;
      }

    }

    const objeto = {
      id: _id,
      Name: nombre.value,
      cant: cant.value,
      rating: rating.value,
      link: link.value,
      date: "2023-05-05",
      payment_type: tipo_pago.value,
      credit_card: tarjeta.value,
      discount: descuento.value,
    };

    const peticion = await fetch(
      "https://api-generator.retool.com/jYYEW7/data",
      {
        method: "POST",
        body: JSON.stringify(objeto),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ok = await peticion.json();

    if (ok !== undefined) return navigate("/");

    alert("Error en el servidor");
  };

  const buscar_person = async (id) => {
    const peticion = await fetch(
      `https://api-generator.retool.com/jYYEW7/data/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const objeto = await peticion.json();

    if (objeto !== undefined) {
      return setObject(objeto);
    }

    alert("Error buscando buscando a la persona");
  };

  useEffect(() => {
    const id = params.id;

    if (id) {
      if (location.pathname.includes("person")) {
        setOp(true);
        setTitle("Ver Persona");
        buscar_person(id);
      } else {
        setOp(false);
        setTitle("Editar Persona");
        buscar_person(id);
      }
    }
  }, [params, location]);

  return (
    <section className="form-container">
      <h2>{title}</h2>
      <form onSubmit={ejecutar}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>

          {op ? (
            <input
              type="text"
              id="nombre"
              name="nombre"
              defaultValue={object.Name}
              required
              readOnly
            />
          ) : (
            <input
              type="text"
              id="nombre"
              name="nombre"
              defaultValue={object.Name}
              required
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad:</label>
          {op ? (
            <input
              type="number"
              id="cantidad"
              name="cant"
              defaultValue={object.cant}
              required
              readOnly
            />
          ) : (
            <input
              type="number"
              id="cantidad"
              name="cant"
              defaultValue={object.cant}
              required
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          {op ? (
            <input
              type="number"
              id="rating"
              name="rating"
              defaultValue={object.rating}
              required
              readOnly
            />
          ) : (
            <input
              type="number"
              id="rating"
              name="rating"
              defaultValue={object.rating}
              required
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="link">Link:</label>
          {op ? (
            <input
              type="text"
              id="link"
              name="link"
              defaultValue={object.link}
              required
              readOnly
            />
          ) : (
            <input
              type="text"
              id="link"
              name="link"
              defaultValue={object.link}
              required
            />
          )}
        </div>
        <div className="form-">
          <label htmlFor="tipo_pago">Tipo de Pago:</label>
          {op ? (
            <input
              type="text"
              id="tipo_pago"
              name="tipo_pago"
              defaultValue={object.payment_type}
              required
              readOnly
            />
          ) : (
            <input
              type="text"
              id="tipo_pago"
              name="tipo_pago"
              defaultValue={object.payment_type}
              required
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="tarjeta">Tarjeta:</label>
          {op ? (
            <input
              type="text"
              id="tarjeta"
              name="tarjeta"
              defaultValue={object.credit_card}
              required
              readOnly
            />
          ) : (
            <input
              type="text"
              id="tarjeta"
              name="tarjeta"
              defaultValue={object.credit_card}
              required
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="descuento">Descuento:</label>
          {op ? (
            <input
              type="number"
              id="descuento"
              name="descuento"
              defaultValue={object.discount}
              required
              readOnly
            />
          ) : (
            <input
              type="number"
              id="descuento"
              name="descuento"
              defaultValue={object.discount}
              required
            />
          )}
        </div>
        <div className="button-group">
          {!op && (
            <button type="submit" className="save-button">
              Guardar
            </button>
          )}
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/")}
          >
            Regresar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Formulario;
