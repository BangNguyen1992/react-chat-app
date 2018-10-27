import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import logo from './logo.svg';
import './App.css';

import { MessageList } from './Component/MessageList';
import { MessageForm } from './Component/MessageForm';
import { RoomList } from './Component/RoomList';
import { NewRoomForm } from './Component/NewRoomForm';

import { tokenUrl, instanceLocator } from './config/chatkit';
// import messages from './data/messages';

class App extends Component {
  state = {
    messages: [],
    joinableRooms: [],
    joinedRooms: [],
    roomId: null,
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'shinya1992',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
        // this.subscribeToRoom();
      })
      .catch(error => {
        console.error("error:", error);
      })
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(error => {
        console.error("error:", error);
      })
  }

  subscribeToRoom = (roomId) => {
    this.setState({ messages: [] });

    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        messageLimit: 30,
        hooks: {
          onNewMessage: message =>
            this.setState({ messages: [...this.state.messages, message] })
        }
      })
      .then(room => {
        this.setState({ roomId: room.id })
        this.getRooms();
      })
      .catch(error => {
        console.error("error subscribing to room:", error);
      })
  }

  handleSendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId,
    });
  }

  handleCreateRoom = (name) => {
    this.currentUser
      .createRoom({ name })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log('error with createRoom: ', err))
  }

  render() {
    return (
      <div className="app">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <RoomList
          subscribeToRoom={this.subscribeToRoom}
          roomId={this.state.roomId}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <MessageForm
          disabled={!this.state.roomId}
          handleSendMessage={this.handleSendMessage}
        />
        <NewRoomForm handleCreateRoom={this.handleCreateRoom} />
      </div>
    );
  }
}

export default App;
