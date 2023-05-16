import React from 'react'

const FollowModal = (props) => {
  const default_profile_url = '/images/default-profile-url.png';
  const followIcon = '/images/followIcon.png';

  return (
    <div className="flex flex-col bg-white p-3 w-[240px] pb-4 drop-shadow">
      <div className="flex flex-row gap-2">
      <img 
        className='h-11 w-11 flex-none rounded-full self-center'
        src={default_profile_url}
        alt=''/>
        <span>{props.userName}</span>
      </div>
      <div className="self-end">
        <button className="bg-[#1977F1] h-8 w-32 ">
          <div className="flex flex-row justify-center ">
            <img className="w-7 h-6"
            src={followIcon}/>
            <div className="self-center text-white">친구추가</div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default FollowModal
