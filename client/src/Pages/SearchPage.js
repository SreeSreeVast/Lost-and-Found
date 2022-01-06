import { useState } from "react";
import Axios from 'axios'

function Search(){
    const [searchTerm, setSearch]= useState("");
    const [searchCountry, setCountry]= useState("");
    const [searchCity, setCity]= useState("");
    const [postList, setPostList]= useState([]);

	// AWS route
    // 	Axios.post('http://54.221.141.54:3001/viewItem', {ID: id}).then((res) => {
    // Local testing http://localhost:3001/
    const searchItem = () => {
		Axios.post('http://54.221.141.54:3001/searchPosts', {searchTerm: searchTerm, searchCountry: searchCountry, searchCity: searchCity}).then((response) => {
            //alert("it worked");    
			console.log(response.data);
            setPostList(response.data);
		}).catch(() =>{
			//alert("it failed");
		})
	};


    return (
        <div className="App">
			<h1>Search Items</h1>
                        <h3>Fill In All Criteria</h3>


			<div className="SearchForm">
				<label>Country: </label>
				<input type="text" name="searchCountry" placeholder = "abbreviated..." onChange = {(event) => {
					setCountry(event.target.value)

				}}
				required/>		
				<label>Region: </label>
				<input type="text" name="searchCity" placeholder = "region..." onChange = {(event) => {
					setCity(event.target.value)

				}}
				required/>		
				<br></br>
				<br></br>
				<label>Items</label>
				<br></br>
				<label>Search: </label>
				<input type="text" name="searchTerm" placeholder="item keyword, tags..." onChange = {(event) => {
					setSearch(event.target.value)

				}}
				required/>

				<button class="searchButton" onClick={searchItem}>Search</button>

			<table>
  				<tr>
    				<th>Title</th>
    				<th>Post #</th>
					<th>Location</th>
  				</tr>


                {postList.map((val,key) => {
                    return (
				<tr>
    				<a href = {"http://54.221.141.54:3000/Post/" + val.IID}><td>{val.Title}</td> </a>
    				<td>{val.IID}</td>
					<td>{val.Area}</td>
  				</tr>
                    );
                })}
			</table>
			</div>
		</div>
    );
}

export default Search