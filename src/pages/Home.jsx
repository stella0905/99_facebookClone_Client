import FollowList from 'components/Follow/FollowList';
import UserList from 'components/User/UserList';
import MainFeed from 'components/mainFeed/MainFeed';
import React from 'react';

const Home = () => {
  return (
    <div className='flex justify-center w-full px-5'>
      <div className='max-w-[300px]'>
        <UserList />
      </div>
      <div className='max-w-lg mx-auto'>
        <MainFeed />
      </div>
      <div className='max-w-[300px]'>
        <FollowList />
      </div>
    </div>
  );
};

export default Home;
