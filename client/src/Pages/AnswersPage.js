import React, { useState, useEffect, useContext } from "react";
import Axios from 'axios'

function AnswersPage()
{
    const [answersList, setAnswersList]= useState([]);

	const viewAnswers = () => 
	{
		Axios.post('http://54.221.141.54:3001/AnswersPage').then((response) => 
		{
            //alert("it worked");    
			console.log(response.data);
            setAnswersList(response.data);
			
		}).catch(() =>{
			//alert("it failed");
		})
	};

    return (
        <div className="App">
			<h1>Answers</h1>
            <button class="searchButton" onClick={viewAnswers}>Submit</button>

			<table>
  				<tr>
    				<th>Answer</th>
  				</tr>

                {answersList.map((val,key) => 
				{
                    return (
				

				<tr>
					<td>{val.Answer}</td>
  				</tr>
                    );
                })}
			</table>
		</div>
    );   

			}

export default AnswersPage;