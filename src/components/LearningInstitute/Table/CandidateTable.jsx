// import React from "react";
// import { Table } from "react-bootstrap";

// function CandidateTable({ listing }) {
//   return (
//     <Table
//       className="custom-table vertical-center-table font-14 mt-2"
//       responsive="lg mb-3"
//     >
//       <thead>
//         <tr>
//           <th>Skill Area</th>
//           <th>Skill Type</th>
//           <th>Education</th>
//           <th>Certificate</th>
//           <th>Experience</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Array.isArray(listing) && listing.length === 0 ? (
//           <tr className="text-center text-danger not-found-txt">
//             <td colSpan="6">
//               <h6 className="text-center text-danger not-found-txt" colSpan="6">
//                 No Records Found!
//               </h6>
//             </td>
//           </tr>
//         ) : (
//           Array.isArray(listing) &&
//           listing.map((list, index) => (
//             <tr key={index}>
//               <td>{list.skillArea}</td>
//               <td>{list.skillType?.value}</td>
//               <td>
//                 {list?.education === 1 ? (
//                   <i className="bx bxs-check-circle font-24 text-success"></i>
//                 ) : (
//                   <i
//                     className="bx bxs-x-circle font-24"
//                     style={{ color: "#FF6B6C" }}
//                   ></i>
//                 )}
//               </td>
//               <td>
//                 {list?.certificate === 1 ? (
//                   <i className="bx bxs-check-circle font-24 text-success"></i>
//                 ) : (
//                   <i
//                     className="bx bxs-x-circle font-24"
//                     style={{ color: "#FF6B6C" }}
//                   ></i>
//                 )}
//               </td>
//               <td>
//                 {list?.experience === 1 ? (
//                   <i className="bx bxs-check-circle font-24 text-success"></i>
//                 ) : (
//                   <i
//                     className="bx bxs-x-circle font-24"
//                     style={{ color: "#FF6B6C" }}
//                   ></i>
//                 )}
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </Table>
//   );
// }

// export default CandidateTable;
