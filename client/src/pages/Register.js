import React from "react";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import "../style/Register.css";
import Home from "../pages/Home";

function Register() {
  const onSubmit = (values) => {
    const frm = document.getElementsByName("register-form")[0];
    fetch("https://trackaction.herokuapp.com/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
    }).then((resultat) => {
      if (resultat.status === 200) {
        console.log(resultat);
        alert("Votre compte à bien été crée.");
        frm.reset();
        resultat.json().then((res) => {
          console.log(res);
        });
      } else if (resultat.status >= 500) {
        console.log(resultat);
        toast("Erreur Serveur");
      } else {
        resultat.json().then((res) => {
          toast(res.message);
        });
      }
    });
  };
  return (
    <>
      <Home />
      <div className="register">
        <h1>Créer un compte</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            password: "",
            email: "",
          }}
          onSubmit={onSubmit}
        >
          <Form name="register-form">
            <div className="field">
              <Field name="firstName" type="text" placeholder="Nom" />
              <Field name="lastName" type="text" placeholder="Prenom" />
              <Field name="email" type="email" placeholder="Mail" />
              <Field
                name="password"
                type="password"
                placeholder="Mot de passe"
              />
            </div>
            <div className="btn">
              <button type="submit">Inscription</button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Register;
