import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
  return (
    <div className="message">
      <div className="message-username">{props.message.senderId}: </div>
      <div className="message-text">{props.message.text}</div>
    </div>
  );
};

Message.propTypes = {

};

export default Message;