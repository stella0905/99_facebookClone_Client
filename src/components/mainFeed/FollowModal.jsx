import { followUser } from 'api/users';
import React from 'react'
import { useMutation, useQueryClient } from 'react-query';

const FollowModal = ({data,showProfileButtons,setShowProfileButtons}) => {

  const default_profile_url = '/images/default-profile-url.png';
  const followIcon = '/images/followIcon.png';
  const queryClient = useQueryClient();
  
  const mutation = useMutation(followUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("followList")
      setShowProfileButtons(!showProfileButtons)
    },
    onError:(error) => {
      alert(error.message)
    }
  });

  const isValidUrl=(url)=>{
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
    return pattern.test(url);
  }

  //친구추가 버튼
  const followUserButtonHandler = (id) =>{
    mutation.mutate(id)
  }
  return (
    <div className="flex flex-col bg-white p-3 w-[240px] pb-4 drop-shadow">
      <div className="flex flex-row gap-2">
      <img 
        className='h-11 w-11 flex-none rounded-full self-center'
        src={isValidUrl(data.profile_url) ? data.profile_url : default_profile_url}
        alt=''/>
        <span>{data.name}</span>
      </div>
      <div className="self-end">
        <button className="bg-[#1977F1] h-8 w-32 ">
          <div className="flex flex-row justify-center "
          role='button'
          onClick={()=>followUserButtonHandler(data.user_id)}>
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
