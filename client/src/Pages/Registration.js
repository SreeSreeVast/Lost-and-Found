import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import * as Yup from "yup";
import axios from "axios";
var REACT_APP_API_URL= 'http://54.221.141.54:3001'
//'http://54.221.141.54/3001';

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post(`${REACT_APP_API_URL}/Users/signup`, data).then((res) => {
	console.log("recieved new user");
    console.log(data);

    });
  };
  /*const { setAuthState } = useContext(AuthContext);
  let navigate  = useNavigate();
  function login(data) {
    
    axios.post(`${REACT_APP_API_URL}/signin`, data).then((res) => {
		console.log("attempting to login");
      if (res.data.error) {
        alert(res.data.error);
      } else {
        localStorage.setItem("accessToken", res.data.token);
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };*/

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Username"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
