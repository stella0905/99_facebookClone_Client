import React from 'react'
import useInput from './useInput';

const BoardMakerModal = () => {
  const default_profile_url = '/images/default-profile-url.png';
  const [post,postChangeHandler] = useInput('')
  return (

    <div class="bg-red-200 h-[600px] w-[580px] relative; top-[50%] left-[50%] translate-[50%,50%] p-4 max-w-[600px] min-w-[300px]">
    <div>
      <div class="border-b-2 pb-4">게시물 만들기</div>
      <div class="flex flex-row space-x-2 mt-3">
    <img 
      class='h-9 w-9 flex-none rounded-full self-center'
      src={default_profile_url}
      alt=''/>
      <div class="text-left">유리</div>
      </div>
      <form method="post" encType="multipart/form-data" onSubmit={(e) => { e.preventDefault(); }}>
      <textarea class="bg-transparent resize-none2 w-[550px] mt-2 outline-none "
      value={post} onChange={postChangeHandler}/>
      <div class="border-2-black w-[550px] y-[500px]"/>
      </form>
    </div>
    </div>

  )
}

export default BoardMakerModal