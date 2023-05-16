import React, { useState } from 'react';
import { ReactComponent as Chat } from 'assets/chat.svg';
import { useNavigate } from 'react-router-dom';
import { BsFillBellFill, BsFillPersonFill } from 'react-icons/bs';
import LogoutModal from './Login/LogOutModal'; // 로그아웃 모달 컴포넌트 임포트
import Cookies from 'js-cookie';
import { logoutUser } from 'api/auth';

const Header = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 로그아웃 모달 표시 여부 상태

  const goHome = () => {
    navigate('/home');
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <header className='bg-white shadow-md '>
      <div className='flex items-center h-12 justify-between px-2 py-1'>
        <div>
          {/* 로고 */}
          <div className='text-xl font-extrabold text-brand' onClick={goHome}>
            hanghaebook
          </div>
        </div>
        <div className='flex items-center w-2/5'>
          {/* 검색 입력창 */}
          <input
            type='text'
            placeholder='Hanghaebook 검색'
            className='rounded-full py-1 px-5 w-full h-8 bg-gray-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500'
          />
        </div>
        {/* 아이콘 */}
        <div className='flex items-center justify-between'>
          <div className='w-7 h-7 flex mx-1 items-center justify-center rounded-full bg-gray-200'>
            <Chat className='w-3.5 h-3.5 cursor-pointer hover:fill-brand' />
          </div>
          <div className='w-7 h-7 flex mx-1 items-center justify-center rounded-full bg-gray-200'>
            <BsFillPersonFill
              className='w-5 h-5 cursor-pointer hover:fill-brand'
              onClick={() => setShowLogoutModal((prev) => !prev)}
            />
          </div>
        </div>
      </div>

      {/* 로그아웃 모달 */}
      {showLogoutModal && <LogoutModal onLogout={handleLogout} />}
    </header>
  );
};

export default Header;
