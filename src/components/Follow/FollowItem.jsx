import React from 'react';
import { ReactComponent as Chat } from 'assets/chat.svg';
import { useNavigate } from 'react-router-dom';
import { FiUserMinus } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { followDelete } from 'components/axios/users';

const FollowItem = ({ data }) => {
  const default_profile_url = '/images/default-profile-url.png';
  const navigate = useNavigate();

  const goChat = () => {
    navigate('/chat');
  };
  console.log('삭제할 data',data)
  const mutation = useMutation(followDelete, {
    onSuccess: () => {
      alert('삭제 성공!')
    },
    onError:(error) => {
      alert(error.message)
    }
  });

  const handleDeleteClick = (id) => {
    // console.log('여기는 컴포넌트 id',id)
    mutation.mutate(id)
  };

  return (
    
    <li className='flex justify-between gap-x-6 py-2'>
      <div className='flex gap-x-4 items-center'>
        <img
          className='h-7 w-7 flex-none rounded-full bg-gray-50'
          src={data.profile_url || default_profile_url}
          alt='profile_url'
        />
        <div className='flex justify-between'>
          <p className='text-sm font-semibold leading-6 text-gray-900 mr-40'>
            {data.name}
          </p>
          <Chat
            className='w-4 h-4 cursor-pointer hover:fill-brand mr-3'
            onClick={goChat}
          />
          <FiUserMinus
            className='cursor-pointer'
            onClick={() => handleDeleteClick(data.user_id)}
          />
        </div>
      </div>  
    </li>
  );
};

export default FollowItem;
