import { Navigate } from "react-router-dom";
import { useContext } from "react";
import {MainContext} from "./MainProvider.jsx"
import { Comment } from "react-loader-spinner";
export default function PrivateRoutes({children}){
      const {isAuthenticated,Loading}= useContext(MainContext);
      console.log(isAuthenticated);
      
     if(Loading){
          return (
            <>
                  <div>
                         <Comment/>
                  </div>
            </>
          )
     }

    else if(!isAuthenticated){
        return <Navigate to={"/login"} />
    }

    return (
        <>  
               {children}
        </>
    )
}