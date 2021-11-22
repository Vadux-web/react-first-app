import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  return (
    <div>
      <div>
        <img
          className="img"
          src="https://5continent.ru/i/532/letniy-tur_x353.jpg"
          alt="panoramic"
        />
      </div>
      <div className={s.descriptionBlock}> ava + description</div>
    </div>
  );
};

export default ProfileInfo;
