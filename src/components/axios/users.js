import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
const jwtInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: Cookies.get("token"),
  },
});

//유저 검색
const userSearch = async (props) => {
  try {
    const response = await instance.get(`/api/user/${props}`)
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//팔로워 추가
const followUser = async (props) => {
  try {
    const response = await jwtInstance.post(`/api/follow`, {
      user_id: props
    })
    return response.data;
  } catch (error) {
    throw new Error(error.message)
  }
}

//팔로워 조회
const followList = async () => {
  try {
    const response = await jwtInstance.get(`/api/follow`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}


export { userSearch, followUser, followList }