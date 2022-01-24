import React from "react";

const LangContext = React.createContext("rus");

export const LangProvider = (props) => {
  return (
    <LangContext.Provider value={props.lang}>
      {props.children}
    </LangContext.Provider>
  );
};

export default LangContext;
