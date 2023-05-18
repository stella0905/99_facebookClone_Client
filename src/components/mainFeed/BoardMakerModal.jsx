import { useState } from "react";
import useInput from "./useInput";
import { useMutation } from "react-query";
import { createPost } from "api/board";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";

const BoardMakerModal = ({ setShowBoardModal, showBoardModal }) => {
    const default_profile_url = "/images/default-profile-url.png";
    const closeIcon = "/images/close.png";
    const imageAddIcon = "/images/imageAddIcon.png";
    const [loading, setLoading] = useState(false);

    // post text 작성
    const [post, postChangeHandler] = useInput("");
    const [button, setButton] = useState(false);

    const isValidUrl = (url) => {
        const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
        return pattern.test(url);
    };

    //모달창 닫기
    const closeButtonHandler = () => {
        setShowBoardModal(!showBoardModal);
        if (post.length > 0) {
            setButton(!button);
        }
    };

    // 드래그앤 드랍
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            let reader = new FileReader();
            let selectedFile = e.dataTransfer.files[0];

            reader.onloadend = () => {
                setFile(selectedFile);
                setImagePreviewUrl(reader.result);
            };

            // 올린 사진 파일 읽기
            if (selectedFile) {
                reader.readAsDataURL(selectedFile);
            }
            e.dataTransfer.clearData();
        }
    };

    const navigate = useNavigate();

    //로컬스토리지에서 유저정보 불러오고 값이 없다면 로그인 화면으로 이동
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser);
    if (!user) {
        navigate("/login");
    }

    // 게시글 작성
    const mutation = useMutation(createPost, {
        onSuccess: (response) => {
            setLoading(false);
            alert("게시물이 작성되었습니다.");
            setShowBoardModal(false);
        },
        onError: (error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        alert("요청한 데이터 형식이 올바르지 않습니다.");
                        break;
                    case 412:
                        alert("게시글 내용을 입력해 주세요.");
                        break;
                    case 401:
                        alert("로그인이 필요한 기능입니다.");
                        break;
                    default:
                        alert(`${error.message} 게시글을 작성하는데 실패했습니다.`);
                }
            } else {
                alert(`${error.message} 네트워크 연결을 확인해주세요.`);
            }
            setLoading(false);
        },
    });
    const handleSubmit = async () => {
        setLoading(true);
        mutation.mutate({ post, file });
    };

    // 이미지 파일 상태 관리
    const [file, setFile] = useState(null);

    // 이미지 미리보기 파일 관리
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let selectedFile = e.target.files[0];

        reader.onloadend = () => {
            setFile(selectedFile);
            setImagePreviewUrl(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile); // 올린 사진 파일 읽기
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="h-screen w-screen top-0 left-0 right-0 bottom-0 fixed bg-gray-200 bg-opacity-50 z-10">
                    <div className="bg-white h-[600px] w-[580px] relative top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 max-w-600 min-w-300 rounded-lg shadow-2xl">
                        <div>
                            <div className="border-b-2 pb-4 relative text-[20px] font-semibold">게시물 만들기</div>

                            <div
                                className="h-10 w-10 rounded-full bg-gray-200  hover:bg-gray-300 absolute right-3 top-3 flex items-center justify-center"
                                role="button"
                                onClick={closeButtonHandler}
                            >
                                <img className="h-7 w-7 " src={closeIcon} alt="" />
                            </div>
                            <div className="flex flex-row space-x-2 mt-3">
                                <img
                                    className="h-9 w-9 flex-none rounded-full self-center"
                                    src={isValidUrl(user.profile_url) ? user.profile_url : default_profile_url}
                                    alt=""
                                />
                                <div className="text-left">{user.name}</div>
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
                                    {/* 👇 imagePreviewUrl 값이 존재한다면 그 이미지를 보여주고 아니라면 사진/동영상 추가화면출력 */}
                                    {imagePreviewUrl ? (
                                        <div className="flex justify-center items-center overflow-hidden h-[300px]">
                                            <img src={imagePreviewUrl} alt="preview" />
                                        </div>
                                    ) : (
                                        <label
                                            className="flex justify-center w-full h-[300px] px-4 transition bg-gray-50  rounded-md appearance-none cursor-pointer hover:bg-gray-200 focus:outline-none"
                                            onDragOver={handleDragOver} // 드래그앤 드랍
                                            onDragEnter={handleDragEnter}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
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
                                                onChange={(e) => handleImageChange(e)}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div
                                className="bg-[#1b6dd8] text-white rounded-lg w-[550px] p-2 text-center  mt-5"
                                role="button"
                                onClick={handleSubmit}
                            >
                                게시
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BoardMakerModal;
