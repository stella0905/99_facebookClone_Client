import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
const jwtInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: Cookies.get("Authorization"),
    refreshtoken: Cookies.get("refreshtoken")
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
  console.log('나는 팔로워 추가 ', props)
  try {
    const response = await jwtInstance.post(`/api/follow`, {
      follower_user_id: props
    })
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

//팔로워 조회
const followList = async () => {
  try {
    const response = await jwtInstance.get(`/api/follow`)
    console.log('response', response)
    return response.data.follow
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

//팔로워 삭제
const followDelete = async (props) => {
  console.log('삭제할 props:', props)
  try {
    const response = await jwtInstance.delete(`/api/follow/${props}`)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}


export { userSearch, followUser, followList, followDelete }