'use client'
import { createContext, useState } from "react";
export const Appcontext=createContext();
function Appcontextcreator({children}){
  const prevuser=typeof window !== 'undefined' && localStorage.getItem('seller') ? JSON.parse(localStorage.getItem('seller')) : null;
  const prevtoken=typeof window !== 'undefined' && localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
  const [showLogin,setshowLogin]=useState(false);
  const [user,setuser]=useState(prevuser);
  const [token,settoken]=useState(prevtoken);
  const [editmode,seteditmode]=useState(false);
  const [product,setproduct]=useState(null);
  const setmyuser=(user)=>{
    setuser(user);
    typeof window !== 'undefined' && localStorage.setItem('seller', JSON.stringify(user));
  }
  const setmytoken=(token)=>{
    settoken(token);
    typeof window !== 'undefined' && localStorage.setItem('token', JSON.stringify(token));
  }
  const value={
    showLogin,
    setshowLogin,
    token,
    setmytoken,
    user,
    setmyuser,
    editmode,
    seteditmode,
    product,
    setproduct
  }
  return (
    <Appcontext.Provider value={value}>
           {children}
    </Appcontext.Provider>
  )
}

export default Appcontextcreator;