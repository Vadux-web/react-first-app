import React from "react";
import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className={s.dialog}>
      <img src={props.src} alt={"ava"} className={s.ava}/>
      <NavLink className={s.link} to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
