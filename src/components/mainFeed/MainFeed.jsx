import React from 'react'
import Board from './Board'
import BoardMaker from './BoardMaker'

const MainFeed = () => {
  return (
    <div class="text-center">

      <div class="w-[468px] m-auto border-2 border-sky-500">
        <div class="my-5">
        <BoardMaker/>
        </div>
        <Board/>
      </div>
    </div>
  )
}

export default MainFeed