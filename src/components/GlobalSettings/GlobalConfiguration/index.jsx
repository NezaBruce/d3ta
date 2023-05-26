import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { callApi } from "../../../api";
import API from "../../../api/Routes";
import {
  showMessageNotification,
  showModalNotification,
} from "../../../utils/Functions";

function GlobalConfiguration(props) {
  const [data, setData] = useState({});

  const [lite, setLite] = useState("");
  const [premium, setPremium] = useState("");
  const [id, setId] = useState("");

  let history = useHistory();

  useEffect(() => {
    history.push("/global-settings/globalConfiguration");
    getConfiguration();
  }, []);

  /******************* 
  @Purpose : Used for get Configuration data 
  @Parameter : {}
  @Author : INIC
  ******************/
  const getConfiguration = async () => {
    try {
      const response = await props.callApi(
        API.GET_CONFIGURATION,
        {},
        "get",
        null,
        true,
        false
      );
      if (response.status === 1) {
        setData({
          nlCourses: {
            activitie: "For NL Courses",
            peer: response.data.nlCourses.peer,
            admin: response.data.nlCourses.admin,
          },
          trainingRooms: {
            activitie: "For Training Rooms",
            peer: response.data.trainingRooms.peer,
            admin: response.data.trainingRooms.admin,
          },
          coachingRooms: {
            activitie: "For Coaching Rooms",
            peer: response.data.coachingRooms.peer,
            admin: response.data.coachingRooms.admin,
          },
          bnRooms: {
            activitie: "For BN Rooms",
            peer: response.data.bnRooms.peer,
            admin: response.data.bnRooms.admin,
          },
          events: {
            activitie: "For Events",
            peer: response.data.events.peer,
            admin: response.data.events.admin,
          },
          masterClasses: {
            activitie: "For Master Classes",
            peer: response.data.masterClasses.peer,
            admin: response.data.masterClasses.admin,
          },
          webinars: {
            activitie: "For Webinars",
            peer: response.data.webinars.peer,
            admin: response.data.webinars.admin,
          },
          // audioRooms: {
          //   activitie: "For Audio Rooms",
          //   peer: response.data.audioRooms.peer,
          //   admin: response.data.audioRooms.admin,
          // },
          // licencedCourse: {
          //   activitie: "For Licenced Course For Free User",
          //   peer: response.data.licencedCourse.peer,
          //   admin: response.data.licencedCourse.admin,
          // },
        });
        setLite(response.data.liteProfileDiscount);
        setPremium(response.data.premiumProfileDiscount);
        setId(response.data.id);
      }
    } catch (err) {
      throw err;
    }
  };

  /******************* 
  @Purpose : Used for value change 
  @Parameter : {}
  @Author : INIC
  ******************/
  const handleChange = (e, key) => {
    const { value, name } = e.target;
    let newState = Object.keys(data).map((k) =>
      k === key ? { ...data[k], [name]: value } : data[k]
    );

    const [
      nlCourses,
      trainingRooms,
      coachingRooms,
      bnRooms,
      events,
      masterClasses,
      webinars,
      // audioRooms,
      // licencedCourse,
    ] = newState;

    const myObj = {
      nlCourses,
      trainingRooms,
      coachingRooms,
      bnRooms,
      events,
      masterClasses,
      webinars,
      // audioRooms,
      // licencedCourse,
    };
    setData(myObj);
  };

  /******************* 
  @Purpose : Used for validation 
  @Parameter : {}
  @Author : INIC
  ******************/
  const validation = () => {
    const {
      nlCourses,
      trainingRooms,
      coachingRooms,
      bnRooms,
      events,
      masterClasses,
      webinars,
      audioRooms,
      licencedCourse,
    } = data;

    if (nlCourses.peer === "" || nlCourses.admin === "") {
      showMessageNotification("NL Courses fields required...", "error");
      return false;
    } else if (nlCourses.peer < 0 || nlCourses.admin < 0) {
      showMessageNotification(
        "NL Courses value must not be less than 0",
        "error"
      );
      return false;
    } else if (
      parseFloat(nlCourses.peer) + parseFloat(nlCourses.admin) < 100 ||
      parseFloat(nlCourses.peer) + parseFloat(nlCourses.admin) > 100
    ) {
      showMessageNotification(
        "The total of NL Courses should not be less than & greater than 100",
        "error"
      );
      return false;
    }

    if (trainingRooms.peer === "" || trainingRooms.admin === "") {
      showMessageNotification("Training Rooms fields required...", "error");
      return false;
    } else if (trainingRooms.peer < 0 || trainingRooms.admin < 0) {
      showMessageNotification(
        "Training Rooms value must not be less than 0",
        "error"
      );
      return false;
    } else if (
      parseFloat(trainingRooms.peer) + parseFloat(trainingRooms.admin) < 100 ||
      parseFloat(trainingRooms.peer) + parseFloat(trainingRooms.admin) > 100
    ) {
      showMessageNotification(
        "The total of Training Rooms should not be less than & greater than 100",
        "error"
      );
      return false;
    }

    if (coachingRooms.peer === "" || coachingRooms.admin === "") {
      showMessageNotification("Coaching Rooms fields required...", "error");
      return false;
    } else if (coachingRooms.peer < 0 || coachingRooms.admin < 0) {
      showMessageNotification(
        "Coaching Rooms value must not be less than 0",
        "error"
      );
      return false;
    } else if (
      parseFloat(coachingRooms.peer) + parseFloat(coachingRooms.admin) < 100 ||
      parseFloat(coachingRooms.peer) + parseFloat(coachingRooms.admin) > 100
    ) {
      showMessageNotification(
        "The total of Coaching Rooms should not be less than & greater than 100",
        "error"
      );
      return false;
    }

    if (bnRooms.peer === "" || bnRooms.admin === "") {
      showMessageNotification("BN Rooms fields required...", "error");
      return false;
    } else if (bnRooms.peer < 0 || bnRooms.admin < 0) {
      showMessageNotification(
        "BN Rooms value must not be less than 0",
        "error"
      );
      return false;
    } else if (
      parseFloat(bnRooms.peer) + parseFloat(bnRooms.admin) < 100 ||
      parseFloat(bnRooms.peer) + parseFloat(bnRooms.admin) > 100
    ) {
      showMessageNotification(
        "The total of BN Rooms should not be less than & greater than 100",
        "error"
      );
      return false;
    }

    if (events.peer === "" || events.admin === "") {
      showMessageNotification("Events fields required...", "error");
      return false;
    } else if (events.peer < 0 || events.admin < 0) {
      showMessageNotification("Events value must not be less than 0", "error");
      return false;
    } else if (
      parseFloat(events.peer) + parseFloat(events.admin) < 100 ||
      parseFloat(events.peer) + parseFloat(events.admin) > 100
    ) {
      showMessageNotification(
        "The total of Events should not be less than & greater than 100",
        "error"
      );
      return false;
    }

    if (masterClasses.peer === "" || masterClasses.admin === "") {
      showMessageNotification("Masterclasses fields required...", "error");
      return false;
    } else if (masterClasses.peer < 0 || masterClasses.admin < 0) {
      showMessageNotification(
        "Masterclasses value must not be less than 0",
        "error"
      );
      return false;
    } else if (
      parseFloat(masterClasses.peer) + parseFloat(masterClasses.admin) < 100 ||
      parseFloat(masterClasses.peer) + parseFloat(masterClasses.admin) > 100
    ) {
      showMessageNotification(
        "The total of Masterclasses should not be less than & greater than 100",
        "error"
      );
      return false;
    }

    if (webinars.peer === "" || webinars.admin === "") {
      showMessageNotification("Webinars fields required...", "error");
      return false;
    } else if (webinars.peer < 0 || webinars.admin < 0) {
      showMessageNotification(
        "Webinars value must not be less than 0",
        "error"
      );
      return false;
    } else if (
      parseFloat(webinars.peer) + parseFloat(webinars.admin) < 100 ||
      parseFloat(webinars.peer) + parseFloat(webinars.admin) > 100
    ) {
      showMessageNotification(
        "The total of Webinars should not be less than & greater than 100",
        "error"
      );
      return false;
    }

    // if (audioRooms.peer === "" || audioRooms.admin === "") {
    //   showMessageNotification("Audio Rooms fields required...", "error");
    //   return false;
    // } else if (audioRooms.peer < 0 || audioRooms.admin < 0) {
    //   showMessageNotification(
    //     "Audio Rooms value must not be less than 0",
    //     "error"
    //   );
    //   return false;
    // } else if (
    //   parseFloat(audioRooms.peer) + parseFloat(audioRooms.admin) < 100 ||
    //   parseFloat(audioRooms.peer) + parseFloat(audioRooms.admin) > 100
    // ) {
    //   showMessageNotification(
    //     "The total of Audio Rooms should not be less than & greater than 100",
    //     "error"
    //   );
    //   return false;
    // }

    // if (licencedCourse.peer === "" || licencedCourse.admin === "") {
    //   showMessageNotification("Licenced Course fields required...", "error");
    //   return false;
    // } else if (licencedCourse.peer < 0 || licencedCourse.admin < 0) {
    //   showMessageNotification(
    //     "Licenced Course value must not be less than 0",
    //     "error"
    //   );
    //   return false;
    // } else if (
    //   parseFloat(licencedCourse.peer) + parseFloat(licencedCourse.admin) <
    //     100 ||
    //   parseFloat(licencedCourse.peer) + parseFloat(licencedCourse.admin) > 100
    // ) {
    //   showMessageNotification(
    //     "The total of Licenced Course should not be less than & greater than 100",
    //     "error"
    //   );
    //   return false;
    // }

    if (lite === "") {
      showMessageNotification("Lite Profile fields required...", "error");
      return false;
    } else if (lite < 0) {
      showMessageNotification(
        "Lite Profile value must not be less than 0",
        "error"
      );
      return false;
    } else if (lite > 100) {
      showMessageNotification(
        "Lite Profile should not be greater than 100",
        "error"
      );
      return false;
    }

    if (premium === "") {
      showMessageNotification("Premium Profile fields required...", "error");
      return false;
    } else if (premium < 0) {
      showMessageNotification(
        "Premium Profile value must not be less than 0",
        "error"
      );
      return false;
    } else if (premium > 100) {
      showMessageNotification(
        "Premium Profile should not be greater than 100",
        "error"
      );
      return false;
    }

    if (
      events.peer ||
      events.admin ||
      nlCourses.peer ||
      nlCourses.admin ||
      trainingRooms.peer ||
      trainingRooms.admin ||
      coachingRooms.peer ||
      coachingRooms.admin ||
      bnRooms.peer ||
      bnRooms.admin ||
      masterClasses.peer ||
      masterClasses.admin ||
      webinars.peer ||
      webinars.admin ||
      lite !== "" ||
      premium !== ""
    ) {
      return true;
    }
  };

  /******************* 
  @Purpose : Used for save
  @Parameter : {}
  @Author : INIC
  ******************/
  const saveHandler = async () => {
    let body = {
      id: id,
      nlCourses: {
        peer: parseFloat(data.nlCourses.peer),
        admin: parseFloat(data.nlCourses.admin),
      },
      trainingRooms: {
        peer: parseFloat(data.trainingRooms.peer),
        admin: parseFloat(data.trainingRooms.admin),
      },
      coachingRooms: {
        peer: parseFloat(data.coachingRooms.peer),
        admin: parseFloat(data.coachingRooms.admin),
      },
      bnRooms: {
        peer: parseFloat(data.bnRooms.peer),
        admin: parseFloat(data.bnRooms.admin),
      },
      events: {
        peer: parseFloat(data.events.peer),
        admin: parseFloat(data.events.admin),
      },
      masterClasses: {
        peer: parseFloat(data.masterClasses.peer),
        admin: parseFloat(data.masterClasses.admin),
      },
      webinars: {
        peer: parseFloat(data.webinars.peer),
        admin: parseFloat(data.webinars.admin),
      },
      // audioRooms: {
      //   peer: parseFloat(data.audioRooms.peer),
      //   admin: parseFloat(data.audioRooms.admin),
      // },
      // licencedCourse: {
      //   peer: parseFloat(data.licencedCourse.peer),
      //   admin: parseFloat(data.licencedCourse.admin),
      // },
      liteProfileDiscount: parseFloat(lite),
      premiumProfileDiscount: parseFloat(premium),
    };

    if (validation()) {
      try {
        const response = await props.callApi(
          API.ADD_UPDATE_CONFIGURATION,
          body,
          "post",
          null,
          true,
          false
        );
        if (response.status === 1) {
          showModalNotification(response.message);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table
          className="table row-border nowrap common-datatable global-setting-table "
          id="user-listing"
        >
          <thead>
            <tr>
              <th>Activities</th>
              <th>Peer Producer's Percentage</th>
              <th>Admin Percentage</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((key, i) => (
              <tr key={i}>
                <td>{data[key].activitie}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <input
                      className="form-control w-50 mr-2"
                      name="peer"
                      value={data[key].peer}
                      type="number"
                      onChange={(e) => handleChange(e, key)}
                    />
                    %
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <input
                      className="form-control w-50 mr-2"
                      name="admin"
                      value={data[key].admin}
                      type="number"
                      onChange={(e) => handleChange(e, key)}
                    />
                    %
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-body content">
        <div className="col-md-6 d-flex align-items-center">
          <label>Lite Profile Relaxation (NL Courses)</label>
          <input
            className="form-control ml-3 w-25 mr-2"
            type="number"
            value={lite}
            onChange={(e) => setLite(e.target.value)}
          />
          %
        </div>
        <div className="col-md-6 d-flex mt-3 align-items-center">
          <label>Premium Profile Relaxation (NL Courses)</label>
          <input
            className="form-control ml-3 w-25 mr-2"
            type="number"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
          />
          %
        </div>
        <div className="text-right mt-2 pr-5 pb-5">
          <button className="btn btn-primary" onClick={() => saveHandler()}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default connect(null, { callApi })(GlobalConfiguration);
