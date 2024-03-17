
"use client";
import Link from "next/link";
import React ,{useEffect} from "react";
import {useRouter}  from "next/navigation";
import axios  from "axios";
import { NextResponse } from "next/server";
import {toast} from "react-hot-toast";


export default function loginPage()
{
    const router = useRouter();
    const [user , setUser] = React.useState({
        email : "",
        password : ""
    })
    const [buttonDisabled , setButtonDisabled] = React.useState(false);
    const [loading , setLoading] = React.useState(false);
    const onlogin= async() =>{
        console.log("on click is clciked");
        try{
            setLoading(true);

            const  response = await axios.post("/api/users/login", user);
            console.log("login successful" , response.data);
            toast.success("login successful")
            router.push("/profile");

            }
            catch(error : any)
            {
                console.log("login failed", error.message);
                 toast.error(error.message);
            }
            finally{
                setLoading(false);
            }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0)
        setButtonDisabled(false);
        else
        setButtonDisabled(true);
    } , [user])
    return (
        <div className="  flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="text-4xl bg-yellow-300  rounded-lg font-mono backdrop-blur-md">{loading?"":"Login"}</h1>

            <hr />

           

            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600" type="text" id="email" value = {user.email} onChange={(e)=>setUser({...user , email : e.target.value})}  placeholder="Type your email"/>

            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600" type="text" id="password" value = {user.password} onChange={(e)=>setUser({...user , password : e.target.value})}  placeholder="Type your Name"/>

            <button onClick={onlogin} className=" backdrop-blur-xl bg-white p-2 border border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled?"Please Enter data":"Sign In"}</button>

            <Link href="/signup">Want to see Sign Up page?</Link>
           
    
        </div>
    )
}