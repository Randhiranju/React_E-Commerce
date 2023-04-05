import React from "react";

const AddProduct = () =>{

    //data collection use hook
    const[name,setName]=React.useState('');
    const[price,setPrice]=React.useState('');
    const[catogery,setCatogery]=React.useState('');
    const[company,setCompany]=React.useState('');
    //api Integration
    const addProduct= async()=>{
        console.warn(name,price,catogery,company);
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result=fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,catogery,company,userId}),
            headers:{
                "content-Type":"application/json"
            }
        });
        result=await result.json();
        console.warn(result);
    }
    return(
        <div className="product">
            <h1>Add Product</h1>
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
    
                <button onClick={addProduct}>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;