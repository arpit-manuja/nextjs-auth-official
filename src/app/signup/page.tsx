
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter}  from "next/navigation";
import axios  from "axios";
import {toast} from "react-hot-toast";


export default function signupPage()
{
    const router = useRouter();
    const [user , setUser] = React.useState({
        email : "",
        password : "",
        username : ""
    })
    const [buttonDisabled , setButtonDisabled] = React.useState(false);


    useEffect(()=>{
        if(user.password.length > 0 && user.username.length > 0 && user.email.length > 0)
        setButtonDisabled(false);
        else
        setButtonDisabled(true);
    } , [user])

    const [loading  ,  setLoading] = React.useState(false);
    const onsignup = async() =>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("signup successful" , response.data);
            router.push("/login");
        }
        catch(error : any)
        {
            console.log("signup failed", error.message);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <div className="  flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="text-4xl bg-yellow-300  rounded-lg font-mono backdrop-blur-md">Signup Page</h1>

            <hr />

            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600" type="text" id="username" value = {user.username} onChange={(e)=>setUser({...user , username : e.target.value})}  placeholder="Type your Name"/>

            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600" type="text" id="email" value = {user.email} onChange={(e)=>setUser({...user , email : e.target.value})}  placeholder="Type your email"/>

            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600" type="text" id="password" value = {user.password} onChange={(e)=>setUser({...user , password : e.target.value})}  placeholder="Type your Name"/>

            <button onClick={onsignup} className=" bg-white p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600  backdrop-blur-sm">{buttonDisabled ? "Please Enter Details" : "Sign Up"}</button>

            <Link href="/login">Want To See Login Page?</Link>
    
        </div>
    )
}

