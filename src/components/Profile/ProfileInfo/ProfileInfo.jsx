import React from "react";
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div>
        <img
          className="img"
          src="https://5continent.ru/i/532/letniy-tur_x353.jpg"
          alt="panoramic"
        />
      </div>
      <div>
        {" "}
        <img src={props.profile.photos.large} alt={"avatar"} /> ava +
        description{" "}
      </div>
    </div>
  );
};

export default ProfileInfo;
