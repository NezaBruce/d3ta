import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import ServiceChanges from "./ServiceChanges";
import SocialMedia from "./SocialMedia";
import { connect } from "react-redux";
import { callApi } from "../../../api";
import API from "../../../api/Routes";
function General(props) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    post: false,
    event: false,
    course: false,
  });
  const [socialMedia, setSocialMedia] = useState({});
  useEffect(() => {
    history.push("/global-settings/general");
  }, []);
  useEffect(() => {
    getSocialMediaLinks();
  }, []);

  /******************* 
  @Purpose : Used for get Social Media Links
  @Parameter : {}
  @Author : INIC
  ******************/
  const getSocialMediaLinks = async () => {
    try {
      const response = await props.callApi(
        API.GET_SOCIAL_MEDIA_LINKS,
        {},
        "get",
        null,
        true,
        false
      );
      if (response.status === 1) {
        setSocialMedia(response?.data);
        const { post, event, course } = response?.data;
        setFormData({ ...formData, post, event, course });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <ChangePassword />
      <hr
        style={{
          height: "1",
          borderWidth: 1,
          backgroundColor: "#ececec",
        }}
      />
      <SocialMedia socialMedia={socialMedia} setSocialMedia={setSocialMedia} />
      <hr
        style={{
          height: "1",
          borderWidth: 1,
          backgroundColor: "#ececec",
        }}
      />
      <ServiceChanges
        setFormData={setFormData}
        formData={formData}
        socialMedia={socialMedia}
      />
    </>
  );
}

export default connect(null, { callApi })(General);
