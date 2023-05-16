import FollowList from 'components/Follow/FollowList';
import UserList from 'components/User/UserList';
import MainFeed from 'components/mainFeed/MainFeed';
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { name, profile_url } = useSelector((state) => state.users);
  console.log('가져온값', name, profile_url);

  return (
    <div className='flex justify-center w-full'>
      <div>
        <UserList />
      </div>
      <div className='mx-auto'>
        <MainFeed />
      </div>
      <div>
        <FollowList />
      </div>
    </div>
  ); 
};

export default Home;
