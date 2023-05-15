import FollowItem from './FollowItem';

const FollowList = () => {
  const follows = [
    {
      follow_id: 1,
      follwer_name: '강준석',
      profile_url: '',
    },
    {
      follow_id: 2,
      follwer_name: '김용식',
      profile_url: '',
    },
    {
      follow_id: 3,
      follwer_name: '변수정',
      profile_url:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      follow_id: 4,
      follwer_name: '오성인',
      profile_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      follow_id: 5,
      follwer_name: '이영은',
      profile_url:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      follow_id: 6,
      follwer_name: '최유리',
      profile_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JTA4cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      follow_id: 7,
      follwer_name: '홍준상',
      profile_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className='mr-3 my-3 w-70'>
      <p className='text-xl font-bold leading-6 text-gray-900 my-1'>
        친구 목록
      </p>
      <ul>
        {follows?.map((follow) => (
          <FollowItem key={follow.follow_id} follow={follow} />
        ))}
      </ul>
    </div>
  );
};

export default FollowList;
