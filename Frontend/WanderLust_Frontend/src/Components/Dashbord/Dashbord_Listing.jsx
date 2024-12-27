import { useState,useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import unknown from "../../assets/unknown.png"
import * as yup from 'yup';
import "../../assets/starability.css"
import { useLocation } from "react-router-dom";
import { common } from "@mui/material/colors";
export default function Dashbord_Lisiting(){
    const [ListingData,setLisitingData]= useState({});
    const [reviewData,setReviewData]= useState([]);
    const [currentUser,setCurrentUser] = useState({});
    let {id}= useParams();
    const navigate= useNavigate();
    function edit(id){
      
        fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/editlistingform/${id}`,{
             method:"GET",
              credentials:"include"
         })
         .then((response)=>{
             if(response.ok){
                 response.json()
                 .then((result)=>{
                     navigate(`/dashbord/edit_listing/${id}`,{state:result.data});
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
                        }
                 })
             }
         })
         .catch((error)=>{
             toast.error("Frontend server error" , {
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
     
   
     }
     function Delete(id){
        fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/delete/${id}`,{
            method:"DELETE",
             credentials:"include"
        })
        .then((response)=>{
            if(response.ok){
                navigate("/dashbord")
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
                       }
                })
            }
        })
        .catch((error)=>{
            toast.error("Frontend server error" , {
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
    }
    useEffect(()=>{
        const listingdata=()=>{
            
            fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/${id}`,{
                method:"GET",
                 credentials:"include"
             })
             .then((response)=>{
              if(response.ok){
                  response.json()
                  .then((result)=>{
                     console.log(result.data.listingData)
                     setLisitingData(result.data.listingData);
                     
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
                         }
                  })
              }
             })
             .catch((error)=>{
              toast.error("Server Error", {
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
        }
       const reviewData=()=>{
        fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/${id}`,{
            method:"GET",
             credentials:"include"
         })
         .then((response)=>{
          if(response.ok){
              response.json()
              .then((result)=>{
                setReviewData(result.data.reviewsArray)
            
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
                     }
              })
          }
         })
         .catch((error)=>{
          toast.error("Server Error", {
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
       }
       const currentUserData= ()=>{
        fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/${id}`,{
            method:"GET",
             credentials:"include"
         })
         .then((response)=>{
          if(response.ok){
              response.json()
              .then((result)=>{
                setCurrentUser(result.data.currentUser)
            
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
                     }
              })
          }
         })
         .catch((error)=>{
          toast.error("Server Error", {
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
       }
       listingdata()
       reviewData()
       currentUserData()
    },[])

 
    const initialValues={
        comment:"",
        rating:0
    }

    const validations= yup.object({
        comment:yup.string().required("comment field is required").min(10,"must contain atleast 10 characters").max(500,"comment limit is reached!! you can type only upto 500 characters").matches(/^(?!\d+$)[a-zA-Z0-9 .,]+$/,"cannot contain symbols and must contain alphabets if you are only typing numbers"),
    })

    const formik= useFormik({
        initialValues:initialValues,
        validationSchema:validations,
        onSubmit:(values,{resetForm})=>{
            console.log(values);
            fetch(`http://localhost:4000/api/dashbord/${id}/review`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(values),
                 credentials:"include"
            })
            .then((response)=>{
                if(response.ok){
                    console.log("hello")
                    window.location.reload();
                }
                else{
                    response.json()
                    .then((error)=>{
                        if((error.message.path==="server")){
                           return toast.error(error.message.msg , {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                           }
                           
                    })
                }
            })
            .catch((error)=>{
                toast.error("Frontend server error" , {
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
            resetForm()
        }

    })
    function DeleteReview(reviewId){
        fetch(`http://localhost:4000/api/dashbord/${id}/review/${reviewId}`,{
            method:"DELETE",
             credentials:"include"
        })
        .then((response)=>{
            if(response.ok){
                window.location.reload();
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
                       }
                })
            }
        })
        .catch((error)=>{
            toast.error("Frontend server error" , {
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
    }
    return (
        <>
            {ListingData ? <>  <div className="container mx-auto p-5 flex flex-col justify-items-center h-[100%]">
                                     <h2 className="mb-3">Listing Details</h2>
                                     <img className="h-[18rem] w-[100%] mb-2 " style={{objectFit:"cover",borderRadius:"1.5rem"}} src={ListingData.image}  />
                                     <span><i>Owned By {ListingData.owner ? ListingData.owner.name : "loading..."}</i></span>
                                     
                                     <h4 className="mt-2">{ListingData.title}</h4>
                                     <p style={{margin:"0.2rem"}}>{ListingData.description}</p>
                                     <p style={{margin:"0.2rem"}}>&#8377;{(ListingData.price)} / night</p>
                                     <p style={{margin:"0.2rem"}}>{ListingData.country}</p>
                                     <p style={{margin:"0.2rem"}}>{ListingData.location}</p>
                                     {(currentUser._id && ListingData.owner && (currentUser._id ===ListingData.owner._id)) ?  
                                     <>
                                        <div >
                                           <button onClick={()=>{edit(ListingData._id)}} className="py-2 w-[12rem] text-white font-bold mt-3 border border-1 border-black mx-2"  style={{borderRadius:"2rem",backgroundColor:"#ff5a5f"}}>Edit</button>
                                           <button onClick={()=>{Delete(ListingData._id)}} className="py-2 w-[12rem] text-white font-bold mt-3 border border-1 border-black mx-2"  style={{borderRadius:"2rem",backgroundColor:"rgba(0,0,0,0.8)"}}>Delete</button>
                                        </div>
                                     </> :
                                     true
                                     }
                                     <hr />
                                     <h3>Enter Your Review:- </h3>
                                     <form onSubmit={formik.handleSubmit}>
                                             <div className="comment flex flex-col">
                                                   <label htmlFor="comment">Comment:-</label>
                                                   <textarea className="border border-1 border-black p-2 my-2" style={{borderRadius:"10px"}}  id="comment" placeholder="Enter Your Comment" {...formik.getFieldProps("comment")}/>
                                                   {formik.touched.comment && formik.errors.comment && <p className="text-red-500">{ formik.errors.comment} !!</p> }
                                             </div>
                                             <div className="rating flex flex-col my-2">
                                                   <label className="mb-2" htmlFor="rating">Rating:-</label>
                                                   
                                                   <fieldset class="starability-slot">
                                                         <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" checked aria-label="No rating." {...formik.getFieldProps("no-rate")}  />
                                                        
                                                         <input type="radio" name="rating" id="first-rate1"  value="1"  onChange={formik.handleChange}  />
                                                         <label for="first-rate1"  title="Terrible">1 star</label>
                                                         <input type="radio" name="rating" id="first-rate2" value="2" onChange={formik.handleChange}  />
                                                         <label for="first-rate2" title="Not good">2 stars</label>
                                                         <input type="radio" name="rating" id="first-rate3"  value="3" onChange={formik.handleChange} />
                                                         <label for="first-rate3" title="Average">3 stars</label>
                                                         <input type="radio" name="rating" id="first-rate4"   value="4" onChange={formik.handleChange} />
                                                         <label for="first-rate4" title="Very good">4 stars</label>
                                                         <input type="radio" name="rating" id="first-rate5"  value="5" onChange={formik.handleChange} />
                                                         <label for="first-rate5" title="Amazing">5 stars</label>
                                                    </fieldset>
                                             </div>
                                             <button type="submit" className="px-4 py-2 w-[12rem] text-white font-bold mt-3 border border-2 border-gray-900" style={{borderRadius:"2rem",backgroundColor:"#ff5a5f"}}>Submit</button>
                                     </form>
                                     <hr />
                                     {(reviewData.length==0) ? <p>No Reviews are made for this Listing</p> : <div>
                                                                                                                <h2 className="mb-3">Reviews:-</h2>
                                                                                                                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                                                                                                {reviewData.map((singleReview)=>{
                                                                                                                      return <div className="flex  flex-col p-3 border border-1 border-black mx-2 my-2" style={{borderRadius:"20px",height:"auto"}}>
                                                                                                                              
                                                                                                                              <div className="flex items-center">
                                                                                                                                   {console.log(singleReview.author.avatar)}
                                                                                                                                   <img className="h-[4rem] rounded-full " src={(singleReview.author && singleReview.author.avatar) ? singleReview.author.avatar: unknown } loading="lazy" />
                                                                                                                                   <h4 className="my-1 ms-3 text-[1.5rem]">{singleReview.author.name}</h4>
                                                                                                                              </div>
                                                                                                                             
                                                                                                                              <p className=" my-2 h-[55%]">{singleReview.comment}</p>
                                                                                                                              <p className="h-[35%]  my-2">{singleReview.rating} stars
                                                                                                                              <p className="starability-result" data-rating={singleReview.rating}>Rated: 3 stars</p>
                                                                                                                              </p>
                                                                                                                              {(currentUser._id && singleReview.author && singleReview.author._id && (currentUser._id===singleReview.author._id)) ? 
                                                                                                                              <button onClick={()=>{DeleteReview(singleReview._id)}} className="w-[5rem] border border-1 border-black p-1 text-white" style={{backgroundColor:"rgba(0,0,0,0.6)",borderRadius:"20px"}}>Delete</button>
                                                                                                                               : true
                                                                                                                              }
                                                                                                                              </div>
                                                                                                                   })}   
                                                                                                                </div>
                                                                                                                 
                                                                                                             </div>}
                              </div> 
                          </>   
             : <p>Waiting for data fetching..</p>}
        </>
    )
}
