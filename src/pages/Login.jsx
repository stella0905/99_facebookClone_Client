import LoginForm from "components/Login/LoginForm";
import LogoWithDescription from "components/Login/LogoWithDescription";
import React from "react";

const Login = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="flex w- 3/5">
                    <LogoWithDescription />
                    <LoginForm className="px-36" />
                </div>
            </div>
        </>
    );
};

export default Login;
