import React from "react";
import { useNavigate } from 'react-router-dom'
import { Outlet, Link } from "react-router-dom"; 

// NOT USED ANYMORE
// LEFT IN JUST INCASE HNN

function NavBar(){

    const navigate = useNavigate();


    function NavToHome(element){
        console.log(element)
        navigate(`/Home`);
      };
    function NavToPost(element){
        console.log(element)

        navigate(`/CreatePost`);
      };
    function NavToSearch(element){
        console.log(element)

        navigate(`/Search`);
    };

    function NavToMessage(element){
        console.log(element)

        navigate(`/Message`);
    };

    return(
        <div className = "navigationbar">
            <h1>Lost and Found Navigation Bar</h1>

            <nav>
            <button onClick={NavToHome}>Home</button>
            <button onClick={NavToPost}>Post</button>
            <button onClick={NavToSearch}>Search</button>
            <button onClick={NavToMessage}>Message</button>

            </nav>
            <hr />
            <Outlet />
        </div>

    );
}

export default NavBar;
