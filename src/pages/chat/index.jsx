import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import axios from "axios";
import { Formik } from "formik";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import useStyles from "./chatStyle";
import { validationSchema, initialValues } from "./validationSchema";
import LoginForm from "./ChatForm";
import Loader from "../../components/Loader";

export default function Home() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const socket = io("http://localhost:3001");

  useEffect(() => {
    if(!localStorage.getItem("userId")){
      navigate("/");
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  // Listen for "message_receive" event
  useEffect(()=> {
    socket.on("message_receive", (data) => {
      setData((prevData) => [data, ...prevData]);
    });

    // Clean up event listener when component unmounts
    return () => {
      socket.off("message_receive");
    };
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/chat/messages`);
      const responseData = response?.data?.data;
  
      if (response.status === 200) {
        setData(responseData);
      } else if (response.status === 204) {
        setData([]);
      } else {
        throw new Error(`Something went wrong: ${response.status}`);
      }
      setError("");
    } catch (error) {
      setError(error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);


  const onSubmit = async (data, actions) => {
    try {
      const payload =   {
        message: data.message,
        senderId: localStorage.getItem("userId"),
      };
      socket.emit("message", payload);
      actions.resetForm();
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => <LoginForm {...props} />}
        </Formik>
        <div className={classes.chatMessages}>
         {renderMessages({loading, error, data})}
        </div>
        
      </div>
    </Container>
  );
}

const renderMessages = ({loading, error, data}) => {
 
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data && !data.length) {
    return <div>No data found.</div>;
  }
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item.message}</li>
      ))}
    </ul>
  );
};
