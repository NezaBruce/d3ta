// import moment from "moment";
// import React from "react";
// import {
//   Button,
//   Card,
//   Col,
//   Container,
//   Row,
//   Spinner,
//   Table,
// } from "react-bootstrap";
// import CandidateTable from "./Table/CandidateTable";

// function CandidateDetails({ dataList }) {
//   return (
//     <Col md={8} className="pl-2">
//       <Card className="my-4">
//         <Card.Body className="p-3 border-bottom-geyser">
//           <div className="d-md-flex align-items-center flex-row">
//             <div className="d-flex mb-mb-0 mb-3 flex-wrap align-items-center">
//               <div className="exp-desc">
//                 <h6>
//                   {`About ${
//                     dataList?.userDetails?.firstName?.charAt(0).toUpperCase() +
//                     dataList?.userDetails?.firstName?.slice(1)
//                   } ${
//                     dataList?.userDetails?.lastName?.charAt(0).toUpperCase() +
//                     dataList?.userDetails?.lastName?.slice(1)
//                   }`}
//                 </h6>
//                 <p className="text-body-14 text-gray font-weight-normal mb-2">
//                   Project manger at Avio
//                 </p>
//                 <p className="text-body-14 mb-0 text-gray font-weight-normal">
//                   {`Applied ${moment(dataList.createdAt).fromNow()}`}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card.Body>
//       </Card>
//       <Card className="my-4">
//         <Card.Header className="pb-0">
//           <h3 className="h6 mb-0">Required Skills</h3>
//         </Card.Header>
//         <Card.Body className="p-3 border-bottom-geyser">
//           <CandidateTable listing={dataList?.userDetails?.hardSkills} />

//           <hr />
//           <CandidateTable listing={dataList?.userDetails?.softSkills} />
//           <hr />
//           <CandidateTable listing={dataList?.userDetails?.softSkills} />
//         </Card.Body>
//       </Card>

//       <Card className="my-4">
//         <Card.Body className="p-3">
//           <h6 className="mb-3">
//             Why the candidate feel to be a suitable for this job?
//           </h6>
//           <p className="text-body-14 font-weight-normal m-0">
//             {dataList?.reason}
//           </p>
//         </Card.Body>
//       </Card>

//       <Card className="my-4">
//         <Card.Body className="p-3">
//           <div className="d-flex flex-wrap align-items-center">
//             <h6 className="mb-0">Curriculum Preview</h6>
//             <Button
//               variant="btn btn-outline-info btn-hover-icon-white btn-sm ml-auto d-flex align-items-center"
//               target="_blank"
//               type="link"
//               href={dataList?.resume}
//             >
//               <i className="bx bxs-download mr-2 font-20"></i> Download
//             </Button>
//           </div>
//           <div className="mt-3 border border-geyser rounded-8 overflow-hidden">
//             <object
//               data={`${dataList?.resume}`}
//               type="application/pdf"
//               className="previewImage w-100"
//             />
//           </div>
//         </Card.Body>
//       </Card>
//     </Col>
//   );
// }

// export default CandidateDetails;
