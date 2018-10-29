import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import each from 'lodash/each';

import logo from './logo.svg';
import './App.css';

import { MessageList } from './Component/MessageList';
import { MessageForm } from './Component/MessageForm';
import { RoomList } from './Component/RoomList';
import { NewRoomForm } from './Component/NewRoomForm';

import { tokenUrl, instanceLocator } from './config/chatkit';
// import messages from './data/messages';


const theme = {
  '--main-color': '#145CBE',
  '--primary-message-color': '#000000',
  '--secondary-message-color': '#3e5869',
  '--main-text-color': '#FFFFFF',
  '--secondary-text-color': '#b0c7d6',
  '--send-message-form': '#F5F5F5',
  '--background-color': '#FFFFFF',
};

class App extends Component {
  state = {
    userId: '',
    messages: [],
    joinableRooms: [],
    joinedRooms: [],
    roomId: null,
    theme
  }

  componentDidMount() {
    this.updateCSSVariables(this.state.theme);
    this.setState({ userId: this.props.match.params.userId }, () => {
      const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: this.state.userId,
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
    })
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        // console.log('object test', this.currentUser.rooms)
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

  updateCSSVariables = (variables) => {
    each(variables, (value, prop) => {
      document.documentElement.style.setProperty(prop, value);
    });
  }

  render() {
    return (
      <div className="app">
        <RoomList
          subscribeToRoom={this.subscribeToRoom}
          roomId={this.state.roomId}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList
          currentUser={this.state.userId}
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
