import React from 'react';
import ChatBox from 'components/Chat/ChatBox';

const Chat = () => {
  const follow = {
    follow_id: 1,
    follow_name: '최유리',
    profile_url:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JTA4cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <>
      <ChatBox follow={follow} />
    </>
  );
};

export default Chat;
