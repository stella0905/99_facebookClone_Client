import LoginForm from "components/Login/LoginForm";
import LogoWithDescription from "components/Login/LogoWithDescription";
import React from "react";

const Login = () => {
    return (
        <>
            <div className="flex justify-center">
                <div className="flex">
                    <LogoWithDescription />
                    <LoginForm className="px-36" />
                </div>
            </div>
        </>
    );
};

export default Login;
