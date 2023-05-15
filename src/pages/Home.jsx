import FollowList from 'components/Follow/FollowList';
import UserList from 'components/User/UserList';
import MainFeed from 'components/mainFeed/MainFeed';
import React from 'react';

const Home = () => {
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
