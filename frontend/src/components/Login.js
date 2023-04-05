import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {

    const [email,setEmail]= React.useState('');
    const [password,setPassword]= React.useState('');
    const navigate= useNavigate();

    //avoid manual load of login page ex: localhost:5000/login
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate("/");
        }
    },[])
    const handleLogin= async ()=>{
        console.log(email,password);
        // api integration
        let result= await fetch('http://localhost:5000/login', {
            method:'post',
            body: JSON.stringify({email,password}),
            headers: {
                "Content-Type": "application/json",
              },
        });
        result = await result.json();
        console.warn(result);
        // if authtoken is received 
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/");
        }else{
            alert("please Enter correct account");
        }
    }
  return (
    <div className="login">
      <form className="form">
        <input
          type="text"
          placeholder="Enter Email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          placeholder="Enter password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />

        {/* values and setValue function is passed to get values from state hook  */}
        <button onClick={handleLogin} type="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
