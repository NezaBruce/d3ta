// import React, { Fragment, useEffect, useRef, useState } from "react";
// import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
// import ReactPlayer from "react-player";
// import preview from "../../assets/image.jpeg";
// import { useDispatch } from "react-redux";
// import { callApi } from "../../api";
// import API from "../../api/Routes";

// function AboutPage({ instituteId, logo, accordion }) {
//   const playerRef = useRef();
//   const dispatch = useDispatch();

//   const [tour, setTour] = useState([]);
//   const [mission, setMission] = useState([]);
//   const [vision, setVision] = useState([]);
//   const [environment, setEnvironment] = useState([]);
//   const [social, setSocial] = useState([]);
//   const [ourLogo, setOurLogo] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [socialPdf] = useState([]);
//   const [environmentPdf] = useState([]);

//   useEffect(() => {
//     getJobDetail();
//   }, [accordion.about]);

//   /*******************
//    @Purpose : get job details
//    @Parameter : {}
//    @Author : INIC
//    ******************/
//   const getJobDetail = async () => {
//     try {
//       setLoading(true);
//       const response = await Promise.resolve(
//         dispatch(
//           callApi(
//             API.GET_LEARNING_INSTITUTE_ABOUT + instituteId,
//             {},
//             "get",
//             null,
//             true,
//             false
//           )
//         )
//       );
//       if (response.status === 1) {
//         response.data.map((list) => {
//           if (list.type === "companyTour") {
//             setTour(list.data);
//           }
//           if (list.type === "ourMission") {
//             setMission(list.data);
//           }
//           if (list.type === "ourVision") {
//             setVision(list.data);
//           }
//           if (list.type === "ourEnvironmentalCommitment") {
//             setEnvironment(list.data);
//           }
//           if (list.type === "ourSocialCommitment") {
//             setSocial(list.data);
//           }
//           if (list.type === "ourLogo") {
//             setOurLogo(list.data);
//           }
//         });
//         setLoading(false);
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <div className="text-center mt-4 mb-3">
//           <Spinner animation="border" variant="primary" />
//         </div>
//       ) : tour.length === 0 &&
//         mission.length === 0 &&
//         vision.length === 0 &&
//         ourLogo.length === 0 &&
//         environment.length === 0 &&
//         social.length === 0 ? (
//         <h5 className="text-danger">No Data Found</h5>
//       ) : (
//         <>
//           {tour.length > 0 && (
//             <Card className="my-4">
//               <Card.Body className="p-4">
//                 <div className="d-flex justify-content-between pb-2">
//                   <h5 className="font-weight-semibold">Company Tour</h5>
//                 </div>
//                 {tour.map((list) => (
//                   <Fragment key={list.id}>
//                     <div className="video-main rounded-8 overflow-hidden mb-3">
//                       <ReactPlayer
//                         ref={playerRef}
//                         url={list.videoURL}
//                         controls
//                         width="100%"
//                         height="500px"
//                       />
//                     </div>
//                     <p className="text-body-14 font-weight-normal m-0">
//                       {list.text}
//                     </p>
//                   </Fragment>
//                 ))}
//               </Card.Body>
//             </Card>
//           )}

//           {mission.length > 0 && (
//             <Card className="my-4">
//               <Card.Body className="p-4">
//                 <div className="d-flex justify-content-between pb-2">
//                   <h5 className="font-weight-semibold">Our Mission</h5>
//                 </div>
//                 {mission.map((list) => (
//                   <div className="desc pr-xl-5 mr-xl-2" key={list.id}>
//                     <p className="text-body-14 font-weight-normal m-0">
//                       {list.text}
//                     </p>
//                   </div>
//                 ))}
//               </Card.Body>
//             </Card>
//           )}

//           {vision.length > 0 && (
//             <Card className="my-4">
//               <Card.Body className="p-4">
//                 <div className="d-flex justify-content-between pb-2">
//                   <h5 className="font-weight-semibold">Our Vision</h5>
//                 </div>
//                 {vision.map((list) => (
//                   <div className="desc pr-xl-5 mr-xl-2" key={list.id}>
//                     <p className="text-body-14 font-weight-normal m-0">
//                       {list.text}
//                     </p>
//                   </div>
//                 ))}
//               </Card.Body>
//             </Card>
//           )}

//           {ourLogo.length > 0 && (
//             <Card className="my-4">
//               <Card.Body className="p-4">
//                 <div className="d-flex justify-content-between pb-2">
//                   <h5 className="font-weight-semibold">Our Logo</h5>
//                 </div>
//                 {ourLogo.map((list) => (
//                   <Fragment key={list.id}>
//                     <div className="d-flex align-items-center w-100 mt-2">
//                       <picture className="user-profile-pic rounded-pill mr-3">
//                         <source src={list?.imageURL} type="image/jpg" />
//                         <img
//                           src={list?.imageURL}
//                           alt=""
//                           width="92"
//                           height="92"
//                           onError={(e) => {
//                             e.target.src = "/assets/images/error.jpg";
//                             e.target.alt = "failed to load image";
//                             e.onerror = null;
//                           }}
//                         />
//                       </picture>
//                     </div>

//                     <div className="desc pr-xl-5 mr-xl-2 mt-4">
//                       <p className="text-body-14 font-weight-normal m-0">
//                         {list?.text}
//                       </p>
//                     </div>
//                   </Fragment>
//                 ))}
//               </Card.Body>
//             </Card>
//           )}

//           {environment.length > 0 && (
//             <Card className="my-4">
//               <Card.Body className="p-4">
//                 <div className="d-flex flex-wrap justify-content-between pb-md-2 pb-3">
//                   <h5 className="font-weight-semibold">
//                     Our Environment Commitments
//                   </h5>
//                   {environmentPdf.length > 0 && (
//                     <Button
//                       variant="btn btn-outline-info font-14"
//                       onClick={() => window.open(environmentPdf[0], "_blank")}
//                     >
//                       Download
//                     </Button>
//                   )}
//                   {/* <div>
//               <Button variant="btn btn-outline-info btn-hover-icon-white btn-sm">
//                 Download PDF
//               </Button>
//             </div> */}
//                 </div>
//                 <div className="desc pr-xl-5 mr-xl-2">
//                   {/* <div className="d-flex align-items-center w-100">
//               <picture className="user-profile-pic rounded-8 mr-3">
//                 <source src={preview} type="image/jpg" />
//                 <img src={preview} alt="" width="90" height="90" />
//               </picture>
//               <picture className="user-profile-pic rounded-8 mr-3">
//                 <source src={preview} type="image/jpg" />
//                 <img src={preview} alt="" width="90" height="90" />
//               </picture>
//               <picture className="user-profile-pic rounded-8 mr-3">
//                 <source src={preview} type="image/jpg" />
//                 <img src={preview} alt="" width="90" height="90" />
//               </picture>
//             </div> */}
//                   {environment.map((list) => {
//                     if (list.docURL !== "") {
//                       environmentPdf.push(list.docURL);
//                     }

//                     return (
//                       <div className="desc pr-xl-5 mr-xl-2" key={list.id}>
//                         <p className="text-body-14 font-weight-normal m-0">
//                           {list.text}
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </Card.Body>
//             </Card>
//           )}

//           {social.length > 0 && (
//             <Card className="my-4">
//               <Card.Body className="p-4">
//                 <div className="d-flex flex-wrap justify-content-between pb-md-2 pb-3">
//                   <h5 className="font-weight-semibold">
//                     Our Social Commitments
//                   </h5>
//                   {socialPdf.length > 0 && (
//                     <Button
//                       variant="btn btn-outline-info font-14"
//                       onClick={() => window.open(socialPdf[0], "_blank")}
//                     >
//                       Download
//                     </Button>
//                   )}
//                   {/* <div>
//                 <Button variant="btn btn-outline-info btn-hover-icon-white btn-sm">
//                   <span className="ml-1">Download PDF</span>
//                 </Button>
//               </div> */}
//                 </div>
//                 <div className="desc pr-xl-5 mr-xl-2">
//                   {/* <div className="d-flex align-items-center w-100">
//                 <picture className="user-profile-pic rounded-8 mr-3">
//                   <source src={preview} type="image/jpg" />
//                   <img src={preview} alt="" width="90" height="90" />
//                 </picture>
//                 <picture className="user-profile-pic rounded-8 mr-3">
//                   <source src={preview} type="image/jpg" />
//                   <img src={preview} alt="" width="90" height="90" />
//                 </picture>
//                 <picture className="user-profile-pic rounded-8 mr-3">
//                   <source src={preview} type="image/jpg" />
//                   <img src={preview} alt="" width="90" height="90" />
//                 </picture>
//               </div> */}
//                   {social.map((list) => {
//                     if (list.docURL !== "") {
//                       socialPdf.push(list.docURL);
//                     }
//                     return (
//                       <div className="desc pr-xl-5 mr-xl-2" key={list.id}>
//                         <p className="text-body-14 font-weight-normal m-0">
//                           {list.text}
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </Card.Body>
//             </Card>
//           )}
//         </>
//       )}
//     </>
//   );
// }

// export default AboutPage;
