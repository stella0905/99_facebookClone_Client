import useInput from "components/mainFeed/useInput";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useMutation } from "react-query";
import { Navigate } from "react-router-dom";
import { userSearch } from "../../api/users";
import UserItem from "./UserItem";

const UserList = () => {
    const [searchName, onChangeSearchNameHandler] = useInput("");
    const [searchEnabled, setSearchEnabled] = useState(false);
    const [searchUsers, setSearchUsers] = useState([]);

    //로컬스토리지에서 유저정보 불러오고 값이 없다면 로그인 화면으로 이동
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser);
    if (!user) {
    Navigate("/login");
    }

    //친구검색 API
    const mutation = useMutation((name) => userSearch(name), {
        onSuccess: (data) => {
            setSearchUsers(data.userInfos);
            setSearchEnabled(true);
        },
    });

    //친구검색 버튼
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(searchName);
    };

    return (
        <div className="ml-3 my-3 w-70">
            <div className="flex gap-x-4 items-center mb-5">
                <img
                    className="h-7 w-7 flex-none rounded-full bg-gray-50"
                    src={user.profile_url}
                    alt="profile_url"
                />
                <div className="flex justify-between gap-x-40">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                </div>
            </div>
            <p className="text-xl font-bold leading-6 text-gray-900 my-3">사람</p>
            <form className="flex items-center mb-3" onSubmit={handleSubmit}>
                <label htmlFor="search" className="sr-only">
                    search
                </label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <BsSearch className="w-4 h-4 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        id="search"
                        value={searchName}
                        onChange={onChangeSearchNameHandler}
                        className="bg-gray-100 text-sm rounded-full block w-72 pl-10 pr-2.5 py-2.5 placeholder-gray-600"
                        placeholder="친구 검색"
                    />
                </div>
            </form>
            <ul>
                {searchEnabled && searchUsers.length > 0 ? (
                    <UserItem users={searchUsers} />
                ) : (
                    searchEnabled && <p>검색 결과가 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
