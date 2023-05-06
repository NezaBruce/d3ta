import React, { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { callApi } from "../../../api";
import API from "../../../api/Routes";
import { useTranslation } from "react-i18next";
import moment from "moment";
import swal from "sweetalert";
import { showModalNotification } from "../../../utils/Functions";
import Loader from "../../Loader/Loader";

function EmailTemplates(props) {
  const [lang] = useTranslation("language");
  const [pagesize, setPagesize] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  const [listing, setListing] = useState();

  const history = useHistory();

  useEffect(() => {
    history.push("/global-settings/emailTemplates");
    getEmailList();
  }, [page, pagesize]);

  /********************************************************
   * To get data
   * @author INIC
   * @returns {void}
   ********************************************************/
  const getEmailList = async () => {
    setLoading(true);
    let body = {
      page,
      pagesize,
    };
    try {
      const response = await props.callApi(
        API.EMAIL_TEMP_LIST,
        body,
        "post",
        null,
        true,
        false,
      );
      if (response.status === 1) {
        setListing(response.data);
        setTotal(response.total);
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /********************************************************
   * Handle Pagination change
   * @author INIC
   * @param {number} pageNo
   * @param {number} pageSize
   * @returns {void}
   ********************************************************/
  const paginationChange = (page, pagesize) => {
    setPage(page);
    setPagesize(pagesize);
  };

  /********************************************************
   * Handle status change
   * @author INIC
   * @param {string} id Id of the row
   * @param {boolean} status new status value
   * @returns {void}
   ********************************************************/
  const statusHandler = async (status, id) => {
    const body = { status, ids: [id] };
    try {
      const response = await props.callApi(
        API.EMAIL_TEMP_STATUS,
        body,
        "post",
        null,
        true,
        false,
      );
      if (response.status === 1) {
        getEmailList();
      }
    } catch (error) {
      setLoading(false);
      showModalNotification(error.message, "error");
      throw error;
    }
  };

  /********************************************************
   * To delete a record
   * @author INIC
   * @param {string} id
   * @returns {void}
   ********************************************************/
  const deleteRecord = async (id) => {
    let data = {
      ids: [id],
    };
    swal({
      title: "Are you sure, you want to delete ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await props.callApi(
          `${API.EMAIL_TEMP_DELETE}`,
          data,
          "post",
          null,
          true,
          false,
        );
        if (response.status === 1) {
          showModalNotification(response.message);
          getEmailList();
        }
      }
    });
  };

  return (
    <>
      <div className="card tabs-block p-0">
        <div className="card-body content">
          <button
            className="btn btn-primary glow-primary pull-right mb-4"
            onClick={() => history.push("/add-new-email-template")}
          >
            Add New Email Template
          </button>
        </div>
        <div className="table-responsive">
          <table
            className="table row-border nowrap common-datatable"
            id="user-listing"
          >
            <thead>
              <tr>
                <th>
                  <b>Template Name</b>
                </th>
                <th className="text-center">
                  <b>Email Key</b>
                </th>
                <th className="text-center">
                  <b>Update on</b>
                </th>
                <th className="text-center">
                  <b>Status</b>
                </th>
                <th className="all text-center">
                  <b>Action</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(listing) && listing.length === 0) ||
              listing === undefined ? (
                <td colSpan="6">
                  {loading ? (
                    <Loader />
                  ) : (
                    <h6
                      className="text-center text-danger not-found-txt"
                      colSpan="6"
                    >
                      No Records Found!
                    </h6>
                  )}
                </td>
              ) : (
                listing &&
                Array.isArray(listing) &&
                listing.map((list) => (
                  <tr key={list.id}>
                    <td>{list?.emailTitle}</td>
                    <td className="text-center">{list?.emailKey}</td>
                    <td className="text-center">
                      {moment(list?.updatedAt).format("DD.MM.YYYY")}
                    </td>
                    <td className="text-center">
                      <div className="custom-control custom-switch light">
                        <input
                          type="checkbox"
                          id={list.id}
                          checked={list.status}
                          className="custom-control-input"
                          onChange={() => {
                            list.status = !list.status;
                            statusHandler(list.status, list.id);
                          }}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={list.id}
                        ></label>
                      </div>
                    </td>
                    {/*   <td className="text-center">
                      {list?.template.charAt(0).toUpperCase() +
                        list?.template.slice(1)}
                    </td>
                    
                    */}
                    <td className="text-center">
                      <Link
                        to={{
                          pathname: "/view-email-template",
                          state: { id: list.id },
                        }}
                      >
                        <i className="bx bx-show-alt mr-2" />
                      </Link>

                      <Link
                        to={{
                          pathname: "/edit-email-template",
                          state: { id: list?.id },
                        }}
                      >
                        <i className="bx bx-edit mr-2" />
                      </Link>

                      <span className="cursor-pointer mr-2">
                        <i
                          className="bx bx-trash"
                          onClick={() => deleteRecord(list.id)}
                        />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-2">
        <Pagination
          className="ant-pagination"
          pageSize={pagesize}
          current={page}
          total={total}
          onChange={paginationChange}
          showTitle={false}
        />
      </div>
    </>
  );
}

export default connect(null, { callApi })(EmailTemplates);
