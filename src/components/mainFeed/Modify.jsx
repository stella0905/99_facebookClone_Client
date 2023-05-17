import { useRef, useState } from "react";
import useInput from "./useInput";
import { QueryClient, useMutation } from "react-query";
import { modifyPost } from "api/board";

const Modify = ({ showBoardModal, setShowBoardModal, content, postId, name, imageUrl, imageId }) => {
    // console.log(imageId);
    const default_profile_url = "/images/default-profile-url.png";
    const closeIcon = "/images/close.png";
    // const imageAddIcon = "/images/imageAddIcon.png";

    // 파일 수정
    const mutation = useMutation(modifyPost, {
        onSuccess: () => {
            QueryClient.invalidateQueries("posts");
            // setShowBoardModal(false);
        },
        onError: (error) => {
            // 에러 처리
            console.error(error);
        },
    });

    const [post, postChangeHandler] = useInput(content);
    const [button, setButton] = useState(false);
    // const [dragging, setDragging] = useState(false);

    // const handleFileChange = (event) => {
    //     const files = event.target.files;
    //     // 파일 처리 로직 작성
    //     console.log(files);
    // };

    // 수정될 이미지에 대한 상태 관리와 현재 이미지 삭제 관리
    const [image, setImage] = useState(imageUrl);
    const fileInputRef = useRef(null); // 이미지 클릭시 바로 파일선택창이 뜨게하기 위한 입력 참조 생성

    // const [isImageRemoved, setIsImageRemoved] = useState(false);

    // 이미지 클릭되었을 때 핸들러
    const handleImageClick = () => {
        // setImage(null); // 이미지 제거
        // setIsImageRemoved(true); // 이미지 제거 상태 설정
        fileInputRef.current.click();
    };

    // 파일 변경과 미리보기 핸들러
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage(image);
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

    // const handleDragEnter = (event) => {
    //     event.preventDefault();
    //     setDragging(true);
    // };

    // const handleDragLeave = (event) => {
    //     event.preventDefault();
    //     setDragging(false);
    // };

    // const handleDrop = (event) => {
    //     event.preventDefault();
    //     setDragging(false);

    //     const files = event.dataTransfer.files;

    //     // 파일 처리 로직 작성
    //     console.log(files);

    //     // 추가적인 파일 처리 로직을 작성하세요.
    // };

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
                        <img className="h-9 w-9 flex-none rounded-full self-center" src={default_profile_url} alt="" />
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
                    {/* <div className="bg-green-200 w-[550px] h-[300px] rounded-lg"></div> */}

                    {/* <div classNameName="max-w-xl">
                        <div
                            classNameName={`p-2 bg-white border-solid border-2 border-gray-300 rounded-lg ${
                                dragging ? "bg-gray-200" : ""
                            }`}
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <label classNameName="flex justify-center w-full h-[300px] px-4 transition bg-gray-50 rounded-md appearance-none cursor-pointer hover:bg-gray-200 focus:outline-none">
                                <span classNameName="flex flex-col justify-center items-center space-x-2">
                                    <div classNameName="bg-gray-300 rounded-full hover:bg-gray-500">
                                        <img classNameName="w-9 h-9" src={imageAddIcon} alt="" />
                                    </div>
                                    <span classNameName="font-medium text-gray-600 flex items-center text-[20px]">
                                        사진/동영상 추가
                                    </span>
                                    <span classNameName="text-[14px] text-gray-500">또는 끌어서 놓습니다.</span>
                                </span>
                                <input
                                    type="file"
                                    name="file_upload"
                                    classNameName="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div> */}
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
                            {/* 👇 imagePreviewUrl 값이 존재한다면 그 이미지를 보여주고 아니라면 사진/동영상 추가화면출력 */}
                            {/* {imagePreviewUrl ? (
                                <div className="flex justify-center items-center overflow-hidden h-[300px]">
                                    <img src={imagePreviewUrl} alt="preview" />
                                </div>
                            ) : ( */}
                            {/* <label className="flex justify-center w-full h-[300px] px-4 transition bg-gray-50  rounded-md appearance-none cursor-pointer hover:bg-gray-200 focus:outline-none">
                                <span className="flex flex-col justify-center items-center space-x-2\">
                                    <div className="bg-gray-300 rounded-full hover:bg-gray-500">
                                        <img className="w-9 h-9 " src={imageAddIcon} alt="" />
                                    </div>
                                    <span className="font-medium text-gray-600 flex items-center text-[20px]">
                                        사진/동영상 추가
                                    </span>
                                    <span className="text-[14px] text-gray-500">또는 끌어서 놓습니다.</span>
                                </span>
                                <input
                                    type="file"
                                    name="file_upload"
                                    className="hidden"
                                    // onChange={(e) => handleImageChange(e)}
                                />
                            </label> */}
                            {/* )} */}
                        </div>
                    </div>

                    <div
                        className="bg-[#1b6dd8] text-white rounded-lg w-[550px] p-2 text-center  mt-5"
                        role="button"
                        onClick={() => {
                            mutation.mutate({ postId, postContent: post, image, imageId });
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
