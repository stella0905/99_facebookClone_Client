import React from 'react';

const LogoutModal = ({ onClose, onLogout }) => {
  const handleLogout = async () => {
    
    onLogout();
  };

  return (
    <div className='relative'>
      <div className='absolute right-0'>
        <div className='pb-4 drop-shadow'>
          <div className='flex flex-col justify-center space-y-3 bg-white w-[100px] h-10'>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
