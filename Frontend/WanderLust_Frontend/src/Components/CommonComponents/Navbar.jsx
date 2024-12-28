import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from '../MainProvider';
let pages = ['Home', 'Airbnb Your Home'];
let settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Navbar(){
    const navigate= useNavigate();
    const [anchorElNav, setAnchorElNav] =  useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const {logout,isAuthenticated,title,setTitle,listings,setListings,totalPages,settotalPages} = useContext(MainContext);
    const [SearchParams,setSearchParams]= useSearchParams();
    if(!isAuthenticated){
        settings=['login','signup']
        pages=['home']
    }

    // to delete the search on reload of window-->
    window.addEventListener('load', () => {
      const url = new URL(window.location.href);
      const searchParams = url.searchParams;
     console.log(url)
      // Specify the parameter to clear
      const paramToClear = 'search'; // Replace 'search' with the parameter you want to clear
  
      if (searchParams.has(paramToClear)) {
          // Remove the parameter
          console.log("hello")
          searchParams.delete(paramToClear);
  
          // Update the URL without reloading the page
          url.search = searchParams.toString();
          window.history.replaceState({}, document.title, url.toString());
      }
  }); 
    function titleSearch(event){
      setTitle(event.target.value);
    }
    function Search(){
      const page= SearchParams.get("page");
      SearchParams.set("search",title);
      setSearchParams(SearchParams);  
      const title2= SearchParams.get("search")

     const listings =async ()=>{
       fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/?page=${page}&search=${title2}`,{
        credentials:"include"
      })
      .then((response)=>{
        if(response.ok){
          response.json()
          .then((result)=>{
              setListings(result.data.searchedListings);
          })
        }
        else{
          response.json()
          .then((error)=>{
            console.log(error)
          })
         
        }
      })}

      const pages= async ()=>{
        fetch(`https://wanderlust-website-md7k.onrender.com/api/dashbord/?page=${page}&search=${title2}`,{
          credentials:"include"
        })
        .then((response)=>{
          if(response.ok){
            response.json()
            .then((result)=>{
                settotalPages(result.data.totalPages);
            })
          }
          else{
            response.json()
            .then((error)=>{
              console.log(error)
            })
           
          }
        })}
       pages();
       listings();
      
    }
    const handleCloseNavMenu= ()=>{
        setAnchorElNav(null);
    }
    const MultipleWork = (page) => {
        if(page=="Home"){
            navigate("/dashbord");
        }
        else if (page=="Airbnb Your Home"){
            navigate("/dashbord/new_listing")
        }
        else if(page==="home"){
          navigate("/")
        }
        setAnchorElNav(null);
      };
    const MultipleWorkUser= (setting)=>{
      console.log((setting=="Logout"))
       if((setting=="Logout")){
          fetch("https://wanderlust-website-md7k.onrender.com/api/dashbord/logout",{
            method:"GET",
            credentials:"include"
          })
          .then((response)=>{
            if(response.ok){
               logout()
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
            toast.error("Frontend Server error" , {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              console.log(error.message)
          })
       }
       else if(setting==="login"){
        navigate("/login");
       }
       else if(setting==="signup"){
        navigate("/signup")
       }
      setAnchorElUser(null);

    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
        <>
            <AppBar color='white' style={{borderBottom:"1px solid rgba(0,0,0,0.3)",boxShadow:"none",marginBottom:"1rem",padding:"0 10px"}} position="static">
              
                 <Toolbar disableGutters>
                 <i  style={{color:'#ff5a5f'}} className="fa-brands fa-airbnb text-[2rem] me-2 font-bold lg:flex hidden"></i>
                   <Typography
                     variant="h5"
                     noWrap
                     component="a"
                     href="#app-bar-with-responsive-menu"
                     className='lg:flex hidden'
                     sx={{
                       mr: 2,
                       fontFamily: 'poppins',
                       fontWeight: 700,
                       color: '#ff5a5f',
                       textDecoration: 'none',
                       padding:"0px",
                       width:"15%"
                     }}
                   >
                     WanderLust
                   </Typography>
                   
                   <Box className="lg:hidden flex w-[15%]"  sx={{ flexGrow: 1 }} >
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit"
                        >
                          <MenuIcon />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                        >
                          {pages.map((page) => (
                           <MenuItem key={page} onClick={()=>{MultipleWork(page)}}>
                              <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                            </MenuItem>
                          ))}
                        </Menu>
                   </Box>
                   {isAuthenticated ? <>
                                           <div className='flex items-center justify-center me-2  lg:hidden w-[70%] ' >
                                               <span className='lg:hidden md:flex hidden  text-[1.3rem] me-4 ' style={{ fontFamily: 'poppins',
                                              fontWeight: 700,
                                              color: '#ff5a5f',
                                              textDecoration: 'none'}}>WanderLust</span>
                                               <input type='text' onChange={(event)=>{titleSearch(event)}} value={title} placeholder='Search ' className='px-1 py-1 md:w-[25rem] sm:w-[20rem] w-[8rem] border border-1 border-black md:me-3 md:me-1 lg:hidden rounded '/>
                                               <button onClick={Search} className='border border-1 border-white px-2 py-1 rounded-pill text-white font-bold w-[5rem]' style={{backgroundColor:"#ff5a5f"}}>Search</button>
                                          </div>
                                      </>: true}
                   
                   <Box className="lg:flex hidden 2xl:w-[40%] justify-start items-center  "  sx={{ flexGrow: 1 }}  >
                     {pages.map((page) => (
                       <Button
                         key={page}
                         onClick={()=>{MultipleWork(page)}}
                         sx={{ my: 2, mx:2, color: 'black', display: 'block', fontWeight:"500",fontFamily:"poppins" , fontSize:"1rem"  }}
                       >
                         {page}
                       </Button>
                     ))}
                   </Box>
                    {isAuthenticated ? <>
                                            <div className=' items-center me-2  hidden lg:flex w-[30%] 2xl:w-[50%] justify-center ' >
                                              <input onChange={(event)=>{titleSearch(event)}} value={title}  type='text' placeholder='Search for Listing' className='px-2 py-1 w-[30rem] border border-1 border-black me-1  rounded '/>
                                              <button onClick={Search} className='border border-1 border-white px-2 py-1 rounded-pill text-white font-bold' style={{backgroundColor:"#ff5a5f"}}>Search</button>
                                            </div>
                                      </>:<>
                                      <div className='flex items-center w-[70%] justify-center'>
                                      <i  style={{color:'#ff5a5f'}} className="fa-brands fa-airbnb text-[2rem]  me-2 font-bold lg:hidden flex"></i>
                                              <Typography
                                                variant="h5"
                                                noWrap
                                                component="a"
                                                href="#app-bar-with-responsive-menu"
                                                className='lg:hidden flex '
                                                sx={{
                                                  mr: 2,
                                                  fontFamily: 'poppins',
                                                  fontWeight: 700,
                                                  color: '#ff5a5f',
                                                  textDecoration: 'none',
                                                  padding:"0px"
                                                }}

                                              >
                                                WanderLust
                                              </Typography>
                                      
                                      </div>
                                         </>}
                   
                   <Box sx={{ flexGrow: 0 }}  className="w-[15%] flex justify-end"> 
                     <Tooltip title="Open settings">
                       <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                         <Avatar style={{backgroundColor:"#ff5a5f"}} src="/static/images/avatar/2.jpg" />
                       </IconButton>
                     </Tooltip>
                     <Menu
                       sx={{ mt: '45px' }}
                       id="menu-appbar"
                       anchorEl={anchorElUser}
                       anchorOrigin={{
                         vertical: 'top',
                         horizontal: 'right',
                       }}
                       keepMounted
                       transformOrigin={{
                         vertical: 'top',
                         horizontal: 'right',
                       }}
                       open={Boolean(anchorElUser)}
                       onClose={handleCloseUserMenu}
                     >
                       {settings.map((setting) => (
                         <MenuItem key={setting} onClick={()=>{ MultipleWorkUser(setting)}}>
                           <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                         </MenuItem>
                       ))}
                     </Menu>
                   </Box>
                 </Toolbar>
             
             </AppBar>
        </>
    )
}