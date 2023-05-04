// import React, { useEffect, useState } from "react";
// import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
// import Datetime from "react-datetime";
// import { useDispatch } from "react-redux";
// import { callApi } from "../../api";
// import API from "../../api/Routes";
// import Pagination from "rc-pagination";
// import Loader from "../Loader/Loader";
// import moment from "moment";
// import ErrorMessages from "../../utils/ErrorMessages";
// import { FILE_URL } from "../../config";

// function Purchases({ purchase, setPurchase, instituteId }) {
//   const dispatch = useDispatch();
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   let [errors, setErrors] = useState("");
//   const [listing, setListing] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pagesize, setPageSize] = useState(5);
//   const [total, setTotal] = useState(1);
//   const [loading, setLoading] = useState(false);

//   /******************* 
//   @Purpose : Used for model close
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const modelCloseBtn = () => {
//     setPurchase(false);
//     setStartDate("");
//     setEndDate("");
//     setListing([]);
//     setTotal(1);
//   };

//   let inputProps = {
//     placeholder: "Enter dates",
//   };

//   useEffect(() => {
//     if (startDate !== "" && endDate !== "") executeHandler();
//   }, [page, pagesize]);

//   /******************* 
//   @Purpose : Used for validation
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const validation = () => {
//     errors = {
//       startDate: "",
//       endDate: "",
//     };

//     if (startDate === "") errors.startDate = ErrorMessages.REQUIRED;
//     else errors.startDate = "";

//     if (endDate === "") errors.endDate = ErrorMessages.REQUIRED;
//     else errors.endDate = "";

//     if (errors.startDate !== "" || errors.endDate !== "") {
//       setErrors(errors);
//       return false;
//     } else {
//       setErrors(errors);
//       return true;
//     }
//   };

//   /******************* 
//   @Purpose : Used for execute Handler
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const executeHandler = async () => {
//     let body = {
//       instituteId,
//       startDate,
//       endDate,
//       page,
//       pagesize,
//     };
//     if (validation()) {
//       try {
//         setLoading(true);
//         const response = await Promise.resolve(
//           dispatch(
//             callApi(API.GET_PURCHASE_LIST, body, "post", null, true, false)
//           )
//         );
//         if (response.status === 1) {
//           setListing(response?.data?.rows);
//           setTotal(response?.data?.total);
//           setLoading(false);
//         }
//       } catch (err) {
//         throw err;
//       }
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

//   /*******************
//    @Purpose : download handler
//    @Parameter : {}
//    @Author : INIC
//    ******************/
//   const downloadhandler = async () => {
//     let body = {
//       instituteId,
//       startDate,
//       endDate,
//       page,
//       pagesize: total,
//     };
//     try {
//       setLoading(true);
//       const response = await Promise.resolve(
//         dispatch(
//           callApi(API.DOWNLOAD_PURCHASE_LIST, body, "post", "blob", true, false)
//         )
//       );
//       if (response.status === 1) {
//         window.open(FILE_URL + response?.data?.downloadPath, "_self");
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   return (
//     <Modal
//       className="modal-dialog-lg"
//       centered
//       show={purchase}
//       onHide={modelCloseBtn}
//     >
//       <Modal.Header closeButton>
//         <div className="d-flex align-items-center">
//           <h5 className="modal-title" id="exampleModalLongTitle">
//             Purchases
//           </h5>
//         </div>
//       </Modal.Header>
//       <Modal.Body closeButton>
//         <div>
//           <div className="container-fluid ">
//             <Form>
//               <div className="px-2 my-4  scroll-block  ">
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <span className="form-label">
//                         {" "}
//                         Start Date <sup>*</sup>
//                       </span>
//                       <div className="calendar-wrap">
//                         <Datetime
//                           closeOnSelect
//                           utc={true}
//                           timeFormat={false}
//                           inputProps={inputProps}
//                           value={startDate}
//                           dateFormat="DD/MM/YYYY"
//                           isValidDate={(currentDate) =>
//                             endDate ? currentDate.isBefore(endDate) : true
//                           }
//                           renderInput={(props) => {
//                             return (
//                               <input
//                                 {...props}
//                                 value={startDate ? props.value : ""}
//                               />
//                             );
//                           }}
//                           onChange={(value) => {
//                             setStartDate(value.utc().valueOf());
//                             setErrors({ ...errors, startDate: "" });
//                           }}
//                         />
//                         <em className="icon icon-calendar"></em>
//                       </div>
//                       <span className="text-danger d-block">
//                         {errors.startDate}
//                       </span>
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <span className="form-label">
//                         {" "}
//                         End Date <sup>*</sup>
//                       </span>
//                       <div className="calendar-wrap">
//                         <Datetime
//                           closeOnSelect
//                           utc={true}
//                           timeFormat={false}
//                           inputProps={inputProps}
//                           value={endDate}
//                           dateFormat="DD/MM/YYYY"
//                           isValidDate={(currentDate) => {
//                             return startDate
//                               ? currentDate.isAfter(startDate)
//                               : currentDate.isBefore(new Date());
//                           }}
//                           renderInput={(props) => {
//                             return (
//                               <input
//                                 {...props}
//                                 value={endDate ? props.value : ""}
//                               />
//                             );
//                           }}
//                           onChange={(value) => {
//                             setEndDate(value.utc().valueOf());
//                             setErrors({ ...errors, endDate: "" });
//                           }}
//                         />
//                         <em className="icon icon-calendar"></em>
//                       </div>
//                       <span className="text-danger d-block">
//                         {errors.endDate}
//                       </span>
//                     </Form.Group>
//                   </Col>
//                   <Col md={12} className="text-right">
//                     <Button
//                       variant="outline-info px-3 mb-20"
//                       onClick={executeHandler}
//                     >
//                       Execute
//                     </Button>
//                     {listing.length > 0 && (
//                       <Button
//                         variant="outline-info px-3 mb-20 ml-3"
//                         onClick={downloadhandler}
//                       >
//                         Download
//                       </Button>
//                     )}
//                   </Col>
//                 </Row>

//                 <div>
//                   <Table
//                     className="video-listed-item-table font-14 mt-2"
//                     responsive="lg"
//                   >
//                     <thead>
//                       <tr>
//                         <th>Sr. No.</th>
//                         <th>Date</th>
//                         <th>User Name</th>
//                         <th>Activity Type</th>
//                         <th>Title</th>
//                         <th>Credits</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {listing === undefined ||
//                       (Array.isArray(listing) && listing.length === 0) ? (
//                         <tr className="text-center text-danger not-found-txt">
//                           <td colSpan="6">
//                             {!loading ? (
//                               <h6
//                                 className="text-center text-danger not-found-txt"
//                                 colSpan="6"
//                               >
//                                 No Records Found!
//                               </h6>
//                             ) : (
//                               <Loader />
//                             )}
//                           </td>
//                         </tr>
//                       ) : (
//                         Array.isArray(listing) &&
//                         listing.map((list, index) => (
//                           <tr key={list.id}>
//                             <td>{index + 1}</td>
//                             <td>
//                               {moment(list?.createdAt, "x").format(
//                                 "DD MMM YYYY"
//                               )}
//                             </td>
//                             <td>{`${
//                               list?.userDetails?.firstName
//                                 ?.charAt(0)
//                                 .toUpperCase() +
//                               list?.userDetails?.firstName?.slice(1)
//                             } ${
//                               list?.userDetails?.lastName
//                                 ?.charAt(0)
//                                 .toUpperCase() +
//                               list?.userDetails?.lastName?.slice(1)
//                             }`}</td>
//                             <td>{list?.type}</td>
//                             <td>{list?.courseDetails?.title}</td>
//                             <td>150</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </Table>
//                 </div>
//                 <div className="pagination-list mt-2 d-flex justify-content-end">
//                   <Pagination
//                     className="ant-pagination"
//                     pageSize={pagesize}
//                     current={page}
//                     total={total}
//                     onChange={paginationChange}
//                     showTitle={false}
//                   />
//                 </div>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default Purchases;
