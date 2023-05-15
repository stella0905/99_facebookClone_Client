import React from "react";
import { ReactComponent as Chat } from "assets/chat.svg";
import { Navigate } from "react-router-dom";
import { BsFillBellFill, BsFillPersonFill } from "react-icons/bs";

const Header = () => {
    const goChat = () => {
        Navigate("/chat");
    };

    return (
        <header className="bg-white shadow-md ">
            <div className="flex items-center h-12 justify-between px-2 py-1">
                <div>
                    {/* 로고 */}
                    <div className="text-xl font-extrabold text-brand">hanghaebook</div>
                </div>
                <div className="flex items-center w-2/5">
                    {/* 검색 입력창 */}
                    <input
                        type="text"
                        placeholder="Hanghaebook 검색"
                        className="rounded-full py-1 px-5 w-full h-8 bg-gray-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                {/* 아이콘 */}
                <div className="flex items-center justify-between">
                    <div className="w-7 h-7 flex mx-1 items-center justify-center rounded-full bg-gray-200">
                        <Chat className="w-3.5 h-3.5 cursor-pointer hover:fill-brand" onClick={goChat} />
                    </div>
                    <div className="w-7 h-7 flex mx-1 items-center justify-center rounded-full bg-gray-200">
                        <BsFillBellFill className="w-3.5 h-3.5 cursor-pointer hover:fill-brand transform rotate-[-15deg]" />
                    </div>
                    <div className="w-7 h-7 flex mx-1 items-center justify-center rounded-full bg-gray-200">
                        <BsFillPersonFill className="w-5 h-5 cursor-pointer hover:fill-brand" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
