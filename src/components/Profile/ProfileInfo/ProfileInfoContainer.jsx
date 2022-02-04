import ProfileInfo from "./ProfileInfo";
import { connect } from "react-redux";
import {
  // changeNameButtonCreator,
  updateCurrentUserFirstNameCreator,
  updateCurrentUserLastNameCreator,
} from "../../../redux/profile-reducer";

let mapStateToProps = (state) => {
  return {
    currentUser: state.profilePage.currentUser,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    onFirstNameChange: (name) => {
      dispatch(updateCurrentUserFirstNameCreator(name));
    },
    onLastNameChange: (lastName) => {
      dispatch(updateCurrentUserLastNameCreator(lastName));
    },
    // changeNameButton: () => {
    //   dispatch(changeNameButtonCreator());
    // },
  };
};

const ProfileInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileInfo);

export default ProfileInfoContainer;
