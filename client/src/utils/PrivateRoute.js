import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({component: Component, ...props}){
    return (
        <Route {...props} render={()=>{
            if(window.localStorage.getItem("token")){
                return <Component />
            }

            return <Redirect to="/login" />
        }} />
    );
}

export default PrivateRoute;