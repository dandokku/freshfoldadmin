import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
export default function SharedLayout() {

    return (
        <div className=''>
          <Dashboard className="mb-10"/>

            <Outlet />
            
            welpwelp
        </div>
    )
}

