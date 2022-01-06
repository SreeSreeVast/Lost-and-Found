import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import PostPage from './Pages/PostPage';
import NavBar from './Pages/NavBar'
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import MessagePage from './Pages/MessagePage';
import ViewPost from './Pages/ViewPost';
import Inbox from './Pages/InboxPage';
import Registration from "./Pages/Registration";	
import Login from "./Pages/Login";	
import MyPosts from "./Pages/MyPostsPage";
import AnswersPage from './Pages/AnswersPage';
import { useNavigate } from "react-router-dom";	
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";	
import axios from "axios";


function App() {

	const [authState, setAuthState] = useState({	
		username: "",	
		id: 0,	
		status: false,	
	  });	
	  useEffect(() => {	
		axios	
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
  const logout = () => {	
    localStorage.removeItem("accessToken");	
    setAuthState({ username: "", id: 0, status: false });	
		
  };


	// Note in react-router-dom v6, switches are now simply called "Routes" HNN
  	return (
		<div className="App">
		<AuthContext.Provider value={{ authState, setAuthState }}>
		  <BrowserRouter>
			<div className="navbar">
			  <div className="links">
				{!authState.status ? (
				  <>
					<Link to="/"> Home</Link>
					<Link to="/login"> Login</Link>
					<Link to="/registration"> Registration</Link>
					<Link to="/Search"> Search</Link>
				  </>
				) : (
				  <>
					<Link to="/"> Home</Link>
					<Link to="/Search"> Search</Link>
					<Link to="/CreatePost"> Create A Post</Link>
					<Link to="/Message"> Messages</Link>
				  	<Link to="/Inbox"> Inbox</Link>
					<Link to="/MyPosts"> My Posts</Link>
					<Link to="/AnswersPage"> Answers</Link>
					

				  </>
				)}
			  </div>
			  <div className="loggedInContainer">
				<h1>{authState.username} </h1>
				{authState.status && <button onClick={logout}> Logout</button>}
			  </div>
			</div>
			<Routes>
			  <Route path="/" element={<HomePage />} />
			  <Route path="registration" element={<Registration />} />
			  <Route path="login" element={<Login/>} />
			  <Route path="CreatePost" element={<PostPage />}/>
			  <Route path="Post/:id" element={<ViewPost />}/>
			  <Route path="Message" element={<MessagePage />}/>
			  <Route path="Search" element={<SearchPage />}/>
			  <Route path="MyPosts" element={<MyPosts />}/>
			  <Route path="Inbox" element={<Inbox />}/>
			  <Route path="AnswersPage" element={<AnswersPage />}/>

			  
  
			  
  
			</Routes>
		  </BrowserRouter>
		</AuthContext.Provider>
	  </div>
  

  	);

}

export default App;
