import React from 'react';
import { PropagateLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='flex flex-col items-center text-white'>
        <PropagateLoader
          color='#1977F2'
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
        <p className='mt-10 text-lg text-center'>
          로딩중입니다. 
          <br />
          잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
}
