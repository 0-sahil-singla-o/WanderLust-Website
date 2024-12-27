import { useState,useEffect } from "react"

export default function Homepage(){
    const [count,setCount]= useState(1); 
    useEffect(()=>{
        fetch("http://localhost:4000/api",{
            method:"GET",
            credentials:"include"
        })
        .then((response)=>{
            if(response.ok){
                response.json()
                .then((result)=>{
                    setCount(result.data);
                })
            }
        })
    },[])
    return (
        <>
        <div className="h-[100vh]">
            <h1 className="h-[100vh]">Your Count is :- {count}</h1>
        </div>  
        </>
    )
}