import React, { useEffect} from 'react'; //useEffect hook is used to disable  a link 
//useNavigate hook is used to redirect (here from signup to home page)
import { useNavigate } from 'react-router-dom'
//UseState hook to get values from input boxes
import { useState } from "react";
const SignUp = () => {
  const [name, setName] = useState(""); //default values in useState
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const Navigate= useNavigate();
  // if there is user info in localstorage singup is not required (avoid manual load of signup page)
  useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            Navigate('/')
        }
  },[]);
  // callback function to get data from button
  const collectData = async () => {
    console.log(name, email, password);
    //using fetch module for api integration
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }), //api takes object in json string form
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    //storing data into local storage key is in result.result
    localStorage.setItem("user",JSON.stringify(result));
    //redirecting once we get result to home page
      if(result){
        Navigate('/');
      }
    
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <form className="form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {/* values and setValue function is passed to get values from state hook  */}
        <button onClick={collectData} type="button">
          SignUp
        </button>
      </form>
    </div>
  );
};
export default SignUp;
