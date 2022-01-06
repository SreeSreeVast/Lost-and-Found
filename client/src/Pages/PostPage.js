import './PostPage.css';
import React, { useState } from "react";
import Axios from 'axios'
// Allows creation of forms without using traditional HTML tags (MUCH FASTER)
// Handles all the tedious part of form validation
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup' // import everything from yup form validation library

import { useNavigate } from 'react-router-dom'

// Get userID 
import {useEffect} from "react";


const PostPage = () => {
	
	const [authState, setAuthState] = useState({	
		username: "",	
		id: 0,	
		status: false,	
	  });	

	  // get userid once at start of page
	  useEffect(() => {	
		Axios	
		// Local debug http://localhost:3001
		// http://54.221.141.54:3001
		  .get("http://54.221.141.54:3001/Users/auth", {headers: {accessToken: localStorage.getItem("accessToken"),	}, })	
		  .then((response) => {	
			if (response.data.error) {	
			  setAuthState({ ...authState, status: false });	
			} else {	
			  setAuthState({	
				username: response.data.username,	
				id: response.data.id,
				status: true,});	
        		}	
      		});	
  		}, []);	

	const [newPost, setNewPost] = useState(
		{
				//Title: '',
				//Description: '',
				//Location: '',
				//Question1: '',
				//Answer1: '',
				Photo: '',
		}
	);

	const [SelectPhotoType, setSelectPhotoType] = useState(false);
	const [UseClipArt, setUseClipArt] = useState(false);

	

	const navigate = useNavigate();

	const [file, setFile] = React.useState(null)

	const createPost = (e) => {
		//let FoundItem; // Debug HNN
		const formData = new FormData();

		if (e.checked) {
			formData.append("FoundItem", 0);
			//FoundItem = false;
		}else {
			formData.append("FoundItem", 1);
			//FoundItem = true;
		}

		//debug printouts
		console.log(e);
		console.log(e.clipart);
		//e.preventDefault();
		formData.append("Title", e.Title);
		formData.append("Description", e.Description);
		formData.append("Country", e.Country);
		formData.append("Region", e.Region);
		formData.append("Area", e.Area);
		formData.append("Question1",e.Question1);
		formData.append("Answer1", e.Answer1);
		formData.append("FinderID", authState.id);
		formData.append("Tags", e.Tags);


		if (!SelectPhotoType){
			formData.append("Photo", "defaultphoto.jpg");

			Axios.post('http://54.221.141.54:3001/createPostsNoImage', 	
			{FoundItem: formData.FoundItem, Title: e.Title, Description: e.Description, 
				Country: e.Country, Region: e.Region, Area: e.Area, Question1: e.Question1,
			Answer1: e.Answer1, FinderID: authState.id, Tags: e.Tags, Photo: "defaultphoto.jpg"}
			)
			.then((res) => {
				navigate("/Post/" + res.data.IID);

			}).catch((err) =>{
				alert("posting failed");
				console.log(err);
			});
		}
		else{
			//user selected photo type

			if(UseClipArt && typeof e.clipart !== 'undefined'){
				// user selected a clip art
				formData.append("Photo", e.clipart);
				Axios.post('http://54.221.141.54:3001/createPostsNoImage', 	{FoundItem: formData.FoundItem, Title: e.Title, Description: e.Description, 
				Country: e.Country, Region: e.Region, Area: e.Area, Question1: e.Question1,
			Answer1: e.Answer1, FinderID: authState.id, Tags: e.Tags, Photo: e.clipart[0]})
				.then((res) => {
					navigate("/Post/" + res.data.IID);
	
				}).catch((err) =>{
					alert("posting failed");
					console.log(err);
				});
			} else if (file){
				// User uploads own photo
				formData.append("Photo",newPost.Photo);
				// AWS route
				// 	Axios.post('http://54.221.141.54:3001/viewItem', {ID: id}).then((res) => {
				// Local testing http://localhost:3001/viewItem
				Axios.post('http://54.221.141.54:3001/createPosts', formData)
				.then((res) => {
					//console.log(res.data);
					//console.log("ID IS:" + res.data.IID);
					navigate("/Post/" + res.data.IID);
	
				}).catch((err) =>{
					alert("it failed");
					console.log(err);
				});
			} else {

				// User has no photo or no clipart selected. Upload with default image anyways.
				formData.append("Photo", "defaultphoto");

				Axios.post('http://54.221.141.54:3001/createPostsNoImage', 	{FoundItem: formData.FoundItem, Title: e.Title, Description: e.Description, 
				Country: e.Country, Region: e.Region, Area: e.Area, Question1: e.Question1,
			Answer1: e.Answer1, FinderID: authState.id, Tags: e.Tags, Photo: "defaultphoto.jpg"})
				.then((res) => {
					navigate("/Post/" + res.data.IID);
	
				}).catch((err) =>{
					alert("posting failed");
					console.log(err);
				});
			}
		}


		// Legacy stuff, let in just incase HNN
		/*
		if (file){
			formData.append('Photo',newPost.Photo);
			// AWS route
			// 	Axios.post('http://54.221.141.54:3001/viewItem', {ID: id}).then((res) => {
			// Local testing http://localhost:3001/viewItem
			Axios.post('http://localhost:3001/createPosts', formData)
			.then((res) => {
				//console.log(res.data);
				//console.log("ID IS:" + res.data.IID);
				navigate("/Post/" + res.data.IID);

			}).catch((err) =>{
				alert("it failed");
				console.log(err);
			});
		}
		else{
			alert("TEST");
		}
		*/
		/*
		// AWS route
    	// 	Axios.post('http://54.221.141.54:3001/viewItem', {ID: id}).then((res) => {
    	// Local testing http://localhost:3001/viewItem
		Axios.post('http://localhost:3001/createPosts', formData)
		.then((res) => {
			//console.log(res.data);
			//console.log("ID IS:" + res.data.IID);
			navigate("/Post/" + res.data.IID);

		}).catch((err) =>{
			alert("it failed");
			console.log(err);
		});
		*/


	}

	
	const handleChange = (e) =>{
		setNewPost({...newPost, [e.target.name]: e.target.value});
	}
	

	const handlePhoto = (e) => {
		setNewPost({...newPost, Photo: e.target.files[0]});
		console.log(e.target.files[0]);
		setFile(e.target.files[0])
	}

	const initialValues = {
		Title: "",
		Description: "",
		Question1: "",
		Answer1: "",
		Country: "",
		Region: "",
		Area: "",
		Tags: "",
	}

	const validationSchemaobj = Yup.object().shape({
		Title: Yup.string().required(),
		Description: Yup.string(),
		Country: Yup.string(),
		Region: Yup.string(),
		Area: Yup.string(),
		Question1: Yup.string(),
		Answer1: Yup.string(),

		//min().max() to set min and max length
	})
	
	return(
		<div className="createPostForm">
			<Formik initialValues = {initialValues} onSubmit = {createPost} validationSchema = {validationSchemaobj}>

				<Form className="formContainer">
					<label>Title: </label>
					<ErrorMessage name="Title" component="span"/>
					<Field 
					id="inputPost" 
					name="Title" 
					placeholder="Title"
					/>

					<label> Description of the item: </label>
					<ErrorMessage name="Description" component="span"/>
					<Field 
					id="inputPost" 
					name="Description" 
					placeholder="Description of item"
					/>

					<label> Location (Country): </label>
					<ErrorMessage name="Location" component="span"/>
					<Field 
					id="inputPost" 
					name="Country" 
					placeholder="Location of item"
					/>

					<label> Location (Region): </label>
					<ErrorMessage name="Location" component="span"/>
					<Field 
					id="inputPost" 
					name="Region" 
					placeholder="Location of item"
					/>

					<label> Location (Area): </label>
					<ErrorMessage name="Location" component="span"/>
					<Field 
					id="inputPost" 
					name="Area" 
					placeholder="Area of item"
					/>

					<label> Question to ask owner: </label>
					<ErrorMessage name="Question1" component="span"/>
					<Field 
					id="inputPost" 
					name="Question1" 
					placeholder="Enter a question only the owner would know"
					/>

					<label> Correct answer from owner: </label>
					<ErrorMessage name="Answer1" component="span"/>
					<Field 
					id="inputPost" 
					name="Answer1" 
					placeholder="Correct answer to the question"
					/>

					<div id="checkbox-group">Post Type</div>
					<div role="group" aria-labelledby="checkbox-group">
						<label>
						<Field type="checkbox" name="checked" value="lost" />
						Lost this item?
						</label>
					</div>


					<label> Search Tags: </label>
					<ErrorMessage name="Tags" component="span"/>
					<Field 
					id="inputPost" 
					name="Tags" 
					placeholder="Search tags to help with searching"
					/>

				{
				(SelectPhotoType)?
				((!UseClipArt)?				
				// User selected to upload photo
				<div>
					<input
					type = 'file'
					accept = '.png, .jpg, .jpeg'
					name = 'Photo'
					onChange = {handlePhoto}
					/>

					<img className = "imgupload" src={file? URL.createObjectURL(file) : "/defaultphoto.jpg"} alt={file? file.name : null}/>
				</div>:

				// User selected to use clip art.
				<div>
					<div id="checkbox-group">Post Type</div>
					<div role="group" aria-labelledby="checkbox-group">
						<label>
						<img id = "clipArt" src={"/clipart/wallet.png"} />
						<Field type="checkbox" name="clipart" value="wallet.png" />
						Wallet
						</label>

						<label>
						<img id = "clipArt" src={"/clipart/card.png"} />
              			<Field type="checkbox" name="clipart" value="card.png" />
              			Card
            			</label>

						<label>
						<img id = "clipArt" src={"/clipart/jewelry.png"} />
              			<Field type="checkbox" name="clipart" value="jewelry.png" />
              			jewelry
            			</label>

						<label>
						<img id = "clipArt" src={"/clipart/electronics.png"} />
              			<Field type="checkbox" name="clipart" value="electronic.png" />
              			Electronic
            			</label>
					</div>

				</div>
				): 
				// User has not selected the type of image
				<div>
					<p>Select type of Image</p>
					
					<button type = "button" onClick={()=>{
						console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
						setSelectPhotoType(true);
						setUseClipArt(false);
						console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
					}}>Upload Image</button>

					<button type = "button" onClick={()=>{
						console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
						setSelectPhotoType(true);
						setUseClipArt(true);
						console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
					}}>Use clip art</button>
				</div>
				}

				<br />
				<br />
				<button type = "submit"> Create Post</button>

				</Form>


			</Formik>

		</div>

		/*
		<form class = "form-control" classname = "Post" onSubmit = {createPost} encType = 'multipart/form-data'>

		<label> Title: </label>
		<input
			type = "text"
			placeholder = "Title of Post"
			name = "Title"
			value = {newPost.Title}
			onChange = {handleChange}
		/>

		<label> Description of the item: </label>
		<input
			type = "text"
			placeholder = "Description of found item"
			name = "Description"
			value = {newPost.Description}
			onChange = {handleChange}
		/>

		<label> Location of item: </label>
		<input
			type = "text"
			placeholder = "Location of found item"
			name = "Location"
			value = {newPost.Location}
			onChange = {handleChange}
		/>

		<label> Question to ask owner: </label>
		<input
			type = "text"
			placeholder = "Enter a question only the owner would know"
			name = "Question1"
			value = {newPost.Question1}
			onChange = {handleChange}
		/>

		<label> Correct answer from owner: </label>
		<input
			type = "text"
			placeholder = "Enter the answer to the security question"
			name = "Answer1"
			value = {newPost.Answer1}
			onChange = {handleChange}
		/>

		<input
			type = 'file'
			accept = '.png, .jpg, .jpeg'
			name = 'Photo'
			onChange = {handlePhoto}

		/>

		<img class = "imgupload" src={file? URL.createObjectURL(file) : null} alt={file? file.name : null}/>


		<input 
                type="submit"
        />

		</form>
		*/

	);
}

export default PostPage;
