import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import { validationSchema, initialValues } from "./validationSchema";
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        data
      );
      console.log("response", response);

      if (response.status === 200) {
        localStorage.setItem("userId", response?.data?.data?.id);
        navigate("/chat");
      } else {
        throw new Error(`Something went wrong: ${response.status}`);
      }
      setError("");
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        // Handle incorrect credentials error
        setError("Invalid username or password");
      } else {
          // Handle other errors
          console.error('An error occurred:', error.message);
          setError(error.message);
      } 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => <LoginForm {...props} />}
        </Formik>
        {loading && <Loader />}
        {error && <div>Error: {error}</div>}
      </div>
    </Container>
  );
}
