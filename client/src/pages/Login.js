import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import Home from "../pages/Home";
import axios from "axios";
import "../style/Login.css";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const instance = axios.create({
    baseURL: "https://trackaction.herokuapp.com",
  });

  let refreshToken;

  const onSubmit = (values) => {
    fetch("https://trackaction.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
    }).then((resultat) => {
      if (resultat.status === 200) {
        resultat.json().then((res) => {
          instance.defaults.headers.common[
            "authorization"
          ] = `Bearer ${res.auth.accessToken}`;
          refreshToken = res.auth.refreshToken;
          loadUserInfos();
          setUser(res.auth.user.email);
          localStorage.setItem("user", res.auth.user.email);
          navigate("/habits");
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

  const loadUserInfos = () => {
    instance
      .get("/me")
      .then((response) => {
        //console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.config.url !== "/refreshToken" &&
        error.response.status === 401 &&
        originalRequest._retry !== true
      ) {
        originalRequest._retry = true;
        if (refreshToken && refreshToken !== "") {
          instance.headers.common["authorization"] = `Bearer ${refreshToken}`;
          console.log("refreesh token");
          await instance
            .post("/refreshToken")
            .then((response) => {
              instance.headers.common[
                "authorization"
              ] = `Bearer ${response.auth.accessToken}`;
              originalRequest.headers[
                "authorization"
              ] = `Bearer ${response.auth.accessToken}`;
            })
            .catch((error) => {
              console.log(error);
              refreshToken = null;
            });
          return instance(originalRequest);
        }
      }
    }
  );

  return (
    <>
      <Home />
      <div className="login">
        <h1>Connexion</h1>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
          <Form className="auth-form">
            <div className="field">
              <Field name="email" type="email" placeholder="Adresse mail" />
              <Field
                name="password"
                type="password"
                placeholder="Mot de passe"
              />
            </div>
            <div>
              <button type="submit">Connexion</button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Login;
