import React, { useState } from "react";
import FollowModal from "./FollowModal";
import { getDayMinuteCounter } from "./getDayMinuteCounter";
import Modify from "./Modify";
import { deletePost, getPosts } from "api/board";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";

const Board = () => {
    const default_profile_url = "/images/default-profile-url.png";
    const seeMoreIcon = "/images/seeMoreIcon.png";
    const likeIcon = "/images/likeIcon.png";

    const queryClient = useQueryClient();

    // 각 게시물 수정, 삭제 모달 state 관리
    // const [showButtons, setShowButtons] = useState(false);
    const [showButtons, setShowButtons] = useState({});

    const [showProfileButtons, setShowProfileButtons] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBoardModal, setShowBoardModal] = useState(false);

    // 게시글 조회
    const { data, isLoading, isError } = useQuery("posts", getPosts);
    console.log(data);

    // console.log(data);

    // 유저 미니프로필로 친구추가 모달 오픈 버튼 함수
    const showFollowProfileButtonHandler = () => {
        setShowProfileButtons(!showProfileButtons);
    };

    // 수정, 삭제 모달 오픈 버튼 함수
    const moreIconButtonClickHandler = (postId) => {
        setShowButtons((prevState) => ({ ...prevState, [postId]: !prevState[postId] }));
    };

    const onClickEditButtonHandler = () => {
        setShowBoardModal(!showBoardModal);
    };

    // 게시글 삭제
    const mutation = useMutation(deletePost, {
        onSuccess: () => {
            QueryClient.invalidateQueries("posts");
            alert("게시글이 삭제되었습니다!");
        },
        onError: (error) => {
            switch (error) {
                case "게시글 삭제에 실패 하였습니다.":
                    alert("게시글을 삭제하는데 실패하였습니다. 다시 시도해 주세요.");
                    break;
                case "존재하지않거나, 이미 삭제된 게시물입니다.":
                    alert("이미 삭제되었거나 존재하지 않는 게시글입니다.");
                    break;
                case "게시글 삭제 권한이 없습니다.":
                    alert("게시글을 삭제할 권한이 없습니다.");
                    break;
                case "로그인이 필요한 기능입니다.":
                    alert("로그인이 필요한 기능입니다. 로그인해 주세요.");
                    // 로그인 페이지 이동 처리 필요.
                    break;
                default:
                // alert("알 수 없는 오류가 발생했습니다."); // 삭제 속도가 느려서 알수없는 오류 코드가 뜸.
            }
        },
    });
    // 에러 넘버링에 따라 처리되어야 하지 않나....?

    // 게시글 삭제 핸들러
    const onClickRemoveButtonHandler = (postId) => {
        mutation.mutate(postId);
    };

    // ✅ 사용 용도 체크하기
    // const date = (createdAt) => {
    //     getDayMinuteCounter(createdAt);
    // };
    // const nowDate = date(posts.createdAt);
    // console.log(nowDate);

    if (isLoading) {
        return <div>로딩중입니다.</div>;
    }

    if (isError || !data || !data.findAllPost) {
        return <div>오류가 발생했습니다!</div>;
    }

    const postData = data.findAllPost;
    const imageData = data.findAllImg;

    return (
        <>
            {postData.map((item) => {
                // post_id와 일치하는 이미지 url 찾기. -> url이 존재하지 않으면 default 이미지 사용
                const imageItem = imageData.find((img) => img.post_id === item.post_id);
                const imageUrl = imageItem ? imageItem.img_url : "default_image_url";

                return (
                    <div key={item.post_id} class="shadow-md overflow-hidden bg-white items-center mb-5">
                        <div class=" px-[12px] py-[12px] bg-wight-100 ">
                            <div class="flex space-x-[420px] relative">
                                <div class="flex flex-low space-x-2">
                                    <img
                                        class="h-9 w-9 flex-none rounded-full self-center"
                                        src={default_profile_url}
                                        alt=""
                                        role="button"
                                        onClick={showFollowProfileButtonHandler}
                                    />
                                    {showProfileButtons && (
                                        <div class="absolute top-11">
                                            <FollowModal userName={item.name} />
                                        </div>
                                    )}
                                    <div class=" flex-col ">
                                        <div class="text-left">{item.name}</div>
                                        <div class="text-xs text-gray-600/50">{item.createdAt}</div>
                                    </div>
                                </div>
                                <div class="bg-cover bg-center object-contain self-center">
                                    <img
                                        class="h-7 w-7 hover:bg-gray-200 rounded-full "
                                        role="button"
                                        src={seeMoreIcon}
                                        alt=""
                                        // onClick={moreIconButtonClickHandler}
                                        onClick={() => moreIconButtonClickHandler(item.post_id)}
                                    />
                                    {/* {showButtons && ( */}
                                    {showButtons[item.post_id] && (
                                        <div class="absolute right-0">
                                            <div class="pb-4 drop-shadow">
                                                <div class=" flex flex-col justify-center space-y-3 bg-white w-[120px] h-20  ">
                                                    <button onClick={onClickEditButtonHandler}>수정</button>
                                                    <button onClick={() => onClickRemoveButtonHandler(item.post_id)}>
                                                        삭제
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {showBoardModal && (
                                        <Modify showBoardModal={showBoardModal} setShowBoardModal={setShowBoardModal} />
                                    )}
                                </div>
                            </div>
                            <div>
                                <div class="text-left">{item.content}</div>
                            </div>
                            <div>
                                <img class="h-[470px] w-[648px] object-contain" src={imageUrl} alt="" />
                            </div>
                            <div class="flex flex-row space-x-2 mt-2 ml-2">
                                <img
                                    class="h-8 w-8 object-contain rounded-full hover:animate-shake "
                                    role="button"
                                    src={likeIcon}
                                    alt=""
                                />
                                <span class="self-center">{item.likes}개</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Board;
