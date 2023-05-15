import UserItem from './UserItem';
import { BsSearch } from 'react-icons/bs';

const UserList = () => {
  const users = [
    {
      user_id: 1,
      name: '강한나',
      profile_url: '',
    },
    {
      user_id: 2,
      name: '강주희',
      profile_url: '',
    },
    {
      user_id: 3,
      name: '김현빈',
      profile_url:
        'https://images.unsplash.com/photo-1680688771355-2840ed0134b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      user_id: 4,
      name: '박지성',
      profile_url:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      user_id: 5,
      name: '송중기',
      profile_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      user_id: 6,
      name: '우도환',
      profile_url: '',
    },
    {
      user_id: 7,
      name: '차은우',
      profile_url:
        'https://images.unsplash.com/photo-1679235214031-a8ab50e0c803?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxMHx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      user_id: 8,
      name: '한승연',
      profile_url:
        'https://images.unsplash.com/photo-1668277272458-7bdd6ea0acf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0Nnx0b3dKWkZza3BHZ3x8ZW58MHx8fHw%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  const profile = {
    user_id: 1,
    name: '김수진',
    profile_url:
      'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fCVFQyVCQSU5MCVFQiVBNiVBRCVFRCU4NCVCMHxlbnwwfHwwfHw%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            className='bg-gray-100 text-sm rounded-full block w-72 pl-10 pr-2.5 py-2.5 placeholder-gray-600'
            placeholder='친구 검색'
          />
        </div>
      </form>
      <ul>
        {users?.map((user) => (
          <UserItem key={user.user_id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
