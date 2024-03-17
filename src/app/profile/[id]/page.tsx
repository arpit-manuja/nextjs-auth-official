
"use client"
export default function userProfile({params}:any){
    return (
        <div className=" bg-black-500  flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl bg-yellow-200 m-5 text-black ">Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page  
            
                <span className="p-2 ml-5 rounded bg-yellow-500 text-black"> {params.id} </span>
            
             </p>
        </div>
    )
}