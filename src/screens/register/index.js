import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Este campo es obligatorio"),
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
});
const Register = () => {
  const [visible, setVisible] = useState(false);
  let text = "Mostrar Contraseña";
  return (
    <div className="container  p-3">
      <Formik
        initialValues={{ name: "", id: "", phone: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
      >
        {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
          <>
            <input
              placeholder="Nombre completo"
              name="name"
              onChange={handleChange("name")}
              value={values.name}
              className="form-control"
            />
            {errors.name && <p>{errors.name}</p>}
            <br />
            <input
              placeholder="Numero de documento"
              name="id"
              type="number"
              onChange={handleChange("id")}
              value={values.id}
              className="form-control"
            />
            {errors.id && <p>{errors.id}</p>}
            <br />
            <input
              placeholder="Numero de telefono"
              name="phone"
              type="number"
              onChange={handleChange("phone")}
              value={values.phone}
              className="form-control"
            />
            {errors.phone && <p>{errors.phone}</p>}
            <br />
            <input
              placeholder="Correo electronico"
              name="email"
              onChange={handleChange("email")}
              value={values.email}
              className="form-control"
            />
            {errors.email && <p>{errors.email}</p>}
            <br />
            <div className="input-group-append">

         
            <input
              placeholder="Contraseña"
              name="password"
              onChange={handleChange("password")}
              value={values.password}
              type={visible ? "text" : "password"}
              className="form-control"
            />
           
            <button className="btn btn-secondary " onClick={() => setVisible()}>
              {text}
            </button>
            </div>
            {errors.password && <p>{errors.password}</p>}
            <br />
            <button className="btn btn-primary">Registrarme</button>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Register;
