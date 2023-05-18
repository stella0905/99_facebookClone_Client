// api.js
import axios from "axios";
import Cookies from "js-cookie";

// 포스트 작성
export const createPost = async ({ post, file }) => {
    // console.log(`포스트 작성 파일 체크`, file);
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
        const errorMessage = error.response.data.message;
        throw errorMessage;
    }
};

// 게시글 수정
export const modifyPost = async ({ postId, postContent, file, imageId }) => {
    try {
        console.log(file);
        const formData = new FormData();
        formData.append("content", postContent);

        // image 가 url 이면 removeImgId, 아니라면 추가될 image 와 삭제될 image 다보내주기
        if (typeof file === "string" && (file.startsWith("http") || file.startsWith("https"))) {
            formData.append("img", file);
            formData.append("removeImgId", [null]);
        } else {
            formData.append("img", file);
            formData.append("removeImgId", [imageId]);
        }

        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/post/${postId}`, formData, {
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
