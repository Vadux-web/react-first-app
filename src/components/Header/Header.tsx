import React from "react";
import s from "./Header.module.css";
import LangContext from "../../LangContext";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <LangContext.Consumer>
      {(lang) => {
        return (
          <header className={s.header}>
            <img
              alt="logo"
              src="https://www.vippng.com/png/full/410-4100150_livechat-logo-png-live-chat.png"
            />
            <div className={s.loginBlock}>
              {props.isAuth ? (
                <div>
                  {props.login} –<button onClick={props.logout}>Log out</button>
                </div>
              ) : (
                <NavLink to={"/login"}>Login</NavLink>
              )}
            </div>
            <p>{lang}</p>
          </header>
        );
      }}
    </LangContext.Consumer>
  );
};

export default Header;
