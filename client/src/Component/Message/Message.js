import React from 'react';
// import PropTypes from 'prop-types';

import './styles.css';

const Message = props => {
  const isCurrentUser = props.currentUser === props.message.senderId ? ' u-background-blue u-text-white ' : ' u-background-gray ';
  // const placeOtherMessageToRight = props.currentUser !== props.message.senderId ? ' u-others-messages ' : '';
  const UIAvatar = (name) => `https://ui-avatars.com/api/?name=${name}&size=32&rounded=true`

  return (
    <div className="message-container">
      <div className="message-avatar">
        <img src={UIAvatar(props.message.senderId)} alt=""></img>
      </div>

      <div className={"message"}>
        <div className="message-username"> {props.message.senderId}: </div>
        <div className={"message-text" + isCurrentUser}>
          <span>{props.message.text}</span>
        </div>
      </div>
    </div>

  );
};

// Message.propTypes = {

// };

export default Message;