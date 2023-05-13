import React from 'react';
import ChatInput from './ChatInput';
import ChatFollowInfo from './ChatFollowInfo';

const ChatBox = ({ follow }) => {
  const { profile_url } = follow;
  return (
    <div className='bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto'>
      <div className='flex items-center justify-between mb-4'>
        <ChatFollowInfo follow={follow} />
      </div>
      <div className='chat-boxs'>
        <div className='chat-box'>
          <p className='text-sm text-center text-gray-800 mb-10'>
            (토) 오전 18:03
          </p>
          <div className='flex items-end'>
            <div className='flex flex-col space-y-1 text-xs max-w-xs mx-2 order-2 items-start'>
              <div>
                <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600'>
                  안녕
                </span>
              </div>
              <div>
                <span className='px-4 py-2 rounded-lg inline-block rounded-tl-none bg-gray-300 text-gray-600'>
                  항해99 알아?
                </span>
              </div>
              <div>
                <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600'>
                  그럼 연락할게
                </span>
              </div>
            </div>
            <img
              className='w-6 h-6 rounded-full'
              src={profile_url}
              alt='profile_url'
            />
          </div>
        </div>
        <div className='chat-message'>
          <div className='flex items-end justify-end'>
            <div className='flex flex-col space-y-1 text-xs max-w-xs mx-2 order-1 items-end'>
              <div>
                <span className='px-4 py-2 rounded-lg inline-block rounded-br-none bg-brand text-white'>
                  오 재밌겠다
                </span>
              </div>
              <div>
                <span className='px-4 py-2 rounded-lg inline-block rounded-tr-none bg-brand text-white'>
                  같이 하자!
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='chat-message'>
          <div className='flex items-end'>
            <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
              <div>
                <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600'>
                  ㅇㅋㅇㅋ
                </span>
              </div>
              <div>
                <span className='px-4 py-2 rounded-lg inline-block rounded-tl-none bg-gray-300 text-gray-600'>
                  나랑 같이 코딩할래?
                </span>
              </div>
            </div>
            <img
              className='w-6 h-6 rounded-full'
              src={profile_url}
              alt='profile_url'
            />
          </div>
        </div>
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatBox;
