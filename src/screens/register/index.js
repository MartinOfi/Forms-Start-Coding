import React, { useState } from "react";
import { Formik, useFormik } from "formik";
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

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    //Validacion
    validationSchema:  RegisterSchema ,
    //Forma de mandar todo el formulario y obtener los datos
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container px-5 py-5">
      <form onSubmit={formik.handleSubmit}>
        <input
          placeholder="Nombre completo"
          name="name"
          onChange={formik.handleChange}
          /* onBlur={handleBlur("name")} */
          value={formik.values.name}
          className="form-control"
        />
        {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}
        <br />
        <input
          placeholder="Numero de documento"
          name="id"
          type="number"
          onChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.id}
          className="form-control"
        />
        {formik.touched.id && formik.errors.id && <p className="error">{formik.errors.id}</p>}
        <br />
        <input
          placeholder="Numero de telefono"
          name="phone"
          type="number"
          onChange={formik.handleChange}
          /* onBlur={handleBlur("phone")} */
          value={formik.values.phone}
          className="form-control"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="error">{formik.errors.phone}</p>
        )}
        <br />
        <input
          placeholder="Correo electronico"
          name="email"
          onChange={formik.handleChange}
          /* onBlur={handleBlur("email")} */
          value={formik.values.email}
          className="form-control"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}
        <br />
        <div className="input-group-append">
          <div className="passWithButton">
            <input
              placeholder="Contraseña"
              name="password"
              onChange={formik.handleChange}
              /* onBlur={handleBlur("password")} */
              value={formik.values.password}
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
          {formik.touched.password && formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}
          <br />
          <div className="passWithButton">
            <input
              placeholder="Repetir contraseña"
              name="repeatPassword"
              onChange={formik.handleChange}
              /* onBlur={handleBlur("repeatPassword")} */
              value={formik.values.repeatPassword}
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
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <p className="error">{formik.errors.repeatPassword}</p>
          )}
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Registrarme
        </button>
      </form>
    </div>
  );
};

export default Register;
