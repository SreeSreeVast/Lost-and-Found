//import './MessagePage.css';
import Axios from 'axios'
import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup' 

const MessagePage = () => {
	const [messageList, setMessageList]= useState([]);
	const [authState, setAuthState] = useState({	
		username: "",	
		id: 0,	
		status: false,	
	  });	
	  useEffect(() => {	
		Axios	
		  .get("http://54.221.141.54:3001/Users/auth", {	
			headers: {	
			  accessToken: localStorage.getItem("accessToken"),	
			},	
		  })	
		  .then((response) => {	
			if (response.data.error) {	
			  setAuthState({ ...authState, status: false });	
			} else {	
			  setAuthState({	
				username: response.data.username,	
				id: response.data.id,
				status: true,	
          });	
        }	
      });	
  }, []);

	const createMessage = (e) => 
	{
		Axios.post('http://54.221.141.54:3001/createMsg', {Sender:authState.id, Receiver: e.Receiver, Subject: e.Subject, Message: e.Message})
		.then((res) => {
			console.log(res.data);

		}).catch((err) =>{
			alert("it failed");
			console.log(err);
		});

	};

	const initialValues = 
	{
		Receiver: "",
		Sender: "",
		Subject: "",
		Message: "",
	};

	const validationSchemaobj = Yup.object().shape(
		{
		Receiver: Yup.number().integer().required(),
		Sender: Yup.number().integer(),
		Subject: Yup.string().required(),
		Message: Yup.string().required()

	})



	return(

		<div className="createPostForm">
		<Formik initialValues = {initialValues} onSubmit = {createMessage} validationSchema = {validationSchemaobj}>

			<Form className="formContainer">

				<label>Receiver: </label>
				<ErrorMessage name="Receiver" component="span"/>
				<Field 
				id="inputMsg" 
				name="Receiver" 
				placeholder="Recipient of Message"
				/>

				<label> Subject: </label>
				<ErrorMessage name="Subject" component="span"/>
				<Field 
				id="inputMsg" 
				name="Subject" 
				placeholder="Subject of message"
				/>

				<label> Message: </label>
				<ErrorMessage name="Message" component="span"/>
				<Field 
				id="inputMsg" 
				name="Message" 
				placeholder="Content of message"
				/>

			<button type = "submit"> Send Message</button>


			</Form>

		</Formik>

	</div>
	);
}

export default MessagePage;