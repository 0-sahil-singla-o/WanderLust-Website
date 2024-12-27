import { useFormik } from "formik"
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "../MainProvider";
import google from "../../assets/google.png";
export default function Login(){
    const {login} = useContext(MainContext);
    const navigate= useNavigate();
    function toSignup(){
        navigate("/signup");
    }
    const initialValues={
        email:"",
        password:"",
    }
    
    const validations= yup.object({
       email:yup.string().required("email field is required"),
       password:yup.string().required("password field is required")
    })
    
    const formik= useFormik({
        initialValues:initialValues,
        validationSchema:validations,
        onSubmit: (values)=>{
            console.log(values)
            fetch("https://wanderlust-website-md7k.onrender.com/api/onabording/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values),
                credentials:"include"
            })
            .then((response)=>{
                  if(response.ok){
                      navigate("/dashbord");
                      login()
                      window.location.reload();
                  }
                  else{
                      response.json()
                      .then((error)=>{
                          console.log(error.message.msg);
                      })
                  }
            })
            
        }
    })
    function SignInGoogle(){
        fetch("https://wanderlust-website-md7k.onrender.com/api/onabording/login/google",{
            method:"GET",
            credentials:"include"
        })
       .then((response)=>{
        if(response.ok){
            navigate("/dashbord");
            login()
            window.location.reload();
        }
        else{
            response.json()
            .then((error)=>{
                console.log(error.message.msg);
            })
        }
       })
    }
    return (
        <>
            <div className="login grid grid-cols-1 justify-items-center items-center md:container md:mx-auto h-[100vh] flex justify-center   ">
                   <form onSubmit={formik.handleSubmit} className=" w-[95%] md:w-[80%] lg:w-[60%] mb-3 p-3 md:p-5 border border-1 border-black " style={{borderRadius:"10px"}}>
                          <h1>Login Form</h1>
                          <hr />
                          <div className="email flex flex-col mb-3">
                               <label htmlFor="email" className="mb-2">E-mail:-</label>
                               <input id="email" type="text" placeholder="enter your email" className="border border-1 border-gray-400 p-3 w-[100%]" style={{borderRadius:"10px"}} {...formik.getFieldProps("email")}/>
                               {formik.touched.email && formik.errors.email && <p className="text-red-500 mt-2">{formik.errors.email} !!</p>}
                          </div>
                          <div className="password flex flex-col mb-2">
                               <label htmlFor="password" className="mb-2">Password:-</label>
                               <input id="password" type="password" placeholder="enter your password" className="border border-1 border-gray-400 p-3 w-[100%]" style={{borderRadius:"10px"}} {...formik.getFieldProps("password")}/>
                               {formik.touched.password && formik.errors.password && <p className="text-red-500 mt-2">{formik.errors.password} !!</p>}
                          </div>
                          <div className="w-[100%] flex flex-col items-center text-center mt-5">
                                 <button type="submit" className="border border-1 border-black p-2 w-[90%]  md:w-[40%] font-bold" style={{borderRadius:"10px", backgroundColor:'#ff5a5f',color:"white"}}>Sign-in</button>
                                 <button onClick={() => window.location.href = 'http://localhost:4000/api/onabording/login/google'} type="button"  className=" mt-4   flex justify-content-center md:relative border border-1 border-black p-2 w-[90%]   md:w-[40%] font-bold" style={{borderRadius:"10px", backgroundColor:'white',color:"black"}}><img className=" h-[1.3rem] w-[1.3rem] xl:h-[1.5rem] mt-[0.1rem] md:mt-0 xl:w-[1.5em] md:absolute left-[12rem] top-2.5 md:left-[1.2rem] md:top-2.5 xl:top-2  xl:left-[2.5rem] 2xl:left-[4rem]" src={google}/><span className="ms-3"> Sign-In with Google</span></button>
                                 <button onClick={toSignup}  className="border border-1 border-black p-2 w-[90%] md:w-[40%] font-bold mt-4"  style={{borderRadius:"10px", backgroundColor:'black',color:"white"}}>Register</button>
                          </div>
                          
                   </form>
            </div>
        </>
    )
}
