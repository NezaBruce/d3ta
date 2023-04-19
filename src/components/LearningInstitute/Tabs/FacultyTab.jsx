// import React, { Fragment, useEffect, useState } from "react";
// import { Button, Card, Spinner } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { callApi } from "../../../api";
// import API from "../../../api/Routes";
// import Pagination from "rc-pagination";
// import swal from "sweetalert";
// import { showModalNotification } from "../../../utils/Functions";

// function FacultyTab({ instituteId }) {
//   const dispatch = useDispatch();
//   const [listing, setListing] = useState([]);
//   const [pagesize, setPageSize] = useState(3);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const userPermissions = useSelector((state) => state.admin.userPermissions);

//   useEffect(() => {
//     getFacultyList();
//   }, [page, pagesize]);

//   /******************* 
//   @Purpose : Used for Faculty job List
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const getFacultyList = async () => {
//     let body = {
//       page,
//       pagesize,
//       instituteId,
//       searchText: "",
//     };
//     try {
//       setLoading(true);
//       const response = await Promise.resolve(
//         dispatch(callApi(API.GET_FACULTY_LIST, body, "post", null, true, false))
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
//   @Purpose : Used for remove handler
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const removeHandler = (id) => {
//     swal({
//       title: "Are you sure, you want to delete ?",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     }).then(async (willDelete) => {
//       if (willDelete) {
//         const response = await Promise.resolve(
//           dispatch(
//             callApi(
//               `${API.DELETE_FACULTY}${id}`,
//               {},
//               "delete",
//               null,
//               true,
//               false
//             )
//           )
//         );
//         if (response.status === 1) {
//           showModalNotification(response.message);
//           getFacultyList();
//         }
//       }
//     });
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
//         <div className="d-flex justify-content-between mb-3 align-items-md-center flex-sm-row flex-column">
//           <h5 className="font-weight-semibold">Faculties</h5>
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
//                 <div className="mr-2 rounded-pill overflow-hidden flex-shrink-0 border border-geyser w-h-48">
//                   <img
//                     src={list?.image}
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
//                   <h6 className="mb-2 text-body-16">{list?.name}</h6>
//                   <span className="text-gray text-body-14  d-block mb-2">
//                     {list?.designation}
//                   </span>
//                   <p className="text-body-14 font-weight-normal mt-1 mb-0">
//                     {list?.description}
//                   </p>
//                 </div>
//                 {userPermissions &&
//                   userPermissions.includes("peer_producers_delete") && (
//                     <span
//                       className="text-primary ml-sm-auto ml-2 flex-shrink-0 text-body-14 cursor-pointer"
//                       onClick={() => removeHandler(list.id)}
//                     >
//                       Remove
//                     </span>
//                   )}
//               </div>
//               <hr className="my-4" />
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
//     </Card>
//   );
// }

// export default FacultyTab;
