import { useState } from 'react';
import BoardMakerModal from './BoardMakerModal';

const BoardMaker = () => {
  const default_profile_url = '/images/default-profile-url.png';
  const img_file_url = '/images/imgfile.png';
  const [showBoardModal, setShowBoardModal] = useState(false)



  const BoardMakerModalHandler = () =>{
    setShowBoardModal(!showBoardModal)
  }

  return (
    <div class="shadow-md overflow-hidden  bg-white " >
      <div class="h-[115px] flex flex-col px-[12px] py-[12px] bg-wight-100">
        <div class="flex space-x-2 border-b-2 ">
          <img 
          class='h-9 w-9 flex-none rounded-full '
          src={default_profile_url}
          alt='' role='button'/>
          <div class='bg-gray-100 hover:bg-gray-200 h-[35px] w-[610px] rounded-full border-2 px-[8px] py-[12px] mb-3' role='button' onClick={BoardMakerModalHandler}>
          </div>
          {showBoardModal && <BoardMakerModal showBoardModal={showBoardModal} setShowBoardModal={setShowBoardModal}/>}
        </div>
        <div class='flex justify-center space-x-3 p-2 hover:bg-gray-200 w-[200px] self-center mt-2'>
          <img class="h-6 w-6 flex-none"
          src={img_file_url}
          alt=''/>
          <span>사진/동영상</span>
        </div>
      </div>
    </div>
  )
}

export default BoardMaker