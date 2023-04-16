import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import preview from "../../assets/image.jpeg";
import { getLerningInstituteFollowers } from "../../store/Actions/PeerProducers";
import PeopleCard from "./PeopleCard";

function PeoplePage({ instituteId, accordion }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [followerData, setFollowerData] = useState([]);

  const { followers } = useSelector(({ peerProducers }) => peerProducers);

  useEffect(() => {
    getFollowerList();
  }, []);

  useEffect(() => {
    if (followers?.rows !== undefined) setFollowerData(followers?.rows);
  }, [followers]);

  /*******************
   @Purpose : get Follower List
   @Parameter : {}
   @Author : INIC
   ******************/
  const getFollowerList = () => {
    dispatch(
      getLerningInstituteFollowers({
        page: 1,
        pagesize: 4,
        searchText: "",
        learningInstituteId: instituteId,
      })
    );
  };

  return (
    <>
      <Card className="my-4">
        <Card.Header className="p-0">
          <h5 className="font-weight-semibold">Followers</h5>
        </Card.Header>
        {followerData.length === 0 ? (
          <h6
            className="text-center text-danger not-found-txt pt-4 mb-0"
            colSpan="6"
          >
            No Records Found!
          </h6>
        ) : (
          <>
            <PeopleCard
              peoples={followerData}
              getFollowerList={getFollowerList}
            />
            <div>
              <h5
                className="rounded-b-8 bg-blueberry-whip py-12 text-center mt-8"
                onClick={() => {
                  history.push({
                    pathname: `/peer-producers/learning-institute/followers`,
                    state: {
                      learningInstituteId: instituteId,
                    },
                  });
                }}
              >
                <a className="font-14 text-dark mt-8">View All</a>
              </h5>
            </div>
          </>
        )}
      </Card>

      {/* <Card className="my-4">
        <Card.Header className="p-0">
          <h5 className="font-weight-semibold">My People</h5>
        </Card.Header>
        <Card.Body className="border-bottom-geyser pt-0 px-0">
          <Container fluid>
            <Row className="custom-col-box four-grid-spacing-lg row-col-10 pb-12">
              <Col lg={3} sm={6}>
                <Card className="text-center position-relative h-100">
                  <div className="close-position-right w-h-24 bg-black-50 circle-inner-icons pointer">
                    <em className="icon icon-close-white font-10"></em>
                  </div>
                  <Card.Body className="py-12">
                    <picture className="user-profile-pic d-inline-block rounded-pill mb-2 pointer">
                      <source type="image/jpg" />
                      <img src={preview} width="72" height="72" />
                    </picture>
                    <div className="">
                      <div>
                        <a>
                          <h5 className="text-body-14 mb-1 text-ellipsis pointer">
                            Charlie Korsgaard
                          </h5>
                        </a>

                        <p className="text-body-12 font-weight-normal text-secondary mb-1 text-two-ellipsis">
                          Business Analyst at Indianic Infotech
                        </p>
                        <p className="text-body-12 mb-2 font-weight-normal text-ellipsis">
                          10 Mutual Contacts
                        </p>
                      </div>

                      <div className="">
                        <Button variant="btn btn-outline-primary mb-2 w-100">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <div className="text-center border-top text-body-14 border-dark">
          <h5 className="rounded-b-8 bg-blueberry-whip py-12 text-center mb-0">
            <a href="" className="text-body-14">
              View All
            </a>
          </h5>
        </div>
      </Card> */}
    </>
  );
}

export default PeoplePage;
