import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "pages/Chat";
import Home from "pages/Home";
import Login from "pages/Login";
import Signup from "pages/SignUp";
import Layout from "components/Layout";
import WithoutHeaderLayout from "components/WithoutHeaderLayout";
import NotFound from "pages/NotFound";

const Router = () => (
    <BrowserRouter>
        <Routes>
            {/* header와 footer 모두 있는 layout 을 통해 랜더링될 페이지들 라우팅 */}
            <Route path="/" element={<Layout />}>
                {/* index - 중첩 라우트 구조에서 부모 라우트와 정확히 일치하는 경로를 의미함 */}
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="chat" element={<Chat />} />
                {/* 존재하지 않는 페이지에 대한 처리 */}
                <Route path="*" element={<NotFound />} />
            </Route>
            {/* footer 만 있는 layout 을 통해 랜더링될 페이지들 라우팅 */}
            <Route path="/" element={<WithoutHeaderLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Router;
