import React, { useState } from 'react'
import Board from './Board'
import BoardMaker from './BoardMaker'
import BoardMakerModal from './BoardMakerModal'

const MainFeed = () => {
  const [showBoardModal, setShowBoardModal] = useState(false)


  return (
    <div class="text-center relative ">
      <div class="w-[680px] m-auto ">
        <div class="my-5">
        <BoardMaker showBoardModal={showBoardModal} setShowBoardModal={setShowBoardModal}/>
        {showBoardModal && 
              <div class=" absolute top-30 translate-x-[50%,50%] z-10">
                <BoardMakerModal/>
              </div>}
        </div>
        <Board/>
      </div>
    </div>
  )
}

export default MainFeed