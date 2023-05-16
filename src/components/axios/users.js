import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
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

export { userSearch }