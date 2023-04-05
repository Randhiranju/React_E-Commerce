/*private component is used for conditional rendering of a component 
for example : product/nav etc component must be visible once user singup
or login*/

import React from "react";
//outlet handles the components passed as props
import {Navigate,Outlet} from 'react-router-dom';

const PrivateComponent=()=>{
    //if there isn't  value in localstorage then it won't let user go to other page except signup
    const auth=localStorage.getItem('user');
    return auth ? <Outlet /> : <Navigate to="/signup" />
}
export default PrivateComponent;