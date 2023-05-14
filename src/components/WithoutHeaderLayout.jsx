import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const WithoutHeaderLayout = () => {
    return (
        <div className="flex flex-col h-screen justify-center">
            <div className="flex-grow flex justify-center items-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default WithoutHeaderLayout;
