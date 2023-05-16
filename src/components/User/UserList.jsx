import UserItem from './UserItem';
import { BsSearch } from 'react-icons/bs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { detailSprint, userSearch } from '../axios/users';
import useInput from 'components/mainFeed/useInput';
import { useEffect, useState } from 'react';

const UserList = () => {
  const [name, onChangeSearchNameHandler]= useInput('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchUsers, setSearchUsers] = useState([])

  const mutation = useMutation((name)=> userSearch(name),{
    onSuccess:(data)=>{
      setSearchUsers(data.userInfos)
      setSearchEnabled(true)
    }
  })

  const profile = {
    user_id: 1,
    name: '김수진',
    profile_url:
      'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fCVFQyVCQSU5MCVFQiVBNiVBRCVFRCU4NCVCMHxlbnwwfHwwfHw%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(name)// 검색 버튼 클릭 시 요청 활성화
  };




  return (
    <div className='ml-3 my-3 w-70'>
      <div className='flex gap-x-4 items-center mb-5'>
        <img
          className='h-7 w-7 flex-none rounded-full bg-gray-50'
          src={profile.profile_url}
          alt='profile_url'
        />
        <div className='flex justify-between gap-x-40'>
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            {profile.name}
          </p>
        </div>
      </div>
      <p className='text-xl font-bold leading-6 text-gray-900 my-3'>사람</p>
      <form className='flex items-center mb-3' onSubmit={handleSubmit}>
        <label htmlFor='search' className='sr-only'>
          search
        </label>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <BsSearch className='w-4 h-4 text-gray-500' />
          </div>
          <input
            type='text'
            id='search'
            value={name}
            onChange={onChangeSearchNameHandler}
            className='bg-gray-100 text-sm rounded-full block w-72 pl-10 pr-2.5 py-2.5 placeholder-gray-600'
            placeholder='친구 검색'
          />
        </div>
      </form>
      <ul>
      {searchEnabled && searchUsers.length > 0 ? (
        <UserItem users={searchUsers} />
      ) : (
        searchEnabled && <p>검색 결과가 없습니다.</p>
      )}

      </ul>
    </div>
  );
};

export default UserList;
