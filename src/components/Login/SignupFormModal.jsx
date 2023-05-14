import React, { useEffect, useState } from "react";

const SignupFormModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // 👇 날짜 select 관련 코드 입니다.
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [daysInMonth, setDaysInMonth] = useState([]);

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
    };

    const handleMonthChange = (event) => {
        const month = event.target.value;
        setSelectedMonth(month);
    };

    useEffect(() => {
        const getDaysInMonth = () => {
            if (selectedYear && selectedMonth) {
                const days = new Date(selectedYear, selectedMonth, 0).getDate();
                setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));
            } else {
                setDaysInMonth([]);
            }
        };

        getDaysInMonth();
    }, [selectedYear, selectedMonth]);
    // 👆 날짜 select 관련 코드 입니다.

    return (
        <div>
            <button
                type="submit"
                className="flex justify-center mt-4 items-center text-lg px-6 py-2 font-medium text-white bg-loginSignUpGreen rounded focus:outline-none hover:bg-green-600"
                onClick={openModal}
            >
                새 계정 만들기
            </button>

            {isOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">가입하기</h2>
                            <button
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                onClick={closeModal}
                            >
                                X
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">빠르고 쉽게 가입할 수 있습니다.</p>
                        <hr className="border-gray-200 my-4" />
                        <div className="mb-4 flex space-x-4">
                            <div className="w-1/2">
                                <input
                                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                                    type="text"
                                    placeholder="성"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <input
                                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                                    type="text"
                                    placeholder="이름"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <input
                                className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                                placeholder="이메일"
                                type="email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
                                placeholder="비밀번호"
                                type="password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">생일</label>
                            <div className="flex space-x-2">
                                <select
                                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-1/3"
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                >
                                    <option value="">년</option>
                                    {Array.from({ length: 124 }, (_, i) => 2023 - i).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="border border-gray-300 rounded px-3 py-2 mt-1 w-1/3"
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                >
                                    <option value="">월</option>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <select className="border border-gray-300 rounded px-3 py-2 mt-1 w-1/3">
                                    <option value="">일</option>
                                    {daysInMonth.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">생일</label>
                            <div className="flex items-center space-x-2 justify-end">
                                <label className="flex items-center w-1/3 border border-gray-300 rounded px-3 py-2">
                                    <span className="flex-grow">여성</span>
                                    <input
                                        type="radio"
                                        className="form-radio text-blue-500"
                                        name="gender"
                                        value="female"
                                    />
                                </label>
                                <label className="flex items-center w-1/3 border border-gray-300 rounded px-3 py-2">
                                    <span className="flex-grow">남성</span>
                                    <input
                                        type="radio"
                                        className="form-radio text-blue-500"
                                        name="gender"
                                        value="male"
                                    />
                                </label>
                                <label className="flex items-center w-1/3 border border-gray-300 rounded px-3 py-2">
                                    <span className="flex-grow">직접 지정</span>
                                    <input
                                        type="radio"
                                        className="form-radio text-blue-500"
                                        name="gender"
                                        value="other"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-3">
                            저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Hanghaebook에 업로드했을 수도 있습니다.
                            더 알아보기.
                        </div>
                        <div className="text-xs text-gray-500">
                            가입하기 버튼을 클릭하면 Hanghaebook의 약관, 개인정보처리방침 및 쿠키 정책에 동의하게
                            됩니다. Hanghaebook으로부터 SMS 알림을 받을 수 있으며 알림은 언제든지 옵트 아웃할 수
                            있습니다.
                        </div>
                        <div className="flex justify-center">
                            <button className="flex justify-center m-3 items-center text-lg h-10 w-1/2 px-2 py-3 font-medium text-white bg-loginSignUpGreen rounded focus:outline-none hover:bg-green-600">
                                가입하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignupFormModal;
