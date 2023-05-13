import React from 'react';
import { FiUserPlus } from 'react-icons/fi';

const UserItem = ({ user }) => {
  const default_profile_url = '/images/default-profile-url.png';
  const handleAddClick = () => {};

  return (
    <>
      <li className='flex justify-between gap-x-6 py-2'>
        <div className='flex gap-x-4 items-center'>
          <img
            className='h-7 w-7 flex-none rounded-full bg-gray-50'
            src={user.profile_url || default_profile_url}
            alt=''
          />
          <div className='flex justify-between'>
            <p className='text-sm font-semibold leading-6 text-gray-900 mr-40'>
              {user.name}
            </p>
            <FiUserPlus className='cursor-pointer' onClick={handleAddClick} />
          </div>
        </div>
      </li>
    </>
  );
};

export default UserItem;
