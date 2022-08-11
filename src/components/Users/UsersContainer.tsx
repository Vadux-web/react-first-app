import {connect} from "react-redux";
import {follow, requestUsers, setCurrentPage, toggleFollowingProgress, unfollow,} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../redux/user-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapsStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}

type OwnProps = {
    pageTitle: string
}

type PropsType = MapsStatePropsType & MapDispatchPropsType & OwnProps

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    };

    render() {
        return (
            <>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching ? (
                    <Preloader/>
                ) : (
                    <Users
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        followingInProgress={this.props.followingInProgress}
                    />
                )}
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapsStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

let mapDispatchToProps = {
    follow,
    unfollow,
    getUsers: requestUsers,
};

export default compose(
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<MapsStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, mapDispatchToProps)
    //withAuthRedirect
)(UsersContainer);
