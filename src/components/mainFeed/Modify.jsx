import { modifyPost } from "api/board";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import useInput from "./useInput";
import { Navigate } from "react-router-dom";

// imageId 중 삭제될 imageId 값만을 골라내 api로 전달하는 로직 구현 필요.
const Modify = ({ setShowBoardModal, content, postId, name, imageUrl, imageId, profileUrl }) => {
    // const storedUser = localStorage.getItem("user");
    // console.log(user);
    // const user = JSON.parse(storedUser);
    // if (!user) {
    //     Navigate("/login");
    // }

    const default_profile_url = "/images/default-profile-url.png";
    const closeIcon = "/images/close.png";

    const queryClient = useQueryClient();
    // 파일 수정
    const mutation = useMutation(modifyPost, {
        onSuccess: () => {
            queryClient.invalidateQueries("posts");
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const [post, postChangeHandler] = useInput(content);
    //setButton는 필요해서 지우지 않음
    const [button, setButton] = useState(false);

    // 수정될 이미지에 대한 상태 관리와 현재 이미지 삭제 관리
    const [image, setImage] = useState(imageUrl);
    const [file, setFile] = useState(null); // 새로 추가될 이미지 파일을 저장할 state 추가
    const fileInputRef = useRef(null); // 이미지 클릭시 바로 파일 선택창이 뜨게하기 위한 입력 참조 생성

    // 이미지 클릭되었을 때 핸들러
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // 파일 변경과 미리보기 핸들러
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
            setFile(file);
        };

        if (file) {
            reader.readAsDataURL(file);
            // setFile(file);
        } else {
            setImage(file);
        }
    };

    //모달창 닫기
    const closeButtonHandler = () => {
        setShowBoardModal(false);
        if (post.length > 0) {
            setButton(true);
        } else {
            setButton(false);
        }
    };

    return (
        <div className="h-screen w-screen top-0 left-0 right-0 bottom-0 fixed bg-gray-200 bg-opacity-50 z-10">
            <div className="bg-white h-[600px] w-[580px] relative top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 max-w-600 min-w-300 rounded-lg shadow-2xl">
                <div>
                    <div className="border-b-2 pb-4 relative text-[20px] font-semibold">게시물 수정</div>

                    <div
                        className="h-10 w-10 rounded-full bg-gray-200  hover:bg-gray-300 absolute right-3 top-3 flex items-center justify-center"
                        role="button"
                        onClick={closeButtonHandler}
                    >
                        <img className="h-7 w-7 " src={closeIcon} alt="" />
                    </div>
                    <div className="flex flex-row space-x-2 mt-3">
                        <img className="h-9 w-9 flex-none rounded-full self-center" src={profileUrl} alt="" />
                        <div className="text-left">{name}</div>
                    </div>
                    <form
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <textarea
                            rows={3}
                            className="bg-transparent resize-none w-[550px] mt-2 outline-none "
                            value={post}
                            onChange={postChangeHandler}
                        />
                    </form>
                    <div className="max-w-xl">
                        <div className=" p-2 bg-white border-solid border-2 border-gray-300 rounded-lg">
                            <div className="flex justify-center items-center overflow-hidden h-[300px]">
                                <img src={image} alt="preview" onClick={handleImageClick} />
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-[#1b6dd8] text-white rounded-lg w-[550px] p-2 text-center  mt-5"
                        role="button"
                        onClick={() => {
                            mutation.mutate({ postId, postContent: post, file, imageId });
                            setShowBoardModal(false);
                            if (post.length > 0) {
                                setButton(true);
                            } else {
                                setButton(false);
                            }
                        }}
                    >
                        수정
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modify;
