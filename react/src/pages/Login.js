import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import "../style/Login.css";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onSubmit = (values) => {
    fetch("http://localhost:5500/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
    }).then((resultat) => {
      if (resultat.status === 200) {
        resultat.json().then((res) => {
          setUser(res);
          navigate("/todo");
        });
      } else if (resultat.status >= 500) {
        toast("Erreur Serveur");
      } else {
        resultat.json().then((res) => {
          toast(res.message);
        });
      }
    });
  };
  return (
    <div className="login">
      <h1>Connexion</h1>
      <Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
        <Form className="auth-form">
          <label for="email">
            Adresse mail :
            <Field name="email" type="email" placeholder="email" />
          </label>
          <label for="password">
            Mot de passe :
            <Field name="password" type="password" placeholder="password" />
          </label>
          <button type="submit">Valider</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
