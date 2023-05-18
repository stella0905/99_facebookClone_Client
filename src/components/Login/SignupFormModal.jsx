import { signUpUser } from 'api/auth';
import Loading from 'components/Loading';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const SignupFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef(null);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    reset,
  } = useForm();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSignUp = async (data) => {
    setLoading(true);
    if (
      errors.email ||
      errors.password ||
      errors.lastName ||
      errors.firstName ||
      errors.gender ||
      errors.birthYear ||
      errors.birthMonth ||
      errors.birthDay
    ) {
      return;
    }
    if (!imgRef.current.files[0]) {
      alert('이미지를 등록해주세요');
    }

    const {
      email,
      password,
      lastName,
      firstName,
      gender,
      birthYear,
      birthMonth,
      birthDay,
      // profileUrl,
      // img,
    } = data;

    const formData = new FormData();
    formData.append('name', `${lastName}${firstName}`);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('birthday', `${birthYear}-${birthMonth}-${birthDay}`);
    formData.append('gender', gender);
    if (imgRef.current.files[0]) {
      formData.append('img', imgRef.current.files[0]);
    }
    try {
      await signUpUser(formData);
      reset({
        lastName: '',
        firstName: '',
        email: '',
        email_confirmation: '',
        password: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        gender: '',
        img: '',
      });
      closeModal();
    } catch (error) {}
    setLoading(false);
  };

  // 이미지 미리보기
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileUrl(reader.result);
      setPreviewImage(reader.result);
    };
  };

  useEffect(() => {
    clearErrors();
  }, [isOpen, clearErrors]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <button
            type='submit'
            className='flex justify-center mt-4 items-center text-lg px-6 py-2 font-medium text-white bg-loginSignUpGreen rounded focus:outline-none hover:bg-green-600'
            onClick={openModal}
          >
            새 계정 만들기
          </button>
          {isOpen && (
            <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
              <div className='bg-white rounded-lg p-6 w-1/4'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-lg font-semibold'>가입하기</h2>
                  <button
                    className='text-gray-400 hover:text-gray-500 focus:outline-none'
                    onClick={closeModal}
                  >
                    X
                  </button>
                </div>
                <form onSubmit={handleSubmit(handleSignUp)}>
                  <hr className='border-gray-200 my-4' />
                  {/* 프로필이미지 */}
                  <div className='mb-4 text-center'>
                    <label
                      htmlFor='img'
                      className='block text-sm font-medium text-gray-700 text-left'
                    >
                      프로필이미지
                    </label>
                    {previewImage && (
                      <img
                        className='h-16 w-16 flex-none rounded-full bg-gray-50 mx-auto'
                        src={previewImage}
                        alt='profile_image'
                      />
                    )}
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      id='img'
                      name='img'
                      ref={imgRef}
                      // {...register('img', {
                      //   required: '이미지를 등록해주세요.',
                      // })}
                    />
                  </div>
                  {/* 이름,성 */}
                  <div className='mb-4 flex space-x-4'>
                    <div className='w-1/2'>
                      <input
                        className='border border-gray-300 rounded px-3 py-2 mt-1 w-full'
                        type='text'
                        placeholder='성'
                        {...register('lastName', {
                          required: '성을 입력해주세요.',
                        })}
                      />
                      {errors.lastName && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                    <div className='w-1/2'>
                      <input
                        className='border border-gray-300 rounded px-3 py-2 mt-1 w-full'
                        type='text'
                        placeholder='이름'
                        {...register('firstName', {
                          required: '이름을 입력해주세요.',
                        })}
                      />
                      {errors.firstName && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* 이메일 */}
                  <div className='mb-4'>
                    <input
                      className='border border-gray-300 rounded px-3 py-2 mt-1 w-full'
                      placeholder='이메일'
                      type='email'
                      {...register('email', {
                        required: '이메일을 입력해주세요.',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: '올바른 이메일 주소를 입력해주세요.',
                        },
                      })}
                    />
                    {errors.email && (
                      <div className='text-red-500 text-sm mt-1'>
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  {/* 이메일재확인 */}
                  <div className='mb-4'>
                    <input
                      className='border border-gray-300 rounded px-3 py-2 mt-1 w-full'
                      placeholder='이메일 확인'
                      type='email'
                      {...register('email_confirmation', {
                        required: '이메일을 재확인해주세요.',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: '올바른 이메일 주소를 입력해주세요.',
                        },
                        validate: (value) =>
                          value === watch('email') ||
                          '이메일 주소가 일치하지 않습니다.',
                      })}
                    />
                    {errors.email_confirmation && (
                      <div className='text-red-500 text-sm mt-1'>
                        {errors.email_confirmation.message}
                      </div>
                    )}
                  </div>
                  {/* 비밀번호 */}
                  <div className='mb-4'>
                    <input
                      className='border border-gray-300 rounded px-3 py-2 mt-1 w-full'
                      placeholder='비밀번호'
                      type='password'
                      autoComplete='off'
                      {...register('password', {
                        required: '비밀번호를 입력해주세요.',
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!&$%#@^*])[a-zA-Z\d!&$%#@^*]{6,}$/,
                          message:
                            '숫자, 영문, 특수기호(!,& 등)를 조합한 여섯자리 이상의 비밀번호를 입력해주세요.',
                        },
                      })}
                    />
                    {errors.password && (
                      <div className='text-red-500 text-sm mt-1'>
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                  {/* 생일 */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>
                      생일
                    </label>
                    <div className='flex space-x-2'>
                      <div className='flex flex-col w-1/3'>
                        <select
                          className='border border-gray-300 rounded px-3 py-2 mt-1'
                          {...register('birthYear', {
                            required: '년도를 선택해주세요.',
                          })}
                        >
                          <option value=''>년</option>
                          {Array.from({ length: 124 }, (_, i) => 2023 - i).map(
                            (year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            )
                          )}
                        </select>
                        {errors.birthYear && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.birthYear.message}
                          </p>
                        )}
                      </div>
                      <div className='flex flex-col w-1/3'>
                        <select
                          className='border border-gray-300 rounded px-3 py-2 mt-1'
                          {...register('birthMonth', {
                            required: '월을 선택해주세요.',
                          })}
                        >
                          <option value=''>월</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            )
                          )}
                        </select>
                        {errors.birthMonth && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.birthMonth.message}
                          </p>
                        )}
                      </div>
                      <div className='flex flex-col w-1/3'>
                        <select
                          className='border border-gray-300 rounded px-3 py-2 mt-1'
                          {...register('birthDay', {
                            required: '일을 선택해주세요.',
                          })}
                        >
                          <option value=''>일</option>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(
                            (day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            )
                          )}
                        </select>
                        {errors.birthDay && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.birthDay.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* 성별 */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>
                      성별
                    </label>
                    <div className='flex items-center space-x-2 justify-end'>
                      <label className='flex items-center w-1/2 border border-gray-300 rounded px-3 py-2'>
                        <span className='flex-grow'>여성</span>
                        <input
                          type='radio'
                          className='form-radio text-blue-500'
                          name='gender'
                          value='female'
                          {...register('gender', {
                            required: '성별을 선택해주세요.',
                          })}
                        />
                      </label>
                      <label className='flex items-center w-1/2 border border-gray-300 rounded px-3 py-2'>
                        <span className='flex-grow'>남성</span>
                        <input
                          type='radio'
                          className='form-radio text-blue-500'
                          name='gender'
                          value='male'
                          {...register('gender', {
                            required: '성별을 선택해주세요.',
                          })}
                        />
                      </label>
                    </div>
                    {errors.gender && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                  <div className='text-xs text-gray-500 mb-3'>
                    저희 서비스를 이용하는 사람이 회원님의 연락처 정보를
                    Hanghaebook에 업로드했을 수도 있습니다. 더 알아보기.
                  </div>
                  <div className='text-xs text-gray-500'>
                    가입하기 버튼을 클릭하면 Hanghaebook의 약관,
                    개인정보처리방침 및 쿠키 정책에 동의하게 됩니다.
                    Hanghaebook으로부터 SMS 알림을 받을 수 있으며 알림은
                    언제든지 옵트 아웃할 수 있습니다.
                  </div>
                  <div className='flex justify-center'>
                    <button className='flex justify-center m-3 items-center text-lg h-10 w-1/2 px-2 py-3 font-medium text-white bg-loginSignUpGreen rounded focus:outline-none hover:bg-green-600'>
                      가입하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SignupFormModal;
