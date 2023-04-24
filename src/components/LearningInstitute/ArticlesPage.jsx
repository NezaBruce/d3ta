// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { callApi } from "../../api";
// import API from "../../api/Routes";
// import { Spinner } from "react-bootstrap";
// import ReportPost from "../Complaint/ReportPost";
// import Pagination from "rc-pagination";

// function ArticlesPage({ instituteId, accordion }) {
//   const dispatch = useDispatch();
//   const [listing, setListing] = useState([]);
//   const [pagesize, setPageSize] = useState(3);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(1);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (accordion === "1") getArticlesList();
//   }, [page, pagesize, accordion]);

//   /******************* 
//   @Purpose : Used for post List
//   @Parameter : {}
//   @Author : INIC
//   ******************/
//   const getArticlesList = async () => {
//     let body = {
//       page,
//       pagesize,
//       instituteId,
//       postType: "article",
//       groupId: "",
//     };
//     try {
//       setLoading(true);
//       const response = await Promise.resolve(
//         dispatch(
//           callApi(
//             API.GET_LEARNING_INSTITUTE_POST_LIST,
//             body,
//             "post",
//             null,
//             true,
//             false,
//           )
//         )
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
//     <>
//       {loading ? (
//         <div className="text-center mt-4 mb-3">
//           <Spinner animation="border" variant="primary" />
//         </div>
//       ) : listing === undefined ||
//         (Array.isArray(listing) && listing.length === 0) ? (
//         <h5 className="text-danger">No Data Found</h5>
//       ) : (
//         Array.isArray(listing) &&
//         listing.map((list) => (
//           <ReportPost
//             key={list.id}
//             postData={list}
//             type="institute"
//             dataListing={getArticlesList}
//           />
//         ))
//       )}
//       <div className="pagination-list mt-2 d-flex justify-content-end">
//         <Pagination
//           className="ant-pagination"
//           pageSize={pagesize}
//           current={page}
//           total={total}
//           onChange={paginationChange}
//           showTitle={false}
//         />
//       </div>
//     </>
//   );
// }

// export default ArticlesPage;
