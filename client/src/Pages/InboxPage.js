import React, { useState, useEffect, useContext } from "react";
import Axios from 'axios'
import { AuthContext } from "../helpers/AuthContext";

function InboxPage()
{
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

    const viewMessage = () => 
	{
		Axios.post('http://54.221.141.54:3001/Inbox', {Reciever:authState.id}).then((response) => 
		{
            //alert("it worked");    
			console.log(response.data);
			console.log(authState.id);
            setMessageList(response.data);
			
		}).catch(() =>{
			//alert("it failed");
		})
	};

    return (
        <div className="App">
			<h1>Messages</h1>
            <button class="searchButton" onClick={viewMessage}>Submit</button>

			<table>
  				<tr>
    				<th>Sender</th>
					<th>Subject</th>
    				<th>Message</th>
  				</tr>

                {messageList.map((val,key) => 
				{
                    return (
				

				<tr>
    				<td>{val.Sender}</td>
					<td>{val.Subject}</td>
					<td>{val.Message}</td>
  				</tr>
                    );
                })}
			</table>
		</div>
    );   
}
export default InboxPage;