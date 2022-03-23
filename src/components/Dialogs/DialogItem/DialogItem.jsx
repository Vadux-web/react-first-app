import React from "react";
import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";
import vadik from "../../../assets/images/avatars/vadik.jpg";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className={s.dialog + "" + s.active}>
      <img className={s.dialogAvatar} src={props.src || vadik} alt={"ava"} />
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
