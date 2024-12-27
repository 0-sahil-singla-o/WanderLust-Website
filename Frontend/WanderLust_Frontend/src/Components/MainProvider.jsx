import { useState ,createContext,useEffect} from "react"
export const MainContext= createContext();
import {Comment} from "react-loader-spinner";
export default function     MainProvider({children}){
    // this will create a context or we can say a object that will make the values globally accessable to all the components that will take as a childern of this context.
    const [isAuthenticated,setAuthenticated]= useState(false);
    const [Loading,setLoading]= useState(true);
    const [title,setTitle]= useState("");
    const [listings,setListings]= useState([]);
    const [totalPages,settotalPages]= useState(1);
    useEffect(()=>{
        const Authentication= ()=>{
            fetch("http://localhost:4000/api/isAuthenticated",{
                method:"GET",
                credentials:"include"
            })
            .then((response)=>{
                if(response.ok){
                    setAuthenticated(true);
                    setLoading(false);
                }
                else{
                    setAuthenticated(false);
                    setLoading(false);
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
    Authentication();
    },[])

    const login= ()=>{
       return setAuthenticated(true);
    }
    const logout= ()=>{
        return setAuthenticated(false);
     }

    return (
        <>
        
                {Loading ? <div className="h-[100vh] flex flex-col justify-center items-center"><Comment height="150" width="150"/><p className="w-[20rem] ms-4 flex justify-content-center  text-[3rem] font-bold">Loading...</p></div> : <> 

                                                  <MainContext.Provider value={{isAuthenticated,login,logout,Loading,title,setTitle,listings,setListings,totalPages,settotalPages}}>
                                                                                                                    {children}
                                                  </MainContext.Provider>

                                                  </>}

              
        </>
    )
}