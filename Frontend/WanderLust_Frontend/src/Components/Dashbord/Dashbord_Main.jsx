import { useState,useEffect,useContext } from "react"
import { useSearchParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
import Container from '@mui/material/Container';
import "./Dashbord_Main.css"
import { MainContext } from "../MainProvider";

export default function Dashbord_Main(){
    let switchTax= false;
    const {listings,setListings,totalPages,settotalPages}= useContext(MainContext);
    const [SearchParams,setSearchParams]= useSearchParams();
  
    const [page,setPage]= useState(1);
   
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let beforeTaxPrices=[];
    function taxSwitch(){
        if(!switchTax){
            const prices = document.querySelectorAll(".price");
            beforeTaxPrices=[];
            // Iterate over the NodeList and update the textContent
            prices.forEach((price, index) => {
                const numberRegex = /\d+/;
                const content=(price.textContent).match(numberRegex)[0]
                // Change the textContent to a new value, e.g., increment by 500
                price.textContent = `After GST->\ ${parseInt(content) + parseInt((content)*(18/100))}  ` ; 
                beforeTaxPrices.push(parseInt(content))
        })
        }
        else{
            const prices = document.querySelectorAll(".price");
    
            // Iterate over the NodeList and update the textContent
            prices.forEach((price, index) => {
                
                price.textContent= `Before GST--> ${beforeTaxPrices[index]}  ` ;
                // Change the textContent to a new value, e.g., increment by 500
                // price.textContent = ` ${parseInt(price.textContent) + parseInt((price.textContent)*(18/100))}  ` ; 
        })
        }
        switchTax=!switchTax;
    }
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(()=>{
        SearchParams.set("page",page);
        setSearchParams(SearchParams);
    },[page]);

    let navigate= useNavigate();
    function OpenListing(id){
      navigate(`/dashbord/${id}`,{state:{page:page}});
    }
    function leftButton(){
        if(page>1){
            setPage(prev=>prev-1);
        }
    }
    function rightButton(){
        if(page<totalPages){
            setPage(prev=>prev+1);
        }
    }
    function Search(){
        SearchParams.set("title",)
    }
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
                console.log("hello")
                .then((error)=>{
                    if(((error.message.path)==="server")){
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
    
  
    }
    function Delete(id){
        fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/delete/${id}`,{
            method:"DELETE",
             credentials:"include"
        })
        .then((response)=>{
            if(response.ok){
                console.log(listings)
                if(listings.length==0){
                    setPage(prev=>prev-1);
                    window.location.reload();
                }
                
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
    useEffect(()=>{
        let page= SearchParams.get("page");
        console.log(page)
      const Listings=()=>{  fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/?page=${page}`,{
            method:"GET",
            credentials:"include"
        })
        .then((response)=>{
            if(response.ok){
                response.json()
                .then((result)=>{
                    console.log(result)
                    setListings(result.data.listings);
                })
            }
            else{
                response.json()
                .then((error)=>{
                    toast.error(error.message.msg, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }) 
            }
        })
        .catch((error)=>{
            toast.error("server error!!", {
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
        })}
const TotalPages=()=>{
     fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/?page=${page}`,{
            method:"GET",
            credentials:"include"
        })
        .then((response)=>{
            if(response.ok){
                response.json()
                .then((result)=>{
                    console.log(result)
                    settotalPages(result.data.totalPages)
                })
            }
            else{
                response.json()
                .then((error)=>{
                    toast.error(error.message.msg, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }) 
            }
        })
        .catch((error)=>{
            toast.error("server error!!", {
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
        Listings()
        TotalPages()
    },[page])

    return (
        <>
             {(listings.length==0) ? <p className="h-[100vh]">No Listings are Available!</p> :
             <> 
               <div className="grid grid-cols-3 items-center justify-between">
                 <div className="2xl:hidden col-span-1 container">
                     <Button
                       id="demo-positioned-button"
                       aria-controls={open ? 'demo-positioned-menu' : undefined}
                       aria-haspopup="true"
                       aria-expanded={open ? 'true' : undefined}
                       style={{fontSize:"0.8rem"}}
                       onClick={handleClick}
                     >
                       Categories
                     </Button>
                     <Menu
                       id="demo-positioned-menu"
                       aria-labelledby="demo-positioned-button"
                       anchorEl={anchorEl}
                       open={open}
                       onClose={handleClose}
                       anchorOrigin={{
                         vertical: 'top',
                         horizontal: 'left',
                       }}
                       style={{height:"20rem"}}
                       transformOrigin={{
                         vertical: 'top',
                         horizontal: 'left',
                       }}
                     >
                       <MenuItem onClick={handleClose}>
                                <div className=" flex items-center w-[100%]" >
                                      <i class="fa-solid fa-fire w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Trending</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className=" flex items-center w-[100%] " >
                                      <i class="fa-solid fa-bed w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Rooms</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className="  flex items-center w-[100%] " >
                                       <i class="fa-solid fa-city w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Iconic Cities</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className="  flex items-center w-[100%]" >
                                       <i class="fa-solid fa-mountain w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Mountains</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className=" flex items-center w-[100%]" >
                                       <i class="fa-brands fa-fort-awesome w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Castles</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className="  flex items-center w-[100%]" >
                                       <i class="fa-solid fa-water-ladder w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Amazing Pools</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                              <div className=" flex items-center w-[100%]" >
                                      <i class="fa-solid fa-campground w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Camping</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className=" flex items-center w-[100%]" >
                                      <i class="fa-solid fa-tractor w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Farms</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className="  flex items-center w-[100%]" >
                                       <i class="fa-solid fa-snowflake w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]" >Artic</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className="  flex items-center w-[100%]" >
                                       <i class="fa-solid fa-shop w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Cabins</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className=" flex items-center w-[100%]" >
                                       <i class="fa-solid fa-tree w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]" >TreeHouses</p>
                                </div>
                       </MenuItem>
                       <MenuItem onClick={handleClose}>
                                <div className=" flex items-center w-[100%]" >
                                       <i class="fa-solid fa-building-columns w-[20%]"></i>
                                       <p className="text-[1rem] mb-0 w-[80%]">Mansions</p>
                                </div>
                       </MenuItem>
                     </Menu>
              </div>
              <div className="sliderIcons 2xl:px-4 2xl:py-2 2xl:grid 2xl:grid-cols-12 2xl:w-[100%] col-span-2 hidden">
                  <div className="  text-center" >
                             <i class="fa-solid fa-fire mt-3 h-[1rem]"></i>
                              <p className="text-[0.8rem] ">Trending</p>
                  </div>
                  <div className="text-center">
                              <i class="fa-solid fa-bed mt-3"></i>
                              <p className=" text-[0.8rem] ">Rooms</p>
                  </div>
                  
                  <div className=" text-center">
                              <i class="fa-solid fa-city mt-3"></i>
                              <p className="text-[0.8rem]">Iconic Cities</p>
                  </div>
                  <div className="text-center">
                              <i class="fa-solid fa-mountain mt-3"></i>
                              <p className="text-[0.8rem]">Mountains</p>
                  </div>
                  <div className=" text-center">
                              <i class="fa-brands fa-fort-awesome mt-3"></i>
                              <p className=" text-[0.8rem]">Castles</p>
                  </div>
                  
                  <div className=" text-center">
                              <i class="fa-solid fa-water-ladder mt-3"></i>
                              <p className="text-[0.8rem]">Amazing Pools</p>
                  </div>
                  <div className=" text-center">
                               <i class="fa-solid fa-campground mt-3"></i>
                              <p className="text-[0.8rem]">Camping</p>
                  </div>
                  <div className=" text-center">
                               <i class="fa-solid fa-tractor mt-3"></i>
                              <p className=" text-[0.8rem]">Farms</p>
                  </div>
                  
                  <div className=" text-center">
                               <i class="fa-solid fa-snowflake mt-3"></i>
                              <p className=" text-[0.8rem]">Artic</p>
                  </div>
                  <div className=" text-center">
                               <i class="fa-solid fa-shop mt-3"></i>
                              <p className=" text-[0.8rem] ">Cabins</p>
                  </div>
                  <div className=" text-center">
                              <i class="fa-solid fa-tree mt-3"></i>
                              <p className="text-[0.8rem]">Treehouses</p>
                  </div>
                   
                  <div className=" text-center">
                               <i class="fa-solid fa-building-columns mt-3"></i>
                              <p className=" text-[0.8rem]">Mansions</p>
                  </div>    
              </div>
              <div className="taxSwitch flex items-center py-1 px-3 rounded justify-center 2xl:w-[60%] 2xl:ms-[10rem] 2xl:col-span-1 col-span-2">
                     <p className="text-[0.8rem] mb-0">Display total before taxes</p>
                     <Switch {...label} onClick={taxSwitch} />
              </div>
        </div>
                 <div  className="px-2  main grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-0 justify-items-center " >
             {listings.map((listing)=>{
                return <>
                
                <Card style={{border:'none'}} onClick={()=>{OpenListing(listing._id)}} sx={{ maxWidth: 350,marginTop:"1.2rem",marginBottom:"1.2rem" }} >
                         <CardMedia
                           component="img"
                           alt="green iguana"
                           style={{borderRadius:"1.5rem"}}
                           sx={{height:"20rem",width:"30rem"}}
                           image={listing.image}
                         />
                         <CardContent style={{marginTop:"0.5rem",height:"5rem"}}>
                           <Typography style={{fontWeight:"600",fontFamily:"poppins"}} gutterBottom variant="h6" component="div">
                             {listing.title}
                           </Typography>
                           <Typography style={{fontFamily:"poppins",fontSize:"15px"}}  gutterBottom  component="div">
                              <i >&#8377; <span className="price">Before GST:-{listing.price}</span>/night</i>
                           </Typography>
                         </CardContent>
                        
                 </Card>
                </>
             })}
             </div>  
             </>
             }       
       
    
    <div className="navigateButtons border border-1 border-black flex items-center justify-center my-2 w-[100%]">
            <button className="leftButton   text-[1.2rem] mx-2 text-gray-500 " onClick={leftButton} hidden={page==1}>&lt;</button>
             <div className="flex items-center h-[2rem] ">Page {page} of {totalPages}</div>  
            <button className="rightButton  mx-2 text-[1.2rem] " onClick={rightButton} hidden={page==totalPages}>&gt;</button>
        </div>   
        </>
    )
}