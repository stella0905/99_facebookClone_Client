import axios from 'axios';
import Cookies from 'js-cookie';
const API_URL = process.env.REACT_APP_SERVER_URL;

// 인스턴스 생성
export const api = axios.create({
  baseURL: API_URL,
});

// api 요청 전에 , Access Token 값 전송
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('Authorization');
    if (token) {
      // Access Token을 Bearer 토큰 형태로 설정하여 전송
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 회원가입 API
export const signUpUser = async (formData) => {
  try {
    const response = await api.post(`/api/auth/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert(response.data.message);
    return response.data;
  } catch (error) {
    const {
      response: {
        data: { errorMessage },
      },
    } = error;
    throw new Error(errorMessage);
  }
};

// 로그인 API
export const loginUser = async (user) => {
  const { email, password } = user;
  try {
    const response = await api.post(`/api/auth/login`, {
      email,
      password,
    });
    if (!response || !response.data) {
      throw new Error('response 없음:::::::', response);
    }
    const { Authorization, refreshtoken } = response.data;
    const { name, profile_url } = response.data.loginData;

    return {
      Authorization,
      refreshtoken,
      name,
      profile_url
    };
  } catch (error) {
    if (error.response && error.response.status === 412) {
      throw new Error(error.response.data.errorMessage);
    } else {
      throw error;
    }
  }
};

// 로그아웃 api
export const logoutUser = async (user) => {
  Cookies.remove('Authorization');
  Cookies.remove('refreshtoken');
};
// accesstoken이 만료되면, refreshtoken 붙여 보냄
// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 토큰 만료-> access 만료되면 메시지 받아서 refresh token을 다시 보냄
    if (error.response) {
      const { status, data } = error.response;
      const { errorMessage } = data;

      if (status === 401) {
        // 토큰값이 없으면 재로그인(accessToken)
        // 액세스 있고 리프레쉬 없으면?  >>> 자동으로 재발급? / 우리가 넣어줘야하는지

        // 리프레시 있는데 액세스 없으면 서버에서 자동재발급해서 넣어줌
        Cookies.remove('Authorization');
        Cookies.remove('refreshtoken');
        window.location.reload();

        // 로그인 인증 실패
        // const refresh = Cookies.get('refreshtoken');
        // if (!refresh) {
        //   // 만료된 refresh token이 없는 경우
        //   Cookies.remove('Authorization');
        //   Cookies.remove('refreshtoken');
        //   // window.location.reload();

        // } else {
        //   try {
        //     // refresh token을 이용해 새로운 access token을 받아옴
        //     const newAccessToken = data.ACCESS_KEY;
        //     const newRefreshToken = data.REFRESH_KEY;
        //     Cookies.set('Authorization', newAccessToken);
        //     Cookies.set('refreshtoken', newRefreshToken);

        //     // 원래 요청에 대한 새로운 access token을 설정하여 다시 요청
        //     error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        //     return api.request(error.config);
        //   } catch (err) {
        //     // refresh token을 이용해 새로운 access token을 받아오는 과정에서 에러가 발생한 경우
        //     Cookies.remove('Authorization');
        //     Cookies.remove('refreshtoken');
        //     window.location.reload();
        //   }
        // }
        // } else if (status === 403) {
        //   // 권한 없음
        //   alert(errorMessage);
        //   // navigate('/error/403');
        // } else if (status === 412) {
        //   // 토큰 만료
        //   // alert(errorMessage);
        //   // 에러 메시지 전달
        //   alert(errorMessage);
        //   // throw new Error(errorMessage);
      }
      alert(errorMessage);
    }
    return Promise.reject(error);
  }
);
