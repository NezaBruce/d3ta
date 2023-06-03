// import React, { useEffect, useState } from "react";
// import { showModalNotification } from "../../../utils/Functions";
// import { connect } from "react-redux";
// import { callApi } from "../../../api";
// import API from "../../../api/Routes";
// function SocialMedia({ setSocialMedia, socialMedia, callApi }) {
//   /******************* 
//   @Purpose : Used for submit
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const saveHandler = async () => {
//     if (
//       socialMedia.fbUrl === "" &&
//       socialMedia.youtubeUrl === "" &&
//       socialMedia.linkedInUrl === "" &&
//       socialMedia.instagramUrl === ""
//     ) {
//       showModalNotification("Please enter social media link...", "error");
//     } else {
//       let body = {
//         id: socialMedia.id,
//         fbUrl: socialMedia.fbUrl,
//         youtubeUrl: socialMedia.youtubeUrl,
//         linkedInUrl: socialMedia.linkedInUrl,
//         instagramUrl: socialMedia.instagramUrl,
//       };
//       try {
//         const response = await callApi(
//           API.ADD_SOCIAL_MEDIA_LINKS,
//           body,
//           "post",
//           null,
//           true,
//           false
//         );
//         if (response.status === 1) {
//           showModalNotification("Social Media Links update");
//         }
//       } catch (err) {
//         throw err;
//       }
//     }
//   };

//   return (
//     <div className="card-body content">
//       <h4 className="pb-5 font-weight-bold">Social Media Links</h4>
//       <div className="row">
//         <div className="col-md-6">
//           <div className="notification-title d-flex align-items-center mb-md-4 mb-3">
//             <div className="icon d-flex align-items-center justify-content-center mr-1">
//               <i className="bx bxl-facebook" />
//             </div>
//             <div className="text">
//               <h5 className="mb-0">Facebook</h5>
//             </div>
//           </div>
//           <div className="form-group mb-md-5 mb-3">
//             <label htmlFor="FbUrl">Facebook URL</label>
//             <input
//               type="text"
//               className="form-control"
//               id="fbUrl"
//               name="fbUrl"
//               placeholder="https://"
//               value={socialMedia?.fbUrl}
//               onChange={(e) => {
//                 setSocialMedia({
//                   ...socialMedia,
//                   fbUrl: e.target.value,
//                 });
//               }}
//             />
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="notification-title d-flex align-items-center mb-md-4 mb-3 mt-md-0 mt-3">
//             <div className="icon d-flex align-items-center justify-content-center mr-1">
//               <i className="bx bxl-instagram" />
//             </div>
//             <div className="text">
//               <h5 className="mb-0">Instagram</h5>
//             </div>
//           </div>
//           <div className="form-group mb-md-5 mb-3">
//             <label htmlFor="InUrl">Instagram URL</label>
//             <input
//               type="text"
//               className="form-control"
//               id="instagramUrl"
//               name="instagramUrl"
//               placeholder="https://"
//               value={socialMedia?.instagramUrl}
//               onChange={(e) => {
//                 setSocialMedia({
//                   ...socialMedia,
//                   instagramUrl: e.target.value,
//                 });
//               }}
//             />
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="notification-title d-flex align-items-center mb-md-4 mb-3 mt-md-5 mt-3">
//             <div className="icon d-flex align-items-center justify-content-center mr-1">
//               <i className="bx bxl-youtube" />
//             </div>
//             <div className="text">
//               <h5 className="mb-0">YouTube</h5>
//             </div>
//           </div>
//           <div className="form-group mb-md-5 mb-3">
//             <label htmlFor="TwUrl">YouTubeURL</label>
//             <input
//               type="text"
//               className="form-control"
//               id="twitterUrl"
//               name="twitterUrl"
//               placeholder="https://"
//               value={socialMedia?.youtubeUrl}
//               onChange={(e) => {
//                 setSocialMedia({
//                   ...socialMedia,
//                   youtubeUrl: e.target.value,
//                 });
//               }}
//             />
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="notification-title d-flex align-items-center mb-md-4 mb-3 mt-md-5 mt-3">
//             <div className="icon d-flex align-items-center justify-content-center mr-1">
//               <i className="bx bxl-linkedin-square" />
//             </div>
//             <div className="text">
//               <h5 className="mb-0">LinkedIn</h5>
//             </div>
//           </div>
//           <div className="form-group mb-md-5 mb-3">
//             <label htmlFor="LnkUrl">LinkedIn URL</label>
//             <input
//               type="text"
//               className="form-control"
//               id="LnkUrl"
//               placeholder="https://"
//               value={socialMedia?.linkedInUrl}
//               onChange={(e) => {
//                 setSocialMedia({
//                   ...socialMedia,
//                   linkedInUrl: e.target.value,
//                 });
//               }}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="text-right mt-2 pr-5 pb-5">
//         <button className="btn btn-primary" onClick={saveHandler}>
//           Save Changes
//         </button>
//         <button
//           className="btn btn-secondary ml-4"
//           onClick={() =>
//             setSocialMedia({
//               ...socialMedia,
//               fbUrl: "",
//               instagramUrl: "",
//               youtubeUrl: "",
//               linkedInUrl: "",
//             })
//           }
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }

// export default connect(null, { callApi })(SocialMedia);
