import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="flex flex-col h-screen justify-between">
            <Header className="relative" />
            <div className="overflow-auto pt-20">
                <div className="flex justify-center items-center">
                    <Outlet />
                </div>
            </div>
            <Footer className="relative" />
        </div>
    );
};

export default Layout;
