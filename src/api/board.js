// api.js
import axios from "axios";
import Cookies from "js-cookie";

// 포스트 작성
export const addPost = async ({ post, file }) => {
    console.log(file);
    try {
        // console.log(post);
        const formData = new FormData();
        formData.append("content", post);
        formData.append("img", file);

        // for (let [key, value] of formData.entries()) {
        //     if (value instanceof File) {
        //         console.log(`${key}: ${value.name}, ${value.size}`);
        //     } else {
        //         console.log(`${key}: ${value}`);
        //     }
        // }

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}api/post`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: Cookies.get("Authorization"),
                refreshtoken: Cookies.get("refreshtoken"),
            },
        });

        return response.data;
    } catch (error) {
        // error 처리
        console.error(error);
        throw error;
    }
};
