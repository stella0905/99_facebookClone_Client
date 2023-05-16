import { followUser } from 'components/axios/users';
import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { useMutation } from 'react-query';

const UserItem = ({users}) => {

  const default_profile_url = '/images/default-profile-url.png';

  const mutation = useMutation(followUser, {
    onSuccess: () => {
      alert("작성 저장 성공");
    },
  });

  const handleAddClick = (follow_id) => {
    mutation.mutate(follow_id)
  };

  const isValidUrl=(url)=>{
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
    return pattern.test(url);
  }

  return (
    <>
    
    {users.map((user)=>{
      return(
      <li className='flex justify-between gap-x-6 py-2' key={user.user_id}>
        <div className='flex gap-x-4 items-center'>
          <img
            className='h-7 w-7 flex-none rounded-full bg-gray-50'
            src={isValidUrl(user.profile_url) ? user.profile_url : default_profile_url}
            alt=''
          />
          <div className='flex justify-between'>
            <p className='text-sm font-semibold leading-6 text-gray-900 mr-40'>
              {user.name}
            </p>
            <FiUserPlus className='cursor-pointer' onClick={()=>handleAddClick(user.user_id)} />
          </div>
        </div>
      </li>
    )})
      }
    </>
  );
};

export default UserItem;
