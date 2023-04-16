import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { callApi } from "../../api";
import API from "../../api/Routes";
import { showModalNotification } from "../../utils/Functions";

function PeopleCard({ peoples, getFollowerList }) {
  const dispatch = useDispatch();

  const userPermissions = useSelector((state) => state.admin.userPermissions);

  /*******************
   @Purpose : used to unfollow 
   @Parameter : {}
   @Author : INIC
   ******************/
  const unFollow = (data) => {
    swal({
      title: "Are you sure, you want to delete ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await Promise.resolve(
          dispatch(
            callApi(API.UNFOLLOWERS_PEOPLE, data, "post", null, true, false)
          )
        );
        if (response.status === 1) {
          showModalNotification("Details are deleted successfully.");
          getFollowerList();
        }
      }
    });
  };

  return (
    <Card.Body className="border-bottom-geyser pt-0 px-0">
      <Container fluid>
        <Row className="custom-col-box four-grid-spacing-lg row-col-10 pb-12">
          {peoples.length === 0 ? (
            <h6
              className="text-center text-danger not-found-txt pt-4 mb-0"
              colSpan="6"
            >
              No Records Found!
            </h6>
          ) : (
            peoples.map((people) => (
              <Col lg={3} sm={6} key={people.id} className="mb-4">
                <Card className="text-center position-relative h-100 mt-2">
                  <div className="close-position-right w-h-24 bg-black-50 circle-inner-icons pointer">
                    <em className="icon icon-close-white font-10"></em>
                  </div>
                  <Card.Body className="py-12">
                    <picture className="user-profile-pic d-inline-block rounded-pill mb-2 pointer">
                      <source
                        src={people.userDetails.profilePicURL}
                        type="image/jpg"
                      />
                      <img
                        src={people.userDetails.profilePicURL}
                        width="120"
                        height="120"
                        onError={(e) => {
                          e.target.src = "/assets/images/error.jpg";
                          e.target.alt = "failed to load image";
                          e.onerror = null;
                        }}
                      />
                    </picture>

                    <div className="">
                      <div>
                        <a>
                          <h5 className="text-body-14  text-ellipsis pointer mt-2">
                            {`${
                              people.userDetails?.firstName
                                ?.charAt(0)
                                .toUpperCase() +
                              people.userDetails?.firstName?.slice(1)
                            } ${
                              people.userDetails?.lastName
                                ?.charAt(0)
                                .toUpperCase() +
                              people.userDetails?.lastName?.slice(1)
                            }`}
                          </h5>
                        </a>

                        {/* <p className="text-body-12 font-weight-normal text-secondary mb-1 text-two-ellipsis">
                        Business Analyst at Indianic Infotech
                      </p>
                      <p className="text-body-12 mb-2 font-weight-normal text-ellipsis">
                        10 Mutual Contacts
                      </p> */}
                      </div>

                      <div className="">
                        {userPermissions &&
                          userPermissions.includes("peer_producers_delete") && (
                            <Button
                              variant="btn btn-outline-primary w-100"
                              onClick={() =>
                                unFollow({
                                  id: people.id,
                                  learningInstituteId:
                                    people.learningInstituteId,
                                  isFollow: false,
                                })
                              }
                            >
                              Remove
                            </Button>
                          )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </Card.Body>
  );
}

export default PeopleCard;
