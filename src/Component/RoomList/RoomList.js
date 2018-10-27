import React from 'react';
import PropTypes from 'prop-types';

const RoomList = props => {
  // sort the room in order A -> Z
  const orderedRooms = [...props.rooms].sort((a, b) => {
    if (a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
    if (a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
    return 0;
  })

  return (
    <div className="rooms-list">
      <ul>
        <h3>Your rooms</h3>
        {orderedRooms.map((room, index) => {
          const isActive = room.id === props.roomId ? 'active' : '';

          return (
            <li key={index} className={'room ' + isActive}>
              <div onClick={() => props.subscribeToRoom(room.id)}># {room.name}</div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

RoomList.propTypes = {

};

export default RoomList;