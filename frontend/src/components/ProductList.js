import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };
  console.log("products", products);

  const deleteProduct = async (id) => {
    //calling api
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts(); // to display product after deleting
    }
  };

  //search handle function and api integration
  const searchHandle = async (event) => {
    let key = event.target.value;
    //if value in key keep as it is
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      //if match setproduct to result
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts(); //call getProducts
    }
  };
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        className="search-box"
        type="text"
        placeholder="search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Catogery</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {
        //if there is match for search then  show product else no product
        products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>$ {item.price}</li>
              <li>{item.catogery}</li>
              <li>{item.company}</li>
              <li>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                {/* update link with id */}
                <Link to={"/update/" + item._id}>Update</Link>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Result Found</h1>
        )
      }
    </div>
  );
};

export default ProductList;
