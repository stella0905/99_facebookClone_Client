import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-400 py-20">
            <div className="container mx-auto px-5 max-w-5xl">
                <div className="flex space-x-4 text-xs mb-3">
                    <div>한국어</div>
                    <div>English (US)</div>
                    <div>Bahasa Indonesia</div>
                    <div>ภาษาไทย</div>
                    <div>Español</div>
                    <div>中文(简体)</div>
                    <div>日本語</div>
                    <div>Português (Brasil)</div>
                    <div>Français (France)</div>
                    <div>Deutsch</div>
                </div>
                <hr />
                <div className="flex text-xs flex-wrap mt-3 mb-3">
                    {footerData.map((item, index) => (
                        <p className="mr-2" key={index}>
                            {item}
                        </p>
                    ))}
                </div>
                <div className=" text-xs">
                    <p>© 2023 Hanghaebook. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

const footerData = [
    "가입하기",
    "로그인",
    "Messenger",
    "Facebook Lite",
    "Watch",
    "장소게임",
    "Market place",
    "Meta Pay",
    "Meta 스토어",
    "Meta Quest",
    "Instagram",
    "Bulletin",
    "기부 캠페인 서비스",
    "투표 정보 센터",
    "개인정보처리방침",
    "개인정보 보호 센터",
    "그룹",
    "정보",
    "광고 만들기",
    "페이지 만들기",
    "개발자",
    "채용 정보",
    "쿠키",
    "AdChoices",
    "이용 약관",
    "고객 센터",
    "연락처 업로드 및 비사용자 설정",
];
