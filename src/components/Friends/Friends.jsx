import React from "react";
import s from "./Friends.module.css";
import { NavLink } from "react-router-dom";
import Friend from "../Friend/Friend";

const Friends = (props) => {
  // let friendsElements = props.state.friends.map((f) => (
  //   <Friend name={f.name} id={f.id} />
  // ));
  return (
    <div className={s.item}>
      <NavLink to="/friends" activeClassName={s.activeLink}>
        <h2 className={s.header}>Friends</h2>
      </NavLink>
      <div className={s.friends_avatars_block}>
        <Friend />
        <Friend />
        <Friend />

        {/*<div>{friendsElements}</div>*/}
      </div>
    </div>
  );
};

export default Friends;
//
