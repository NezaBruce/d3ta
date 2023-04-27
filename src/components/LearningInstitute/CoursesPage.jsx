// import React, { useState } from "react";
// import { Tab, Tabs } from "react-bootstrap";
// import CourseTab from "./Tabs/CourseTab";
// import FacultyTab from "./Tabs/FacultyTab";
// import MasterClassTab from "./Tabs/MasterClassTab";
// import TraingRoomTab from "./Tabs/TraingRoomTab";
// import WebinarTab from "./Tabs/WebinarTab";

// function CoursesPage({ instituteId, userId, accordion, type }) {
//   const [key, setKey] = useState("courses");

//   return (
//     <Tabs
//       variant="pills"
//       id="uncontrolled-tab-example"
//       activeKey={key}
//       onSelect={(k) => setKey(k)}
//       className="mb-3 row pl-3"
//       mountOnEnter={`true`}
//       unmountOnExit={`true`}
//     >
//       <Tab
//         tabClassName="col-md-2 text-center"
//         eventKey="courses"
//         title="Courses"
//       >
//         <CourseTab instituteId={instituteId} accordion={accordion} />
//       </Tab>
//       {type === "University" && (
//         <Tab
//           tabClassName="col-md-2 text-center"
//           eventKey="faculty"
//           title="Faculties"
//         >
//           <FacultyTab instituteId={instituteId} />
//         </Tab>
//       )}

//       <Tab
//         tabClassName="col-md-2 text-center"
//         eventKey="room"
//         title="Training Room"
//       >
//         <TraingRoomTab instituteId={instituteId} accordion={accordion} />
//       </Tab>
//       <Tab
//         tabClassName="col-md-2 text-center"
//         eventKey="webinar"
//         title="Webinar"
//       >
//         <WebinarTab instituteId={instituteId} accordion={accordion} />
//       </Tab>
//       <Tab
//         tabClassName="col-md-2 text-center"
//         eventKey="masterclass"
//         title="Master Class"
//       >
//         <MasterClassTab instituteId={instituteId} accordion={accordion} />
//       </Tab>
//     </Tabs>
//   );
// }

// export default CoursesPage;
