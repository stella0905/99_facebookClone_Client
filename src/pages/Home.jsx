import FollowList from 'components/Follow/FollowList';
import UserList from 'components/User/UserList';
import MainFeed from 'components/mainFeed/MainFeed';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = Cookies.get('Authorization');

  useEffect(() => {
    if (!token) {
      alert('로그인을 해주세요');
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    token && (
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
    )
  );
};

export default Home;
