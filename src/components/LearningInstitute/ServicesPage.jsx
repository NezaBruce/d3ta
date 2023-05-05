// import React, { Fragment, useEffect, useState } from "react";
// import { Card, Spinner } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { callApi } from "../../api";
// import API from "../../api/Routes";
// import Pagination from "rc-pagination";
// import { showModalNotification } from "../../utils/Functions";
// import swal from "sweetalert";

// function ServicesPage({ instituteId, accordion }) {
//   const dispatch = useDispatch();
//   const [listing, setListing] = useState([]);
//   const [pagesize, setPageSize] = useState(3);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const userPermissions = useSelector((state) => state.admin.userPermissions);

//   useEffect(() => {
//     if (accordion.services === "1") getServicesList();
//   }, [page, pagesize, accordion.services]);

//   /******************* 
//   @Purpose : Used for services job List
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const getServicesList = async () => {
//     let body = {
//       page,
//       pagesize,
//       instituteId,
//       searchText: "",
//     };
//     try {
//       setLoading(true);
//       const response = await Promise.resolve(
//         dispatch(callApi(API.GET_SERVICE_LIST, body, "post", null, true, false))
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
//               `${API.DELETE_SERVICE}${id}`,
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
//           getServicesList();
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
//         <div className="d-flex justify-content-between  align-items-center mb-4">
//           <h5 className="font-weight-semibold">Services</h5>
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
//                   <a
//                     target="_blank"
//                     href={list?.linkContact}
//                     className="mb-2 text-body-16 cursor-pointer"
//                   >
//                     {list?.name}
//                   </a>

//                   <div className="text-body-14 d-flex flex-sm-row flex-column ">
//                     <span className="mb-1">{list?.email}</span>
//                     <span className="mb-1">
//                       {" "}
//                       <span className="px-2  lh-1 text-gray d-sm-inline d-none">
//                         •
//                       </span>{" "}
//                       {list?.contact}
//                     </span>
//                   </div>
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

// export default ServicesPage;
