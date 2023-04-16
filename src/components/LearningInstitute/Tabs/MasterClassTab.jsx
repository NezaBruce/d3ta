import React from "react";
import MasterClassListing from "../../PeerProducers/MasterClass/MasterClassListing";

function MasterClassTab({ instituteId, accordion }) {
  return (
    <>
      <MasterClassListing
        instituteId={instituteId}
        virtualEventType="master-class"
        roleType="learning-institute"
        accordion={accordion}
      />
    </>
  );
}

export default MasterClassTab;
