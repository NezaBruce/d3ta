import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { callApi } from "../../api";
import API from "../../api/Routes";
import Select from "react-select";
import Loader from "../Loader/Loader";
import ErrorMessages from "../../utils/ErrorMessages";
import { showMessageNotification } from "../../utils/Functions";
import swal from "sweetalert";

function ManageRoles({ manageRoles, setManageRoles, instituteId }) {
  const dispatch = useDispatch();

  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [roleData, setRoleData] = useState("");
  const [user, setUser] = useState("");
  let [errors, setErrors] = useState("");
  const [addRole, setAddRole] = useState(false);

  useEffect(() => {
    if (manageRoles) {
      getRolesList();
      getUserList();
    }
  }, [manageRoles]);

  /*******************
   @Purpose : get roles list
   @Parameter : {}
   @Author : INIC
   ******************/
  const getRolesList = async () => {
    let body = {
      instituteId,
    };
    try {
      setLoading(true);
      const response = await Promise.resolve(
        dispatch(
          callApi(
            API.GET_LEARNING_INSTITUTE_ROLELIST,
            body,
            "post",
            null,
            true,
            false
          )
        )
      );
      if (response.status === 1) {
        setListing(response?.data);
        setLoading(false);
      }
    } catch (err) {
      throw err;
    }
  };

  /*******************
   @Purpose : get User list
   @Parameter : {}
   @Author : INIC
   ******************/
  const getUserList = async () => {
    let body = {
      instituteId,
    };
    try {
      const response = await Promise.resolve(
        dispatch(
          callApi(
            API.GET_LEARNING_INSTITUTE_USERLIST,
            body,
            "post",
            null,
            true,
            false
          )
        )
      );
      if (response.status === 1 && response.data) {
        let user = [];
        response.data.map((ele) => {
          user.push({
            label: `${
              ele.userDetails?.firstName?.charAt(0).toUpperCase() +
              ele.userDetails?.firstName?.slice(1)
            } ${
              ele.userDetails?.lastName?.charAt(0).toUpperCase() +
              ele.userDetails?.lastName?.slice(1)
            }`,
            value: ele.userDetails.id,
          });
        });
        setUserList(user);
      }
    } catch (err) {
      throw err;
    }
  };

  /******************* 
  @Purpose : Used for model close
  @Parameter : {}
  @Author : INIC
  ******************/
  const modelCloseBtn = () => {
    setManageRoles(false);
    setAddRole(false);
    setUser(null);
    setRoleData(null);
    setErrors("");
  };

  const roleOptionsList = [
    { value: "Home", label: "Home" },
    { value: "About", label: "About" },
    { value: "Courses", label: "Courses" },
    { value: "Services", label: "Services" },
    { value: "Posts", label: "Posts" },
    { value: "Articles", label: "Articles" },
    { value: "Events", label: "Events" },
    { value: "People", label: "People" },
    { value: "Jobs", label: "Jobs" },
  ];

  /******************* 
  @Purpose : Used for multiple select option
  @Parameter : {}
  @Author : INIC
  ******************/
  const roleSelected = (e) => {
    let roleDetails = [];
    if (e !== null && e.length && e.length > 0) {
      e.forEach((item) => roleDetails.push(item));
    }
    setRoleData(roleDetails);
  };

  /******************* 
  @Purpose : Used for validation
  @Parameter : {}
  @Author : INIC
  ******************/
  const validation = () => {
    errors = {
      user: "",
      role: "",
    };

    if (user === "" || user === null) errors.user = ErrorMessages.REQUIRED;
    else errors.user = "";

    if (roleData === null || roleData === "")
      errors.role = ErrorMessages.REQUIRED;
    else errors.role = "";

    if (errors.user !== "" || errors.role !== "") {
      setErrors(errors);
      return false;
    } else {
      setErrors(errors);
      return true;
    }
  };

  /******************* 
  @Purpose : Used for save manage role
  @Parameter : {}
  @Author : INIC
  ******************/
  const saveHandler = async () => {
    if (validation()) {
      let roleDetails = [];
      if (roleData !== null && roleData.length && roleData.length > 0) {
        roleData.forEach((item) => roleDetails.push(item.value));
      }

      let body = {
        instituteId,
        userId: user.value,
        role: roleDetails,
      };

      try {
        setLoading(true);
        const response = await Promise.resolve(
          dispatch(
            callApi(
              API.ADD_LEARNING_INSTITUTE_ROLES,
              body,
              "post",
              null,
              true,
              false
            )
          )
        );
        if (response.status === 1) {
          showMessageNotification(response.message);
          getRolesList();
          setUser(null);
          setRoleData(null);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  /******************* 
  @Purpose : Used for remove manage role
  @Parameter : {}
  @Author : INIC
  ******************/
  const removeHandler = async (id) => {
    swal({
      title: "Are you sure, you want to delete ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await Promise.resolve(
          dispatch(
            callApi(
              API.REMOVE_LEARNING_INSTITUTE_ROLES,
              { id },
              "post",
              null,
              true,
              false
            )
          )
        );
        if (response.status === 1) {
          showMessageNotification(response.message);
          getRolesList();
        }
      }
    });
  };

  return (
    <Modal
      className="modal-dialog-lg"
      centered
      show={manageRoles}
      onHide={modelCloseBtn}
    >
      <Modal.Header closeButton>
        <div className="d-flex align-items-center">
          <h5 className="modal-title" id="exampleModalLongTitle">
            Manage Roles
          </h5>
        </div>
      </Modal.Header>
      <Modal.Body closeButton>
        <div>
          <div className="container-fluid ">
            <Form>
              <div className="px-2 my-4  scroll-block  ">
                <div>
                  <Table
                    className="video-listed-item-table font-14 mt-2"
                    responsive="lg"
                  >
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>User Name</th>
                        <th>Roles</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listing === undefined ||
                      (Array.isArray(listing) && listing.length === 0) ? (
                        <tr className="text-center text-danger not-found-txt">
                          <td colSpan="6">
                            {!loading ? (
                              <h6
                                className="text-center text-danger not-found-txt"
                                colSpan="6"
                              >
                                No Records Found!
                              </h6>
                            ) : (
                              <Loader />
                            )}
                          </td>
                        </tr>
                      ) : (
                        Array.isArray(listing) &&
                        listing.map((list, index) => (
                          <tr key={list.id}>
                            <td>{index + 1}</td>
                            <td>{`${
                              list.userDetails?.firstName
                                ?.charAt(0)
                                .toUpperCase() +
                              list.userDetails?.firstName?.slice(1)
                            } ${
                              list.userDetails?.lastName
                                ?.charAt(0)
                                .toUpperCase() +
                              list.userDetails?.lastName?.slice(1)
                            }`}</td>
                            <td>{list.role.join(", ")}</td>
                            <td className="text-center">
                              <span
                                className="cursor-pointer mr-2"
                                onClick={() => removeHandler(list.id)}
                              >
                                <i className="bx bx-trash" />
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <Button
                    type="button"
                    variant="btn btn-outline-info  w-sm-100 btn-sm mt-4"
                    disabled={addRole}
                    onClick={() => setAddRole(true)}
                  >
                    <span className="plus-icon bx bx-plus"></span> Add Role
                  </Button>

                  {addRole && <hr className="mt-4" />}
                </div>
              </div>
              {addRole && (
                <Row>
                  <Col md={6}>
                    <div className="mb-4">
                      <span className="form-label">
                        User<sup>*</sup>
                      </span>

                      <Form.Group className="mb-0">
                        <div className="custom-selectpicker-xs custom-selectpicker-grey">
                          <Select
                            options={userList}
                            value={user}
                            onChange={(value) => {
                              setUser(value);
                              setErrors({
                                ...errors,
                                user: "",
                              });
                            }}
                          />
                        </div>
                        <span className="text-danger d-block">
                          {errors.user}
                        </span>
                      </Form.Group>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-4">
                      <span className="form-label">
                        Role<sup>*</sup>
                      </span>

                      <Form.Group className="mb-0">
                        <div className="custom-selectpicker-xs custom-selectpicker-grey">
                          <Select
                            isMulti
                            value={roleData}
                            options={roleOptionsList}
                            onChange={(e) => {
                              roleSelected(e);
                              setErrors({
                                ...errors,
                                role: "",
                              });
                            }}
                          />
                        </div>
                        <span className="text-danger d-block">
                          {errors.role}
                        </span>
                      </Form.Group>
                    </div>
                  </Col>
                  <Col md={12}>
                    <Button
                      type="button"
                      variant="btn btn-info px-5 mb-4 font-weight-noramal "
                      onClick={saveHandler}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              )}
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ManageRoles;
