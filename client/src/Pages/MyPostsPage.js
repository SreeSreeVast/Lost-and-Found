import React, { useState, useContext, useEffect  } from "react";
import { AuthContext } from "../helpers/AuthContext";
import Axios from 'axios';
var REACT_APP_API_URL= 'http://54.221.141.54:3001'
//'54.221.141.54/3001';

function Search(){
	const { setAuthState } = useContext(AuthContext);
    const [searchTerm, setSearch]= useState("");
	const [postList, setPostList]= useState([]);
	
	useEffect(() => {
		Axios.post(`${REACT_APP_API_URL}/Users/userPost`, {searchTerm: searchTerm}).then((response) => {
            //alert("it worked");    
            setPostList(response.data);
		}).catch(() =>{
			alert("it failed");
		})
		
	}, []);
    const searchItem = () => {
		Axios.post(`${REACT_APP_API_URL}/Users/userPost`, {searchTerm: searchTerm}).then((response) => {
            //alert("it worked");    
            setPostList(response.data);
		}).catch(() =>{
			alert("it failed");
		})
	};
	 const removeItem = (data) => {
		Axios.post(`${REACT_APP_API_URL}/Users/removePost`, data).then((response) => {
            //alert("it worked");
            setPostList(response.data);
		}).catch(() =>{
			alert("it failed");
		})
	};


    return (
        <div className="App">
			<h1>Your Posts</h1>

			<div className="PostList">
				<label>Your Posts: </label>
				

			<table>
  				<tr>
    				<th>Title</th>
    				<th>Post ID</th>
  				</tr>

                {postList.map((val,key) => {
                    return (
				<tr>
				<a href = {`${REACT_APP_API_URL}/Post/` + val.IID}><td>{val.Title}</td></a>
					<td><button class="deleteButton" onClick={removeItem(val)}>Remove</button></td>
    				<td>{val.IID}</td>
  				</tr>
                    );
                })}
			</table>


			</div>
		</div>
    );
}

export default Search