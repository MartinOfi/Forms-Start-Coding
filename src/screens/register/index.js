import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./styles.css";

//Esquema de Yup
const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required("Este campo es obligatorio")
    .matches(/^[a-zA-Z\s]*$/, "Solo ingresar texto"),
  id: Yup.number()
    .required("Este campo es obligatorio")
    .min(10000000, "El dni debe ser mayor a 10 millones")
    .max(90000000, "El dni debe ser menor a 90 millones"),
  phone: Yup.number(),
  email: Yup.string()
    .email("El correo es invalido")
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .required("Este campo es obligatorio")
    .min(8, "Debe tener al menos 8 caracteres")
    .matches(/(?=\w*[A-Z])/, "Debe contener al menos una mayuscula"),
  repeatPassword: Yup.string()
    .required("Este campo es obligatorio")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
});

const Register = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="container px-5 py-5">
      {/* Manera que se rellenan los campos que creamos y que empiezan estando vacios y se llenan con el fomulario */}
      <Formik
        initialValues={{
          name: "",
          id: "",
          phone: "",
          email: "",
          password: "",
          repeatPassword: "",
        }}
        //Validacion
        validationSchema={RegisterSchema}
        //Forma de mandar todo el formulario y obtener los datos
        onSubmit={((values)=>{console.log(values);})}
      >
        {/* Momento en el que se muestren los mensajes de error de las validaciones que hicimos */}
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Nombre completo"
              name="name"
              onChange={handleChange("name")}
              /* onBlur={handleBlur("name")} */
              value={values.name}
              className="form-control"
            />
            {touched.name && errors.name && (
              <p className="error">{errors.name}</p>
            )}
            <br />
            <input
              placeholder="Numero de documento"
              name="id"
              type="number"
              onChange={handleChange("id")}
              /* onBlur={handleBlur("id")} */
              value={values.id}
              className="form-control"
            />
            {touched.id && errors.id && <p className="error">{errors.id}</p>}
            <br />
            <input
              placeholder="Numero de telefono"
              name="phone"
              type="number"
              onChange={handleChange("phone")}
              /* onBlur={handleBlur("phone")} */
              value={values.phone}
              className="form-control"
            />
            {touched.phone && errors.phone && (
              <p className="error">{errors.phone}</p>
            )}
            <br />
            <input
              placeholder="Correo electronico"
              name="email"
              onChange={handleChange("email")}
              /* onBlur={handleBlur("email")} */
              value={values.email}
              className="form-control"
            />
            {touched.email && errors.email && (
              <p className="error">{errors.email}</p>
            )}
            <br />
            <div className="input-group-append">
              <div className="passWithButton">
                <input
                  placeholder="Contraseña"
                  name="password"
                  onChange={handleChange("password")}
                  /* onBlur={handleBlur("password")} */
                  value={values.password}
                  type={visible ? "text" : "password"}
                  className="form-control"
                />
                <button
                  className="btn btn-secondary passButton"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <p>OCultar</p> : <p>Mostrar</p>}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="error">{errors.password}</p>
              )}
              <br />
              <div className="passWithButton">
                <input
                  placeholder="Repetir contraseña"
                  name="repeatPassword"
                  onChange={handleChange("repeatPassword")}
                  /* onBlur={handleBlur("repeatPassword")} */
                  value={values.repeatPassword}
                  type={visible ? "text" : "password"}
                  className="form-control"
                />

                <button
                  className="btn btn-secondary passButton"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <p>OCultar</p> : <p>Mostrar</p>}
                </button>
              </div>
              {touched.repeatPassword && errors.repeatPassword && (
                <p className="error">{errors.repeatPassword}</p>
              )}
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Registrarme</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
