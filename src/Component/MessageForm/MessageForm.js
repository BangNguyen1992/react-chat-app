import React, { Component } from 'react'
import PropTypes from 'prop-types';



export default class MessageForm extends Component {
  state = {
    message: '',
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSendMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          disabled={this.props.disabled}
          placeholder="Type message and press Enter"
          type="text"
          onChange={this.handleChange}
          value={this.state.message}
        />
      </form>
    )
  }
}


MessageForm.propTypes = {

};
