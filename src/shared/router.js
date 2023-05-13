import Chat from "pages/Chat";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
