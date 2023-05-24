// import React, { useEffect } from "react";
// import { useState } from "react";
// import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { callApi } from "../../../api";
// import API from "../../../api/Routes";
// import { showMessageNotification } from "../../../utils/Functions";
// import Pagination from "rc-pagination";
// import { Button, Form, Modal } from "react-bootstrap";

// function Notifications(props) {
//   const [data, setData] = useState([]);
//   const [pagesize, setPagesize] = useState(10);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [title, setTitle] = useState("");
//   const [notificationId, setNotificationId] = useState("");
//   const [notificationStatus, setNotificationStatus] = useState(false);

//   const history = useHistory();

//   useEffect(() => {
//     history.push("/global-settings/notifications");
//     getSettings();
//   }, [page, pagesize]);

//   /******************* 
//   @Purpose : Used for get settings
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const getSettings = async () => {
//     try {
//       let body = {
//         page,
//         pagesize,
//       };

//       const response = await props.callApi(
//         API.GET_NOTIF_SETTINGS,
//         body,
//         "post",
//         null,
//         true,
//         false,
//       );
//       if (response.status === 1) {
//         setData(response?.data?.rows);
//         setTotal(response?.data?.count);
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   /******************* 
//   @Purpose : Used for setting change
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const handleStatusChange = async (status, id, titleName) => {
//     let body = {
//       id,
//       status,
//       title: titleName,
//     };

//     try {
//       const response = await props.callApi(
//         API.ADD_NOTIF_SETTINGS,
//         body,
//         "post",
//         null,
//         true,
//         false,
//       );
//       if (response.status === 1) {
//         getSettings();
//         showMessageNotification("Record updated successfully.");
//         modelCloseBtn();
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   /******************* 
//   @Purpose : Used for Notification update
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const saveHandler = async () => {
//     if (title === "") {
//       showMessageNotification("Title is required...", "error");
//     } else {
//       handleStatusChange(notificationStatus, notificationId, title);
//     }
//   };

//   /******************* 
//   @Purpose : Used for model close
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const modelCloseBtn = () => {
//     setShowModal(false);
//   };

//   /********************************************************
//    * Handle Pagination change
//    * @author INIC
//    * @param {number} pageNo
//    * @param {number} pageSize
//    * @returns {void}
//    ********************************************************/
//   const paginationChange = (page, pagesize) => {
//     setPage(page);
//     setPagesize(pagesize);
//   };

//   return (
//     <>
//       <div className="table-responsive">
//         <table
//           className="table row-border nowrap common-datatable"
//           id="user-listing"
//         >
//           <thead>
//             <tr>
//               <th>Notifications</th>
//               <th className="text-center">Status</th>
//               <th className="all text-center">
//                 <b>Action</b>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((ele, i) => (
//               <tr key={ele.id}>
//                 <td>{ele.title}</td>
//                 <td className="text-center">
//                   <div className="custom-control custom-switch light">
//                     <input
//                       type="checkbox"
//                       className="custom-control-input "
//                       id={ele.id}
//                       name={ele.title}
//                       checked={ele.status}
//                       onChange={() => {
//                         ele.status = !ele.status;
//                         handleStatusChange(ele.status, ele.id);
//                       }}
//                     />
//                     <label
//                       className="custom-control-label"
//                       htmlFor={ele.id}
//                     ></label>
//                   </div>
//                 </td>
//                 <td className="text-center">
//                   <i
//                     className="bx bx-edit mr-2 cursor-pointer"
//                     onClick={() => {
//                       setTitle(ele?.title);
//                       setNotificationId(ele?.id);
//                       setNotificationStatus(ele?.status);
//                       setShowModal(true);
//                     }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="d-flex justify-content-end mt-2">
//         <Pagination
//           className="ant-pagination"
//           pageSize={pagesize}
//           current={page}
//           total={total}
//           onChange={paginationChange}
//           showTitle={false}
//         />
//       </div>
//       <Modal centered show={showModal} onHide={modelCloseBtn}>
//         <Modal.Header closeButton>
//           <div className="d-flex align-items-center">
//             <h5 className="modal-title" id="exampleModalLongTitle">
//               Notification
//             </h5>
//           </div>
//         </Modal.Header>
//         <Modal.Body closeButton>
//           <div className="card-body content">
//             <div className="form-row">
//               <div className="form-group col-md-12">
//                 <label className="text-capitalize text-dark pb-2">Title</label>
//                 <input
//                   value={title}
//                   className="form-control col-lg-12"
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </div>
//               <div className="mt-3">
//                 <Button
//                   variant="info px-4 text-uppercase mx-sm-2 mb-2 w-sm-100"
//                   size="sm"
//                   onClick={saveHandler}
//                 >
//                   Save
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default connect(null, { callApi })(Notifications);
