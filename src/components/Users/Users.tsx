import React from "react";
import PaginatorD from "../common/Paginator/PaginatorD";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}


let Users: React.FC<PropsType> = ({
                                      totalUsersCount,
                                      pageSize,
                                      currentPage,
                                      onPageChanged,
                                      users,
                                      ...props
                                  }) => {
    return (
        <div>
            <PaginatorD
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
            <div>
                {users.map((u) => (
                    <User
                        user={u}
                        followingInProgress={props.followingInProgress}
                        key={u.id}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                ))}
            </div>
        </div>
    );
};

export default Users;
