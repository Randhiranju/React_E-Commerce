import React from "react";
import { Link, useNavigate } from "react-router-dom";
// don't use anchor tag in react
const Nav = () => {
  //if we have auth don't show signup
  const auth = localStorage.getItem("user");
  const Navigate = useNavigate();
  //once logout is clicked clear localstorage and show singup menu
  const logout = () => {
    localStorage.clear();
    Navigate("/signup");
  };

  return (
    <div>
        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0s5ic71wKy7-CMlMg4JK3JOITo79aIq1onS_NbFvlLA&s" alt="logo" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name}) {/*displaying name from localstorage*/}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
