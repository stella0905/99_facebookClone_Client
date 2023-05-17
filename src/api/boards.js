import axios from 'axios';
const API_URL = process.env.REACT_APP_SERVER_URL;

// 인스턴스 생성
export const api = axios.create({
  baseURL: API_URL,
});

// 좋아요 API
export const likeChecked = async (post_id) => {
  try {
    const response = await api.post(`/api/like/${post_id}`);
    const message = response.data.message;
    let likeCheck = false;
    if (message.includes('등록')) {
      likeCheck = true;
    } else if (message.includes('취소')) {
      likeCheck = false;
    }
    return likeCheck;
  } catch (error) {
    alert(error.message);
  }
};
