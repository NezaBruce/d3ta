// import React, { useState } from "react";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { connect } from "react-redux";
// import { callApi } from "../../../api";
// import API from "../../../api/Routes";
// import { showModalNotification } from "../../../utils/Functions";

// function ChangePassword(props) {
//   const initialValues = {
//     oldPassword: "",
//     newPassword: "",
//     conPassword: "",
//   };
//   const [password, setPassword] = useState(initialValues);

//   const [oldHidden, setOldHidden] = useState(true);
//   const [newHidden, setNewHidden] = useState(true);
//   const [conHidden, setConHidden] = useState(true);

//   let [errors, setErrors] = useState({});

//   /******************* 
//   @Purpose : Used for validation
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const validate = () => {
//     errors = {
//       oldPassword: "",
//       newPassword: "",
//       conPassword: "",
//     };

//     var regularExpression =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

//     if (!password.oldPassword) errors.oldPassword = "Please enter old password";
//     else errors.oldPassword = "";

//     if (!password.newPassword) errors.newPassword = "Please enter new password";
//     else if (!regularExpression.test(password.newPassword))
//       errors.newPassword =
//         "password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters";
//     else errors.newPassword = "";

//     if (!password.conPassword)
//       errors.conPassword = "Please enter confirm new password";
//     else if (password.newPassword !== password.conPassword)
//       errors.conPassword = "Pasword doesn't match";
//     else errors.conPassword = "";

//     if (
//       errors.oldPassword !== "" ||
//       errors.newPassword !== "" ||
//       errors.conPassword !== ""
//     ) {
//       setErrors(errors);
//       return false;
//     } else {
//       setErrors(errors);
//       return true;
//     }
//   };

//   /******************* 
//   @Purpose : Used for password submit
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const passwordHandler = async () => {
//     if (validate()) {
//       let body = {
//         oldPassword: password.oldPassword,
//         newPassword: password.newPassword,
//       };
//       let response;
//       try {
//         response = await props.callApi(
//           API.CHANGE_PASSWORD,
//           body,
//           "post",
//           null,
//           true,
//           false
//         );
//         if (response.status === 1) {
//           showModalNotification(response.message);
//           setPassword(initialValues);
//         } else {
//           showModalNotification(response.message);
//         }
//       } catch (err) {
//         showModalNotification(response.message);
//         throw err;
//       }
//     }
//   };

//   return (
//     <div className="tabs-block p-0">
//       <div className="card-body content">
//         <h4 className="pb-5 font-weight-bold">Change Password</h4>
//         <div className="form-row">
//           <div className="form-group col-md-8">
//             <label for="oldPassword" className="text-capitalize text-dark pb-2">
//               Old Password
//             </label>
//             <div className="input-group">
//               <input
//                 type={oldHidden ? "password" : "text"}
//                 className="form-control col-lg-8"
//                 id="oldPassword"
//                 value={password.oldPassword}
//                 onChange={(e) => {
//                   setPassword({
//                     ...password,
//                     oldPassword: e.target.value,
//                   });
//                 }}
//               />
//               <div className="input-group-append">
//                 <span
//                   className="px-3 py-0 input-group-text cursor-pointer"
//                   onClick={() => setOldHidden(!oldHidden)}
//                 >
//                   <em className="icon icon-eye-close pointer"></em>
//                   {oldHidden ? (
//                     <i className="bx bx-hide"></i>
//                   ) : (
//                     <i className="bx bx-show"></i>
//                   )}
//                 </span>
//               </div>
//             </div>
//             <span className="error-msg" style={{ color: "red" }}>
//               {errors.oldPassword}
//             </span>
//           </div>
//           <div className="form-group col-md-8">
//             <label for="newPassword" className="text-capitalize text-dark pb-2">
//               New Password
//             </label>
//             <div className="input-group">
//               <input
//                 type={newHidden ? "password" : "text"}
//                 className="form-control col-lg-8"
//                 id="newPassword"
//                 value={password.newPassword}
//                 onChange={(e) => {
//                   setPassword({
//                     ...password,
//                     newPassword: e.target.value,
//                   });
//                 }}
//               />

//               <div className="input-group-append">
//                 <span
//                   className="px-3 py-0 input-group-text cursor-pointer"
//                   onClick={() => setNewHidden(!newHidden)}
//                 >
//                   <em className="icon icon-eye-close pointer"></em>
//                   {newHidden ? (
//                     <i className="bx bx-hide"></i>
//                   ) : (
//                     <i className="bx bx-show"></i>
//                   )}
//                 </span>
//               </div>
//             </div>
//             <span className="error-msg" style={{ color: "red" }}>
//               {errors.newPassword}
//             </span>
//           </div>
//           <div className="form-group col-md-8">
//             <label
//               for="conNewPassword"
//               className="text-capitalize text-dark pb-2"
//             >
//               Confirm New Password
//             </label>
//             <div className="input-group">
//               <input
//                 type={conHidden ? "password" : "text"}
//                 className="form-control col-lg-8"
//                 id="conNewPassword"
//                 value={password.conPassword}
//                 onChange={(e) => {
//                   setPassword({
//                     ...password,
//                     conPassword: e.target.value,
//                   });
//                 }}
//               />
//               <div className="input-group-append">
//                 <span
//                   className="px-3 py-0 input-group-text cursor-pointer"
//                   onClick={() => setConHidden(!conHidden)}
//                 >
//                   <em className="icon icon-eye-close pointer"></em>
//                   {conHidden ? (
//                     <i className="bx bx-hide"></i>
//                   ) : (
//                     <i className="bx bx-show"></i>
//                   )}
//                 </span>
//               </div>
//             </div>
//             <span className="error-msg" style={{ color: "red" }}>
//               {errors.conPassword}
//             </span>
//           </div>
//         </div>
//         <div className="text-right mt-2 pr-5 pb-5">
//           <button className="btn btn-primary" onClick={passwordHandler}>
//             Save Changes
//           </button>
//           <button
//             className="btn btn-secondary ml-4"
//             onClick={() => setPassword(initialValues)}
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default connect(null, { callApi })(ChangePassword);
