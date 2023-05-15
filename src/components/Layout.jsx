import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col h-screen justify-center">
                <div className="flex-grow flex justify-center items-center">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
