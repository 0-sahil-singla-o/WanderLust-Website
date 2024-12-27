import { useState } from 'react'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Dashbord from './Components/Dashbord/DashBord'
import Dashbord_Main from './Components/Dashbord/Dashbord_Main'
import Dashbord_Lisiting from './Components/Dashbord/Dashbord_Listing'
import New_Listing from './Components/Dashbord/New_Lisiting'
import Edit_Listing from './Components/Dashbord/Dashbord_Edit_Listing'
import Navbar from './Components/CommonComponents/Navbar'
import Homepage from './Components/Homepage/homepage'
import Footer from './Components/CommonComponents/Footer'
import Signup from './Components/OnAbording/signup'
import NotFound from './Components/CommonComponents/NotFound'
import Login from './Components/OnAbording/login'
import MainProvider from './Components/MainProvider'
import PrivateRoutes from './Components/PrivateRoute'
function App() {
  

  return (
            <>
            
               <MainProvider> 
                           <Navbar/>   
                           <Routes>
                                           <Route path='/' element={<Homepage/>} />
                                           <Route path='/signup' element={<Signup/>} />
                                           <Route path="/login" element={<Login/>} />
                                           <Route path="/dashbord/" element={<PrivateRoutes>
                                                                                    <Dashbord/>
                                                                     </PrivateRoutes>} >
                                          <Route index element={<Dashbord_Main/>}/>
                                          <Route path='/dashbord/:id' element={<Dashbord_Lisiting/>} />
                                          <Route path='/dashbord/new_listing' element={<New_Listing/>} />
                                          <Route path='/dashbord/edit_listing/:id' element={<Edit_Listing/>} />
                                         </Route>
                                         <Route path='*' element={<NotFound/>} />
                           </Routes> 
                           <Footer/>   
               </MainProvider>
           </>
  )
}

export default App
