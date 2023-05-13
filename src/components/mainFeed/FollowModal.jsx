import React from 'react'

const FollowModal = (props) => {
  const default_profile_url = '/images/default-profile-url.png';
  const followIcon = '/images/followIcon.png';

  return (
    <div class="flex flex-col bg-white p-3 w-[240px] pb-4 drop-shadow">
      <div class="flex flex-row gap-2">
      <img 
        class='h-11 w-11 flex-none rounded-full self-center'
        src={default_profile_url}
        alt=''/>
        <span>{props.userName}</span>
      </div>
      <div class="self-end">
        <button class="bg-[#1977F1] h-8 w-32 ">
          <div class="flex flex-row justify-center ">
            <img class="w-7 h-6"
            src={followIcon}/>
            <div class="self-center text-white">친구추가</div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default FollowModal
