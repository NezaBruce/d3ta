import React from "react";
import RoomListing from "../../PeerProducers/RoomListing";

function TraingRoomTab({ instituteId, accordion }) {
  return (
    <>
      <RoomListing
        instituteId={instituteId}
        virtualEventType="training-room"
        roleType="learning-institute"
        accordion={accordion}
      />
    </>
  );
}

export default TraingRoomTab;
