import React from 'react';
import { CiPaperplane } from 'react-icons/ci';

const ChatInput = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='relative'>
      <form
        className='flex justify-center items-center mt-5'
        onSubmit={handleSubmit}
      >
        <label htmlFor='chat' className='sr-only'>
          chat
        </label>
        <div className='w-11/12 flex items-center'>
          <input
            type='text'
            id='chat'
            className='bg-gray-100 text-sm w-full rounded-full pl-5 pr-2.5 py-2.5 placeholder-gray-600'
            placeholder='Aa'
          />
          <button
            type='submit'
            className=' flex items-center absolute inset-y-0 right-0 pr-10'
          >
            <CiPaperplane className='w-4 h-4 text-gray-500' />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
