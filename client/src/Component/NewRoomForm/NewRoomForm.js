import React from 'react'

class NewRoomForm extends React.Component {
  state = {
    roomName: '',
  }

  handleChange = (e) => {
    this.setState({
      roomName: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleCreateRoom(this.state.roomName);
    this.setState({ roomName: '' })
  }

  handleFocus = (e) => {
    console.log('object got here?', e)
    this.setState({roomName: ''})
  }

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
          <input
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            value={this.state.roomName}
            type="text"
            placeholder="NewRoomForm"
            required />
          <button id="create-room-btn" type="submit">+</button>
        </form>
      </div>
    )
  }
}

export default NewRoomForm