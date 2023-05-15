import React from 'react'

const EditRemove = () => {

  const onClickEditButtonHandler = () => {

  }
  const onClickRemoveButtonHandler = () => {

  }
  return (
    <div class="pb-4 drop-shadow">
      <div class=" flex flex-col justify-center space-y-3 bg-white w-[120px] h-20  ">
        <button onClick={onClickEditButtonHandler}>수정</button>
        <button onClick={onClickRemoveButtonHandler}>삭제</button>
      </div>
    </div>
  )
}

export default EditRemove