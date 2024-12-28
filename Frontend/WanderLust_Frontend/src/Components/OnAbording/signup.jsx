import { useFormik } from "formik"
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import google from "../../assets/google.png";

export default function Signup(){
    const navigate= useNavigate();
    const initialValues={
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    }
    
    const validations= yup.object({
       name:yup.string().required("name field is required").min(2,"Name should be 2-20 characters long!!").max(20,"Name should be 2-20 characters long!!").matches(/^[a-zA-Z\s.]+$/,"Name should only have alphabets"),
       email:yup.string().required("email field is required").email("Invalid Email !!"),
       password:yup.string().required("password field is required").min(8,"Password must be atleast 8 characters long!").matches(/^(?=.*[A-Z])(?=.*\W).+$/,"Password must contain atleast one uppercase alphabet and symbol!!"),
       confirmpassword:yup.string().required("confirmpassword field is required").min(8,"confirmpassword must be atleast 8 characters long!").matches(/^(?=.*[A-Z])(?=.*\W).+$/,"confirmpassword must contain atleast one uppercase alphabet and symbol!!")
    })
    
    const formik= useFormik({
        initialValues:initialValues,
        validationSchema:validations,
        onSubmit: (values)=>{
            console.log(values)
            fetch("https://wanderlust-website-md7k.onrender.com/api/onabording/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values),
                credentials:"include"
            })
            .then((response)=>{3
                  if(response.ok){
                      navigate("/login");
                  }
                  else{
                      response.json()
                      .then((error)=>{
                          console.log(error.message);
                      })
                  }
            })
            
        }
    })
    return (
        <>
            <div className="signup grid grid-cols-1 justify-items-center items-center  h-[100vh] md:container md:mx-auto flex justify-center">
                   <form onSubmit={formik.handleSubmit} className=" w-[95%] md:w-[80%] lg:w-[60%] border border-1 border-black mb-3 p-3 md:p-5 "  style={{borderRadius:"10px"}}>
                          <h1>Signup Form</h1>
                          <hr />
                          <div className="name flex flex-col mb-2">
                               <label htmlFor="name" className="mb-2">Name:-</label>
                               <input id="name" type="text" placeholder="enter your name" className="border border-1 border-gray-400 p-3 w-[100%]" style={{borderRadius:"10px"}} {...formik.getFieldProps("name")}/>
                               {formik.touched.name && formik.errors.name && <p className="text-red-500 mt-2">{formik.errors.name}</p>}
                          </div>
                          <div className="email flex flex-col mb-3">
                               <label htmlFor="email" className="mb-2">E-mail:-</label>
                               <input id="email" type="text" placeholder="enter your email" className="border border-1 border-gray-400 p-3 w-[100%]" style={{borderRadius:"10px"}} {...formik.getFieldProps("email")}/>
                               {formik.touched.email && formik.errors.email && <p className="text-red-500 mt-2">{formik.errors.email}</p>}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                                <div className="password flex flex-col mb-2">
                                     <label htmlFor="password" className="mb-2">Password:-</label>
                                     <input id="password" type="password" placeholder="enter your password" className="border border-1 border-gray-400 p-3 w-[100%]" style={{borderRadius:"10px"}} {...formik.getFieldProps("password")}/>
                                     {formik.touched.password && formik.errors.password && <p className="text-red-500 mt-2">{formik.errors.password}</p>}
                                </div>
                                <div className="confirmpassword flex-col mb-2">
                                     <label htmlFor="confirmpassword" className="mb-2">Confirm Password:-</label>
                                     <input id="confirmpassword" type="confirmpassword" placeholder="enter your confirm password" className="border border-1 border-gray-400 p-3 w-[100%]" style={{borderRadius:"10px"}} {...formik.getFieldProps("confirmpassword")}/>
                                     {formik.touched.confirmpassword && formik.errors.confirmpassword && <p className="text-red-500 mt-2">{formik.errors.confirmpassword}</p>}
                                </div>
                          </div>
                          <div className="w-[100%] flex flex-col items-center text-center mt-3">
                                 <button type="submit" className="border border-1 border-black p-2  w-[90%]  md:w-[40%] font-bold" style={{borderRadius:"10px", backgroundColor:'#ff5a5f',color:"white"}}>Signup</button>
                                 <button type="button" onClick={()=>{window.location.href="https://wanderlust-website-md7k.onrender.com/api/onabording/login/google"}} className=" mt-4   flex justify-content-center md:relative border border-1 border-black p-2 w-[90%]   md:w-[40%] font-bold" style={{borderRadius:"10px", backgroundColor:'white',color:"black"}}><img className=" h-[1.3rem] w-[1.3rem] xl:h-[1.5rem] mt-[0.1rem] md:mt-0 xl:w-[1.5em] md:absolute left-[12rem] top-2.5 md:left-[1.2rem] md:top-2.5 xl:top-2  xl:left-[2.5rem] 2xl:left-[4rem]" src={google}/><span className="ms-3"> Sign-In with Google</span></button>
                          </div>
                        
                   </form>
            </div>
        </>
    )
}