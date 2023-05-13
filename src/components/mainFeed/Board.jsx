import React, { useState } from 'react'
import EditRemove from './EditRemove';
import FollowModal from './FollowModal';
import { getDayMinuteCounter } from './getDayMinuteCounter';

const Board = () => {
  const default_profile_url = '/images/default-profile-url.png';
  const seeMoreIcon = '/images/seeMoreIcon.png';
  const likeIcon = '/images/likeIcon.png';
  const [showButtons, setShowButtons] = useState(false);
  const [showProfileButtons, setShowProfileButtons] = useState(false);

  //유저 미니프로필로 친구추가 모달 오픈 버튼 함수
  const showFollowProfileButtonHandler = () => {
    setShowProfileButtons(!showProfileButtons)
  }

  //수정, 삭제 모달 오픈 버튼 함수
  const moreIconButtonClickHandler = ()=>{
    setShowButtons(!showButtons)
  }

  const posts = [
{
  post_id:1,
  user_id:"3",
  name:"유리",
  content:"안녕하세요",
  img_url:
  "https://img.jpg1",
  likes: 2,
  createdAt: "2023-05-13T07:45:56.000Z",
  updatedAt: "2022-07-25T07:52:09.000Z"
},
  ]
  const date = (createdAt)=>{
    getDayMinuteCounter(createdAt)
  }
  const nowDate= date(posts.createdAt)
  console.log(nowDate)
  return (
    <>
    {posts.map((item)=>{
      return(
      <div key={item.post_id} class="shadow-md overflow-hidden bg-white items-center">
        <div class=" px-[12px] py-[12px] bg-wight-100 p-2 border-2 border-red-500 ">
          <div class="flex space-x-56 relative">
            <div class="flex flex-low ">
              <img 
              class='h-9 w-9 flex-none rounded-full self-center'
              src={default_profile_url}
              alt='' role='button'
              onClick={showFollowProfileButtonHandler}/>
              {showProfileButtons && 
                <div class="absolute top-11">
                <FollowModal userName={item.name}/>
                </div>}
              <div class=" flex-col ">
              <div class="text-left">{item.name}</div>
              <div class="text-xs text-gray-600/50">{item.createdAt}</div>
            </div>
          </div>
          <div class="bg-cover bg-center object-contain self-center">
            <img class="h-7 w-7 hover:bg-gray-200 rounded-full "
              role='button'
              src={seeMoreIcon}
              alt=''
              onClick={moreIconButtonClickHandler}/>
              {showButtons && 
              <div class="absolute right-0">
              <EditRemove/>
              </div>}
          </div>
        </div>
          <div>
            <div class="text-left">
              {item.content}
            </div>
          </div>
          <div>
            <img class="h-[470px] w-[435px] object-contain"
            src={item.img_url}
            alt=''/>
          </div>
          <div class="flex flex-row space-x-2 mt-2 ml-2">
          <img class="h-8 w-8 object-contain rounded-full hover:animate-shake "
          role='button'
            src={likeIcon}
            alt=''/>
            <span class="self-center">{item.likes}개</span>
          </div>
        </div>
      </div>
    )})}
    </>
  )
}

export default Board

