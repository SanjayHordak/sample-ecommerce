import React from "react";
import Adminuser from "./adminnav";
import Admingrid from "./adminhome";
export default function Adminhome(){
    return(
        <>
        <Adminuser/>
        <h1 style={{textAlign:"center"}}>WELCOME ADMIN</h1>
        <Admingrid/>
        </>
    )
}