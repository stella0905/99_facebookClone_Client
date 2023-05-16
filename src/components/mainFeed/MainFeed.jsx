import React from 'react';
import Board from './Board';
import BoardMaker from './BoardMaker';

const MainFeed = () => {
  return (
    <div className='text-center'>
      <div className='w-[680px] m-auto '>
        <div className='my-5'>
          <BoardMaker />
        </div>
        <Board />
      </div>
    </div>
  );
};

export default MainFeed;
