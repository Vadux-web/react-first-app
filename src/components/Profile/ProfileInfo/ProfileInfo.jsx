import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/avatars/vadik.jpg";
import styles from "../../Profile/ProfileInfo/ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={styles.descriptionBlock}>
        <h1>{profile.fullName}</h1>{" "}
        <img
          className={styles.userPhoto}
          src={profile.photos.small != null ? profile.photos.small : userPhoto}
          alt="ava"
        />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
