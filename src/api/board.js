// api.js
import axios from "axios";
import Cookies from "js-cookie";

// 포스트 작성
export const addPost = async ({ post, file }) => {
    console.log(file);
    try {
        const formData = new FormData();
        formData.append("content", post);
        formData.append("img", file);
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/post`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: Cookies.get("Authorization"),
                refreshtoken: Cookies.get("refreshtoken"),
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 포스트 조회
export const getPosts = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/post`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// 포스트 삭제
export const deletePost = async (postId) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`, {
            headers: {
                Authorization: Cookies.get("Authorization"),
                refreshtoken: Cookies.get("refreshtoken"),
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 좋아요
export const likePost = async (postId) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/like/${postId}`);
        const message = response.data.message;
        let likeCheck = false;
        if (message.includes("등록")) {
            likeCheck = true;
        } else if (message.includes("취소")) {
            likeCheck = false;
        }
        return { likeCheck, message };
    } catch (error) {
        throw error;
    }
};

// 게시글 수정
export const modifyPost = async ({ postId, postContent, image, imageId }) => {
    // console.log(`포스트 아이디`, postId);
    // console.log(`포스트 콘텐츠`, postContent);
    // console.log(`포스트 이미지`, image);
    // console.log(`포스트 이미지아이디`, imageId);

    try {
        const formData = new FormData();
        formData.append("content", postContent);
        formData.append("addImg", image);
        // 아직 다중이미지 처리가 되어있지 않기 때문에
        // 만약 게시글의 이미지 파일에 수정 사항이 없다면 imageId는 제거 될 Id가 보내지면 안됨. -> 우선 null 으로 처리
        formData.append("removeImgId", [imageId]);

        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}api/post/${postId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: Cookies.get("Authorization"),
                refreshtoken: Cookies.get("refreshtoken"),
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
