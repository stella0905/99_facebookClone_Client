import React from 'react';
import { ReactComponent as Chat } from 'assets/chat.svg';
import { useNavigate } from 'react-router-dom';
import { FiUserMinus } from 'react-icons/fi';
import { QueryClient, useMutation } from 'react-query';
import { followDelete } from 'components/axios/users';

const FollowItem = ({ data }) => {
  const default_profile_url = '/images/default-profile-url.png';
  const navigate = useNavigate();

  const goChat = () => {
    navigate('/chat');
  };
  const mutation = useMutation(followDelete, {
    onSuccess: () => {
      QueryClient.invalidateQueries("followList")
      alert('삭제 성공!')
    },
    onError:(error) => {
      alert(error.message)
    }
  });

  const handleDeleteClick = (id) => {
    mutation.mutate(id)
  };

  return (
    <li className='flex justify-between gap-x-6 py-2'>
      <div className='flex gap-x-4 items-center '>
        <img
          className='h-7 w-7 flex-none rounded-full bg-gray-50'
          src={data.profile_url || default_profile_url}
          alt='profile_url'
        />
        <div className='flex justify-between  w-[280px] '>
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            {data.follower_name}
          </p>
          <div className='flex flex-row'>
          <Chat
            className='w-4 h-4 cursor-pointer hover:fill-brand mr-3 self-center'
            onClick={goChat}
          />
          <FiUserMinus
            className='cursor-pointer self-center'
            onClick={() => handleDeleteClick(data.user_id)}
          />
          </div>
        </div>
      </div>  
    </li>
  );
};

export default FollowItem;
