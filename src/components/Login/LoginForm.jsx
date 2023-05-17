import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SignupFormModal from './SignupFormModal';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'api/auth';
import Cookies from 'js-cookie';
import { setName, setProfileUrl } from '../../redux/modules/usersSlice';
import { useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginFormSubmit = async (data) => {
    try {
      if (errors.email || errors.password) return;

      const response = await loginUser(data);
      const { Authorization, refreshtoken, name, profile_url } = response;
      dispatch(setName(name));
      dispatch(setProfileUrl(profile_url));

      //친구목록 조회
      queryClient.invalidateQueries("followList")

      //유저정보 로컬스토리지 저장 
      const user = {
        name,
        profile_url
      }
      localStorage.setItem('user',JSON.stringify(user))

      // 토큰 만료 시간 계산 (7일)
      const expirationTime = new Date();
      expirationTime.setDate(expirationTime.getDate() + 7);

      // // Access Token 저장
      Cookies.set('Authorization', Authorization, {
        expires: expirationTime,
        path: '/',
      });
      // Refresh Token 저장
      Cookies.set('refreshtoken', refreshtoken, {
        expires: expirationTime,
        path: '/',
      });

      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div className='w-1/3 h-450 border bg-white rounded-lg shadow-lg '>
      <div className='mx-5 my-5'>
        <form
          className='space-y-6'
          onSubmit={handleSubmit(handleLoginFormSubmit)}
        >
          <fieldset>
            <div>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  // autoComplete='email'
                  // required
                  autoComplete='off'
                  placeholder='이메일'
                  className='block w-full rounded border border-gray-300 py-3 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-brand shadow-sm'
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '올바른 이메일 주소를 입력해주세요.',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <div className='text-red-500 text-sm mt-1'>
                  {errors.email.message}
                </div>
              )}
            </div>
            <div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  // autoComplete='password'
                  // required
                  autoComplete='off'
                  placeholder='비밀번호'
                  className='block w-full rounded border border-gray-300 py-3 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-brand shadow-sm'
                  {...register('password', {
                    required: '비밀번호를 입력해주세요.',
                  })}
                />
              </div>
              {errors.password && (
                <div className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className='mt-3'>
              <button
                type='submit'
                className='flex justify-center items-center w-full px-4 py-3 text-lg text-white bg-brand rounded font-semibold focus:outline-none transition-all duration-300 hover:scale-95'
              >
                로그인
              </button>
              {errorMessage && (
                <div className='text-red-500 text-sm mt-1'>{errorMessage}</div>
              )}
              <div className='text-sm mt-3 flex justify-center'>
                <button
                  type='button'
                  className='font-regular text-brand hover:text-indigo-500'
                >
                  비밀번호를 잊으셨나요?
                </button>
              </div>
              <hr className='mt-3' />
            </div>
          </fieldset>
        </form>
        <div className='flex justify-center'>
          <SignupFormModal />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
