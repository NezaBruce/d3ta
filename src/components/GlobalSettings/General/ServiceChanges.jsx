import React from "react";
import { connect } from "react-redux";
import { callApi } from "../../../api";
import API from "../../../api/Routes";
import { showModalNotification } from "../../../utils/Functions";
const ServiceChanges = ({ setFormData, formData, socialMedia, callApi }) => {
  /******************* 
  @Purpose : Used for submit
  @Parameter : {}
  @Author : INIC
  ******************/
  const saveHandler = async () => {
    let body = {
      id: socialMedia.id,
      post: formData.post,
      course: formData.course,
      event: formData.event,
    };
    try {
      const response = await callApi(
        API.ADD_WEIGHTAGE,
        body,
        "post",
        null,
        true,
        false
      );
      if (response.status === 1) {
        showModalNotification("Social Media Links update");
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="card notification-card">
      <div className="row">
        <div className="col-md-12">
          <div className="notification-title d-flex align-items-start mb-md-5 mb-4">
            <div className="text">
              <h4 className="pb-5 font-weight-bold">Algorithm Changes</h4>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="d-flex align-items-center justify-content-between mb-md-5 mb-4">
            <div>
              <h6 className="mb-0">News Feed list</h6>
            </div>
            <div className="custom-control custom-switch light">
              <input
                type="checkbox"
                className="custom-control-input"
                id="switchCheckbox1"
                checked={formData.post || ""}
                onChange={(e) =>
                  setFormData({ ...formData, post: e.target.checked })
                }
              />
              <label
                className="custom-control-label"
                htmlFor="switchCheckbox1"
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-md-5 mb-4">
            <div>
              <h6 className="mb-0">Courses </h6>
            </div>
            <div className="custom-control custom-switch light">
              <input
                type="checkbox"
                className="custom-control-input"
                id="switchCheckbox2"
                checked={formData.course || ""}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.checked })
                }
              />
              <label
                className="custom-control-label"
                htmlFor="switchCheckbox2"
              />
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="d-flex align-items-center justify-content-between mb-md-5 mb-4">
            <div>
              <h6 className="mb-0">All Rooms</h6>
            </div>
            <div className="custom-control custom-switch light">
              <input
                type="checkbox"
                className="custom-control-input"
                id="switchCheckbox4"
                checked={formData.event || ""}
                onChange={(e) =>
                  setFormData({ ...formData, event: e.target.checked })
                }
              />
              <label
                className="custom-control-label"
                htmlFor="switchCheckbox4"
              />
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="text-right mt-2">
            <button className="btn btn-primary" onClick={() => saveHandler()}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { callApi })(ServiceChanges);
