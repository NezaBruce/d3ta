import React from "react";
import { useSelector } from "react-redux";
import CoursesList from "../../Teachers/CoursesList";

function CourseTab({ instituteId, accordion }) {
  const userPermissions = useSelector((state) => state.admin.userPermissions);
  return (
    <>
      <CoursesList
        instituteId={instituteId}
        userPermissions={userPermissions}
        type="institute"
        accordion={accordion}
      />
    </>
  );
}

export default CourseTab;
