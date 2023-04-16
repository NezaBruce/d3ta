import React from "react";
import WebinarListing from "../../PeerProducers/Webinar/WebinarListing";

function WebinarTab({ instituteId, accordion }) {
  return (
    <>
      <WebinarListing
        instituteId={instituteId}
        virtualEventType="webinar"
        roleType="learning-institute"
        accordion={accordion}
      />
    </>
  );
}

export default WebinarTab;
