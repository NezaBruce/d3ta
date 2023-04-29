// import React, { Fragment, useEffect, useState } from "react";
// import { Card, Spinner } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { callApi } from "../../api";
// import API from "../../api/Routes";
// import Pagination from "rc-pagination";
// import { Link } from "react-router-dom";

// function JobsPage({ instituteId, logo, accordion }) {
//   const dispatch = useDispatch();
//   const [listing, setListing] = useState([]);
//   const [pagesize, setPageSize] = useState(3);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(1);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (accordion.jobs === "1") getJobList();
//   }, [page, pagesize, accordion.jobs]);

//   /******************* 
//   @Purpose : Used for get job List
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const getJobList = async () => {
//     let body = {
//       page,
//       pagesize,
//       instituteId,
//       searchText: "",
//     };
//     try {
//       setLoading(true);
//       const response = await Promise.resolve(
//         dispatch(callApi(API.GET_JOB_LIST, body, "post", null, true, false))
//       );
//       if (response.status === 1) {
//         setListing(response?.data?.rows);
//         setTotal(response?.data?.total);
//         setLoading(false);
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   /*******************
//    @Purpose : pagination change
//    @Parameter : {}
//    @Author : INIC
//    ******************/
//   const paginationChange = (page, pageSize) => {
//     setPage(page);
//     setPageSize(pageSize);
//   };

//   return (
//     <Card className="my-4 mb-0">
//       <Card.Body>
//         <div className="d-flex justify-content-between  align-items-center mb-4  ">
//           <h5 className="font-weight-semibold">Recent Job Opening</h5>
//         </div>

//         {loading ? (
//           <div className="text-center mt-4 mb-3">
//             <Spinner animation="border" variant="primary" />
//           </div>
//         ) : listing === undefined ||
//           (Array.isArray(listing) && listing.length === 0) ? (
//           <h6 className="text-center text-danger not-found-txt" colSpan="6">
//             No Records Found!
//           </h6>
//         ) : (
//           Array.isArray(listing) &&
//           listing.map((list) => (
//             <Fragment key={list.id}>
//               <div className="d-flex flex-row">
//                 {/* <div className="mr-2 rounded-pill overflow-hidden flex-shrink-0 border border-geyser w-h-48">
//                   <picture>
//                     <source srcset={logo} type="image/png" />
//                     <img src={logo} alt="expirince" width="54" height="54" />
//                   </picture>
//                 </div> */}
//                 <div className="mr-2 rounded-pill overflow-hidden flex-shrink-0 border border-geyser w-h-48">
//                   <img
//                     src={logo}
//                     width="54"
//                     height="54"
//                     onError={(e) => {
//                       e.target.src = "/assets/images/error.jpg";
//                       e.target.alt = "failed to load image";
//                       e.onerror = null;
//                     }}
//                   />
//                 </div>
//                 <div className="exp-desc ml-2">
//                   <div className="d-flex flex-md-row flex-column">
//                     <div>
//                       <h6 className="mb-2 text-body-16">{list?.profession}</h6>
//                       <span className="text-gray text-body-14 font-weight-normal d-block mb-2">
//                         {list?.address}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-body-14 font-weight-normal mt-2">
//                     {list?.jobDescription}
//                   </p>{" "}
//                   <Link
//                     to={{
//                       pathname:
//                         "/peer-producers/learning-institute/job-details",
//                       state: { id: list?.id, logo },
//                     }}
//                   >
//                     <span className="text-primary ml-sm-auto  ml-2 my-sm-auto flex-shrink-0 text-body-14 cursor-pointer">
//                       View Detail
//                     </span>
//                   </Link>
//                   <Link
//                     to={{
//                       pathname:
//                         "/peer-producers/learning-institute/job-applicants",
//                       state: {
//                         jobId: list?.id,
//                         logo,
//                         instituteId,
//                         title: list?.profession,
//                         address: list?.address,
//                       },
//                     }}
//                   >
//                     <span className="text-primary  ml-2 my-sm-auto flex-shrink-0 text-body-14 cursor-pointer">
//                       Job Applicants
//                     </span>
//                   </Link>
//                 </div>
//               </div>
//               <hr />
//             </Fragment>
//           ))
//         )}
//         <div className="pagination-list mt-2 d-flex justify-content-end">
//           <Pagination
//             className="ant-pagination"
//             pageSize={pagesize}
//             current={page}
//             total={total}
//             onChange={paginationChange}
//             showTitle={false}
//           />
//         </div>
//       </Card.Body>
//       {/* <span class=" view-all text-secondary font-weight-semibold rounded-b-8 bg-blueberry-whip py-12  text-body-14 text-center">
//         View all
//       </span> */}
//     </Card>
//   );
// }

// export default JobsPage;
