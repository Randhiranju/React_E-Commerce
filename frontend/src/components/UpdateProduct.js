import React, { useEffect } from "react";
// import get param hook
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () =>{

    //data collection use hook
    const[name,setName]=React.useState('');
    const[price,setPrice]=React.useState('');
    const[catogery,setCatogery]=React.useState('');
    const[company,setCompany]=React.useState('');
    const params= useParams();
    const navigate= useNavigate();// to redirect to product page after updation
    useEffect(()=>{
        getProductDetails();
    },[]) // array is used for calling once 

    //api Integration for getting data of clicked product
    const getProductDetails= async ()=>{
        console.warn(params);
        let result=await fetch(`http://localhost:5000/product/${params.id}`);
        result= await result.json();
        // prefilling the data 
         setName(result.name);
         setPrice(result.price);
         setCatogery(result.catogery);
         setCompany(result.company);
    }
    
    // Integrating update api
    const updateProduct=async ()=>{
        let result= await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body:JSON.stringify({name,price,catogery,company}),
            headers:{
                'Content-Type':"application/json"
            }
        });
        result=await result.json();
        navigate("/");
    }
    return(
        <div className="product">
            <h1>Update Product</h1>
            <form className="form">
                <input type="text" placeholder="Enter Product Name" 
                onChange={(e)=>{setName(e.target.value)}} value={name}
                />
                <input type="text" placeholder="Enter Product Price"
                onChange={(e)=>{setPrice(e.target.value)}} value={price}
                />
                
                <input type="text" placeholder="Enter Product Catogery" 
                onChange={(e)=>{setCatogery(e.target.value)}} value={catogery}
                />
                
                <input type="text" placeholder="Enter Product Company" 
                onChange={(e)=>{setCompany(e.target.value)}} value={company}
                />
    
                <button onClick={updateProduct}>Update Product</button>
            </form>
        </div>
    )
}

export default UpdateProduct;