import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ChatFollowInfo = ({ follow }) => {
  const { follow_name, profile_url } = follow;
  const navigator = useNavigate();

  const handleBackClick = () => {
    navigator('/');
  };
  return (
    <div className='flex items-center'>
      <button
        className='mr-5 text-brand font-semibold text-xl'
        onClick={handleBackClick}
      >
        <FiChevronLeft />
      </button>
      <img
        className='h-7 w-7 flex-none rounded-full bg-gray-50 mr-3'
        src={profile_url}
        alt='prfile_url'
      />
      <h1 className='text-lg font-medium text-gray-800'>{follow_name}</h1>
    </div>
  );
};

export default ChatFollowInfo;
