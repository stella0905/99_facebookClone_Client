import React from "react";

const LoginForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
    };
    return (
        <div className="">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    className="block w-full rounded border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400"
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
                                    className="block w-full rounded border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <button
                                type="submit"
                                className="flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>

                            <div className="text-sm mt-5 flex justify-center">
                                <button type="button" className=" font-thin text-indigo-600 hover:text-indigo-500">
                                    비밀번호를 잊으셨나요?
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
