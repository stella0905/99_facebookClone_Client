import React from "react";
import SignupFormModal from "./SignupFormModal";

const LoginForm = () => {
    const handleLoginFormSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="w-1/3 h-450 border bg-white rounded-lg shadow-lg ">
            <div className="mx-5 my-5">
                <form className="space-y-6" onSubmit={handleLoginFormSubmit}>
                    <fieldset>
                        <div>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="이메일"
                                    className="block w-full rounded border border-gray-300 py-3 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-brand shadow-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    placeholder="비밀번호"
                                    className="block w-full rounded border border-gray-300 py-3 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-brand shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <button
                                type="submit"
                                className="flex justify-center  items-center w-full px-4 py-3 text-lg text-white bg-brand rounded font-semibold  focus:outline-none transition-all duration-300 hover:scale-95"
                            >
                                로그인
                            </button>
                            <div className="text-sm mt-3 flex justify-center">
                                <button type="button" className=" font-regular text-brand hover:text-indigo-500">
                                    비밀번호를 잊으셨나요?
                                </button>
                            </div>
                            <hr className=" mt-3" />
                        </div>
                    </fieldset>
                </form>
                <div className="flex justify-center">
                    <SignupFormModal />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
