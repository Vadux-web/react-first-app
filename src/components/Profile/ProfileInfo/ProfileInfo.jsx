import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  let onNameChange = (e) => {
    props.onFirstNameChange(e.target.value);
  };

  let newLastNameElement = React.createRef();

  let onLastNameChange = () => {
    let lastName = newLastNameElement.current.value;
    props.onLastNameChange(lastName);
  };

  // let onChangeNameButton = () => {
  //   props.changeNameButton();
  // };

  return (
    <div>
      <div>
        <img
          className="img"
          src="https://5continent.ru/i/532/letniy-tur_x353.jpg"
          alt="panoramic"
        />
      </div>
      <div className={s.descriptionBlock}>{props.currentUser.firstName}</div>

      <div>
        <input
          type="text"
          onChange={onNameChange}
          value={props.currentUser.firstName}
          placeholder={"имя"}
        />
        <input
          type="text"
          onChange={onLastNameChange}
          ref={newLastNameElement}
          value={props.currentUser.lastName}
          placeholder={"фамилия"}
        />
        {<button /*onClick={onChangeNameButton}*/>Change name</button>}
      </div>
    </div>
  );
};

export default ProfileInfo;
