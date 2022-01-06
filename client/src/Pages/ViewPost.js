   import React, { useState } from "react";
    import { useParams } from 'react-router-dom'
    import Axios from 'axios'
    import { Formik, Form, Field, ErrorMessage } from "formik"
    import * as Yup from 'yup' // import everything from yup form validation library
    // Run the query function once.

    import {useEffect} from "react";
    function ViewPost(){
        let {id} = useParams()
        const [Post, setPost]= useState([]);

        useEffect(() => {
            getPost(id)
        }, []);

        const createAnswer = (e) => 
        {
            Axios.post('http://54.221.141.54:3001/createAnswer', {Answer: e.Answer}).
            then((res) => 
            {
                console.log(res.data);
    
                }).catch((err) =>
                
                {
                    alert("it failed");
                    console.log(err);
                });
            }
        

        var Imgdirectory = "../server/images"

        const getPost = (postid) => {
            Axios.post('http://54.221.141.54:3001/viewPosts', {ID: postid}).then((res) => {
                console.log(res.data);
                setPost(res.data);
            }).catch(() =>{
                console.log("it failed");
            })
        };

        const initialValues = {
            Answer: "",
        }

        const validationSchemaobj = Yup.object().shape(
            {
            Answer: Yup.string().required(),
        })



        return(        
            <div className = "Post">
                <div className="Title">
                    <label>Title: </label> 
                    {Post.Title}
                </div>

                <div className="Location">
                    <label>Location: </label> 
                    {Post.Location}
                </div>

                <div className="Description">
                    <label>Description: </label> 
                    {Post.Description}
                </div>

                <div className="TimePosted">
                    <label>Posted on: </label> 
                    {Post.createdAt}
                </div>

                <div className="Question">
                    <label>Question: </label> 
                    {Post.Question1}
                </div>

                <div className="AnswerBox">
                    <label>Verification Question Answer:</label>
                </div>

                <div className="Image">
                    <img src={process.env.PUBLIC_URL + "/userimages/" + Post.ImageName} alt="User Image" />
                </div>

                <Formik initialValues = {initialValues} onSubmit = {createAnswer} validationSchema = {validationSchemaobj}>

                    <Form className="formContainer">
                        <label>Answer: </label>
                        <ErrorMessage name="Title" component="span"/>
                        <Field 
                        id="inputPost" 
                        name="Answer" 
                        placeholder="Enter the answer to the security question."
                        />

                        <button type = "submit"> Send Message</button>
                    </Form>
                </Formik>   
            </div>
        );

    }

    export default ViewPost