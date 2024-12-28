import {useFormik} from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function New_Listing(){
    const navigate= useNavigate();

    const initialValues= {
        title:"",
        description:"",
        image:null,
        price:"",
        country:"",
        location:""
    }
    const validations= yup.object({
        title:yup.string().required("Title is required").matches(/^[A-Za-z\s]*$/,"Numbers and Symbols are not Allowed!"),
        description:yup.string().required("Description is required").matches(/^[a-zA-Z.\s]+$/,"Numbers and Symbols are not Allowed!"),
        image:yup.mixed().test("File size cannot be more than 20Mb", (value)=> {return value.size<= 20 * 1024 * 1024}).test('Unsupported file format. Only JPEG and PNG are allowed.', (value)=> { return ['image/jpeg', 'image/png'].includes(value.type)}  ),
        price:yup.number().required("Price is required"),
        country:yup.string().required("Country is required").matches(/^[A-Za-z\s]*$/,"Numbers and Symbols are not Allowed!"),
        location:yup.string().required("Location is required").matches(/^[A-Za-z\s]*$/,"Numbers and Symbols are not Allowed!"),
    })

    const formik= useFormik({
        initialValues:initialValues,
        validationSchema:validations,
        onSubmit: async (values,{resetForm})=>{
            console.log(values);
            let formdata= new FormData();
            formdata.append("title",values.title);
            formdata.append("description",values.description);
            formdata.append("image",values.image);
            formdata.append("price",values.price);
            formdata.append("country",values.country);
            formdata.append("location",values.location);
           
            for (let [key, value] of formdata.entries()) {
                console.log(`${key}:`, value);
              }
            fetch("https://wanderlust-website-md7k.onrender.com/api/dashbord/newlisting",{
                method:"POST",
                body:formdata,
                 credentials:"include"
            })
            .then((response)=>{
                if(response.ok){
                    response.json()
                    .then((result)=>{
                        navigate("/dashbord")
                    })
                    
                }
                else{
                    response.json()
                    .then((error)=>{
                        if(error.message.path=="server"){
                            toast.error(error.message.msg , {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                                console.log(error.message);
                        }
                    })
                }
            })
            .catch((error)=>{
                toast.error("frontend-server error" , {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    console.log(error.message);
            })
            resetForm();
        }
    })
    function handleChange(e){
        let image= e.target.files[0];
        formik.setFieldValue("image",image);
      }
    return (
        <>
           <form className="container mx-auto h-[100vh] " onSubmit={formik.handleSubmit}>
                  <h2 className="mt-2">Create New Listing</h2>
                  <div className="title flex flex-col my-3">
                       <label className="mb-1" htmlFor="title">Title:-</label>
                       <input className="p-2 border border-1 border-gray-900" type="text" id="title" placeholder="Enter Title" {...formik.getFieldProps("title")}/>
                       {formik.touched.title && formik.errors.title && <p className="text-red-500 my-2">{formik.errors.title} !!</p>}
                  </div>
                  <div className="description  flex flex-col my-2">
                        <label className="mb-1" htmlFor="description">Description:-</label>
                        <input className="p-2 border border-1 border-gray-900" type="text" id="description" placeholder="Enter Description" {...formik.getFieldProps("description")}/>
                        {formik.touched.description && formik.errors.description && <p className="text-red-500 my-2">{formik.errors.description} !!</p>}
                  </div>
                  <div className="image my-4">
                        <label className="mb-1" htmlFor="image">Upload Listing Image:-</label>
                        <input type="file" name="image" id="image" onChange={(e)=>{handleChange(e)}} />
                        {formik.touched.image && formik.errors.image && <p className="text-red-500 my-2">{formik.errors.image} !!</p>}
                  </div>
                  <div className="price flex flex-col my-2">
                       <label htmlFor="price">Price:-</label>
                       <input className="p-2 border border-1 border-gray-900" type="number" id="price" placeholder="Enter Price" {...formik.getFieldProps("price")} />
                       {formik.touched.price && formik.errors.price && <p className="text-red-500 my-2">{formik.errors.price} !!</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1 my-2">
                       <div className="country flex flex-col">
                            <label className="mb-1" htmlFor="country">Country:-</label>
                            <input className="p-2 border border-1 border-gray-900" type="text" id="country" placeholder="Enter Country" {...formik.getFieldProps("country")} />
                            {formik.touched.country && formik.errors.country && <p className="text-red-500 my-2">{formik.errors.country} !!</p>}
                       </div>
                       <div className="location flex flex-col">
                            <label className="mb-1" htmlFor="location">Location:-</label>
                            <input className="p-2 border border-1 border-gray-900" type="text" id="location" placeholder="Enter Location" {...formik.getFieldProps("location")} />
                            {formik.touched.location && formik.errors.location && <p className="text-red-500 my-2">{formik.errors.location} !!</p>}
                       </div>
                  </div>
                
                  <button className=" px-4 py-2 w-[12rem] text-white font-bold mt-3 border border-2 border-gray-900" style={{borderRadius:"2rem",backgroundColor:"#ff5a5f"}} type="submit">Create</button>
           </form>
        </>
    )
}