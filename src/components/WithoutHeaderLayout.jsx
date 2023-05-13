import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const WithoutHeaderLayout = () => {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
};

export default WithoutHeaderLayout;
