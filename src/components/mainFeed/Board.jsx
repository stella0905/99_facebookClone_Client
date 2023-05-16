import React, { useEffect, useState } from 'react';
import { likeChecked } from 'api/boards';
import FollowModal from './FollowModal';
import { getDayMinuteCounter } from './getDayMinuteCounter';
import Modify from './Modify';
import { RiThumbUpLine } from 'react-icons/ri';

const Board = () => {
  const default_profile_url = '/images/default-profile-url.png';
  const seeMoreIcon = '/images/seeMoreIcon.png';
  const likeIcon = '/images/likeIcon.png';
  const [showButtons, setShowButtons] = useState(false);
  const [showProfileButtons, setShowProfileButtons] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [likes, setLikes] = useState('');
  const [likeCheck, setLikeCheck] = useState('');

  const [posts, setPosts] = useState([
    {
      post_id: 1,
      user_id: '3',
      name: '유리',
      content: '안녕하세요',
      img_url: 'https://img.jpg1',
      likes: 3,
      createdAt: '2023-05-13T07:45:56.000Z',
      updatedAt: '2022-07-25T07:52:09.000Z',
    },
    {
      post_id: 2,
      user_id: '3',
      name: '유리',
      content: '안녕하세요',
      img_url: 'https://img.jpg1',
      likes: 2,
      createdAt: '2023-05-13T07:45:56.000Z',
      updatedAt: '2022-07-25T07:52:09.000Z',
    },
    {
      post_id: 3,
      user_id: '3',
      name: '유리',
      content: '안녕하세요',
      img_url: 'https://img.jpg1',
      likes: 1,
      createdAt: '2023-05-13T07:45:56.000Z',
      updatedAt: '2022-07-25T07:52:09.000Z',
    },
    {
      post_id: 4,
      user_id: '3',
      name: '유리',
      content: '안녕하세요',
      img_url: 'https://img.jpg1',
      likes: 2,
      createdAt: '2023-05-13T07:45:56.000Z',
      updatedAt: '2022-07-25T07:52:09.000Z',
    },
  ]);

  //유저 미니프로필로 친구추가 모달 오픈 버튼 함수
  const showFollowProfileButtonHandler = () => {
    setShowProfileButtons(!showProfileButtons);
  };

  // 수정, 삭제 모달 오픈 버튼 함수
  const moreIconButtonClickHandler = () => {
    setShowButtons(!showButtons);
  };

  const onClickEditButtonHandler = () => {
    setShowBoardModal(!showBoardModal);
  };
  const onClickRemoveButtonHandler = () => {};

  // const posts = [
  //   {
  //     post_id: 1,
  //     user_id: '3',
  //     name: '유리',
  //     content: '안녕하세요',
  //     img_url: 'https://img.jpg1',
  //     likes: 3,
  //     createdAt: '2023-05-13T07:45:56.000Z',
  //     updatedAt: '2022-07-25T07:52:09.000Z',
  //   },
  //   {
  //     post_id: 2,
  //     user_id: '3',
  //     name: '유리',
  //     content: '안녕하세요',
  //     img_url: 'https://img.jpg1',
  //     likes: 2,
  //     createdAt: '2023-05-13T07:45:56.000Z',
  //     updatedAt: '2022-07-25T07:52:09.000Z',
  //   },
  //   {
  //     post_id: 3,
  //     user_id: '3',
  //     name: '유리',
  //     content: '안녕하세요',
  //     img_url: 'https://img.jpg1',
  //     likes: 1,
  //     createdAt: '2023-05-13T07:45:56.000Z',
  //     updatedAt: '2022-07-25T07:52:09.000Z',
  //   },
  //   {
  //     post_id: 4,
  //     user_id: '3',
  //     name: '유리',
  //     content: '안녕하세요',
  //     img_url: 'https://img.jpg1',
  //     likes: 2,
  //     createdAt: '2023-05-13T07:45:56.000Z',
  //     updatedAt: '2022-07-25T07:52:09.000Z',
  //   },
  // ];

  const date = (createdAt) => {
    getDayMinuteCounter(createdAt);
  };
  const nowDate = date(posts.createdAt);
  console.log(nowDate);

  const handleClickLike = async (post_id) => {
    try {
      console.log(post_id);
      const newLikeCheck = await likeChecked(post_id);
      setLikeCheck(newLikeCheck);

      const updatedPosts = posts.map((item) => {
        if (item.post_id === post_id) {
          if (newLikeCheck) {
            return { ...item, likes: item.likes + 1 };
          } else {
            return { ...item, likes: Math.max(item.likes - 1, 0) };
          }
        }
        return item;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posts.map((item) => {
        return (
          <div
            key={item.post_id}
            className='shadow-md overflow-hidden bg-white items-center mb-5'
          >
            <div className=' px-[12px] py-[12px] bg-wight-100 '>
              <div className='flex space-x-[420px] relative'>
                <div className='flex flex-low space-x-2'>
                  <img
                    className='h-9 w-9 flex-none rounded-full self-center'
                    src={default_profile_url}
                    alt=''
                    role='button'
                    onClick={showFollowProfileButtonHandler}
                  />
                  {showProfileButtons && (
                    <div className='absolute top-11'>
                      <FollowModal userName={item.name} />
                    </div>
                  )}
                  <div className=' flex-col '>
                    <div className='text-left'>{item.name}</div>
                    <div className='text-xs text-gray-600/50'>
                      {item.createdAt}
                    </div>
                  </div>
                </div>
                <div className='bg-cover bg-center object-contain self-center'>
                  <img
                    className='h-7 w-7 hover:bg-gray-200 rounded-full '
                    role='button'
                    src={seeMoreIcon}
                    alt=''
                    onClick={moreIconButtonClickHandler}
                  />
                  {showButtons && (
                    <div className='absolute right-0'>
                      <div className='pb-4 drop-shadow'>
                        <div className=' flex flex-col justify-center space-y-3 bg-white w-[120px] h-20  '>
                          <button onClick={onClickEditButtonHandler}>
                            수정
                          </button>
                          <button onClick={onClickRemoveButtonHandler}>
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {showBoardModal && (
                    <Modify
                      showBoardModal={showBoardModal}
                      setShowBoardModal={setShowBoardModal}
                    />
                  )}
                </div>
              </div>
              <div>
                <div className='text-left'>{item.content}</div>
              </div>
              <div>
                <img
                  className='h-[470px] w-[648px] object-contain'
                  src={item.img_url}
                  alt=''
                />
              </div>
              <div className='flex flex-row space-x-2 mt-2 ml-2'>
                <img
                  className='h-6 w-6 object-contain rounded-full hover:animate-shake '
                  role='button'
                  src={likeIcon}
                  alt='like'
                />
                {/* <span className='self-center'>회원님 외 {item.likes-1}개</span> */}
                <span className='self-center'>{item.likes}</span>
              </div>
              <div className='flex justify-start'>
                <button className='text-left border-solid w-full border-t-2 border-b-2 mt-3 p-2'>
                  <RiThumbUpLine
                    style={{ color: likeCheck ? 'red' : 'black' }}
                    onClick={() => handleClickLike(item.post_id)}
                  />
                  좋아요
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Board;
