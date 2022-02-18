import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/avatars/vadik.jpg";
import styles from "../../Profile/ProfileInfo/ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      {/*<div>*/}
      {/*  <img*/}
      {/*    className="img"*/}
      {/*    src="https://5continent.ru/i/532/letniy-tur_x353.jpg"*/}
      {/*    alt="panoramic"*/}
      {/*  />*/}
      {/*</div>*/}
      <div className={styles.descriptionBlock}>
        <h1>{props.profile.fullName}</h1>{" "}
        <img
          className={styles.userPhoto}
          src={
            props.profile.photos.small != null
              ? props.profile.photos.small
              : userPhoto
          }
          alt="ava"
        />
        <ProfileStatus status={"Hi"} />
      </div>
    </div>
  );
};

export default ProfileInfo;
