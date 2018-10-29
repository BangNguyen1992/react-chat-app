import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Message } from '../Message';


export default class MessageList extends Component {
  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this);
    const lineHeight = 52;
    const shouldScrollToBottom = node.scrollTop + node.clientHeight + lineHeight * 4 >= node.scrollHeight

    // console.log('object test', shouldScrollToBottom, node.scrollTop, node.clientHeight, node.scrollHeight)
    if (shouldScrollToBottom) {
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className="message-list">
          <div className="join-room">
            &larr; Join a room!
              </div>
        </div>
      )
    }

    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <Message key={index} currentUser={this.props.currentUser} message={message} />
          )
        })}
      </div>
    )
  }
}


MessageList.propTypes = {
  messages: PropTypes.array,
};
