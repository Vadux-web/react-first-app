import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { actions } from "../../redux/constans";

const Dialogs = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} src={d.src} />
  ));
  let messageElements = props.dialogsPage.messages.map((m) => (
    <Message message={m.message} id={m.id} />
  ));

  let newMessageElement = React.createRef();

  let addMessage = () => {
    props.dispatch({ type: actions.addMessage });
  };

  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.dispatch({ type: actions.updateNewMessageText, newText: text });
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div>
        <div className={s.messages}>{messageElements}</div>
        <div>
          <textarea
            onChange={onMessageChange}
            ref={newMessageElement}
            value={props.dialogsPage.newMessageText}
            placeholder={"...message"}
          />
        </div>
        <div>
          <button onClick={addMessage}>Add Message</button>
        </div>
      </div>
    </div>
  );
};
export default Dialogs;
