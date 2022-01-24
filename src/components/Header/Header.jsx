import React from "react";
import s from "./Header.module.css";
import LangContext from "../../LangContext";

const Header = () => {
  return (
    <LangContext.Consumer>
      {(lang) => {
        return (
          <header className={s.header}>
            <img src="https://www.vippng.com/png/full/410-4100150_livechat-logo-png-live-chat.png" />
            <p>{lang}</p>
          </header>
        );
      }}
    </LangContext.Consumer>
  );
};

export default Header;
