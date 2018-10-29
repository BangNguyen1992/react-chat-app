import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './styles.css';

class Register extends Component {
  state = {
    userId: '',
    isExist: false,
    users: '',
  }

  componentDidMount() {
    this.fetchUsers()
      .then(users => {
        this.setState({ users })
      })
      .catch(err => console.log(err));
  }

  fetchUsers = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleChange = (event) => {
    const userId = event.target.value;
    this.setState({ userId });

    // Check if user already existed
    const isExist = this.state.users.some(user => user.id === userId)

    if (isExist)
      this.setState({ isExist: true })
    else
      this.setState({ isExist: false })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // If userId exist, go to main chat-app
    if (this.state.isExist) {
      this.props.history.push(`/chat-app/${this.state.userId}`)
    }
    // create new user, then go to main chat-app
    else {
      this.registerNewUser(this.state.userId)
        .then(newUser => {
          this.props.history.push(`/chat-app/${newUser.id}`)
        })
        .catch(err => console.log(err));
    }
  }

  registerNewUser = async (userId) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="register-container">
        <form onSubmit={this.handleSubmit} className="register-form">
          <h2 style={{ textTransform: "capitalize" }}>Please enter username</h2>
          <input
            type="text"
            required
            value={this.state.userId}
            onChange={this.handleChange}
            placeholder="Enter your username here"
          />
          {this.state.isExist
            ? <button className="register-button" type="submit"> Login </button>
            : <button className="register-button" type="submit"> Register </button>
          }

        </form>
      </div>
    );
  }
}

// Register.propTypes = {

// };

export default Register;