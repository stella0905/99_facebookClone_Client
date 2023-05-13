import React from 'react';
import { ReactComponent as Chat } from 'assets/chat.svg';
import { useNavigate } from 'react-router-dom';

const FollowItem = ({ follow }) => {
  const default_profile_url = '/images/default-profile-url.png';
  const navigate = useNavigate();

  const goChat = () => {
    navigate('/chat');
  };
  return (
    <ul>
      <li className='flex justify-between gap-x-6 py-2'>
        <div className='flex gap-x-4 items-center'>
          <img
            className='h-7 w-7 flex-none rounded-full bg-gray-50'
            src={follow.profile_url || default_profile_url}
            alt=''
          />
          <div className='flex justify-between gap-x-40'>
            <p className='text-sm font-semibold leading-6 text-gray-900'>
              {follow.follwer_name}
            </p>
            <Chat
              className='w-4 h-4 cursor-pointer hover:fill-green-500'
              onClick={goChat}
            />
          </div>
        </div>
      </li>
    </ul>
  );
};

export default FollowItem;
