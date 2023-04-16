import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { callApi } from "../../api";
import API from "../../api/Routes";
import ManageRoles from "./ManageRoles";
import Purchases from "./Purchases";
import { WithContext as ReactTags } from "react-tag-input";
import { FileUploader } from "react-drag-drop-files";
import { debounce, showMessageNotification } from "../../utils/Functions";
import { isEmpty } from "lodash";
import { addTags, getTagsList } from "../../store/Actions/PeerProducers";
import ErrorMessages from "../../utils/ErrorMessages";
import styles from "../../scss/Component/ReactTags.module.scss";

function BasicDetails({ id, isEdit }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const [purchase, setPurchase] = useState(false);
  const [manageRoles, setManageRoles] = useState(false);
  const [dataList, setDataList] = useState("");
  const [tags, setTags] = useState();
  const [tagsSearch, setTagsSearch] = useState("");
  const [logo, setLogo] = useState("");
  const [logoLoader, setLogoLoader] = useState(false);
  const [cover, setCover] = useState("");
  const [branch, setBranch] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [coverLoader, setCoverLoader] = useState(false);
  let [errors, setErrors] = useState("");
  const [sectorList, setSectorList] = useState([]);

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

  const userPermissions = useSelector((state) => state.admin.userPermissions);

  const { suggestions, followers, courseTotal } = useSelector(
    ({ peerProducers }) => peerProducers
  );

  /******************** 
@purpose : Used for organization Options
@Parameter : {  }
@Author : INIC
******************/
  const organizationOptions = [
    { value: "Learning Institute", label: "Learning Institute" },
    { value: "University", label: "University" },
  ];

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  useEffect(() => {
    getLearningInstituteDetails();
    if (isEdit) {
      getRoleList();
      getSectorList();
    }
  }, []);

  useEffect(() => {
    if (tagsSearch !== "") {
      getTags();
    }
  }, [tagsSearch]);

  useEffect(() => {
    if (tags !== undefined) {
      let arrTags = [];
      tags.map((tag) => {
        arrTags.push(tag.id);
      });
      setDataList({ ...dataList, tags: arrTags });
    }
  }, [tags]);

  /*******************
   @Purpose : get Learning Institute details
   @Parameter : {}
   @Author : INIC
   ******************/
  const getLearningInstituteDetails = async () => {
    try {
      const response = await Promise.resolve(
        dispatch(
          callApi(
            API.GET_LEARNING_INSTITUTE_DETAILS + id,
            {},
            "get",
            null,
            true,
            false
          )
        )
      );
      if (response.status === 1) {
        setDataList(response?.data);
        setLogo(response?.data?.logo);
        setCover(response?.data?.cover);
        setBranch([...response?.data?.branchesData]);
        let arr = [];
        response.data.tags.map((tag) => {
          arr.push({ id: tag, text: tag });
        });
        setTags(arr);
      }
    } catch (err) {
      throw err;
    }
  };

  /*******************
   @Purpose : get role list
   @Parameter : {}
   @Author : INIC
   ******************/
  const getRoleList = async () => {
    try {
      const response = await Promise.resolve(
        dispatch(callApi(API.GET_ROLE_LIST, {}, "get", null, true, false))
      );
      if (response.status === 1) {
        let role = [];
        response.data.map((ele) => {
          role.push({ value: ele.title, label: ele.title });
        });
        setRoleList(role);
      }
    } catch (err) {
      throw err;
    }
  };

  /*******************
   @Purpose : get Sector list
   @Parameter : {}
   @Author : INIC
   ******************/
  const getSectorList = async () => {
    let body = {
      industry: "Education",
    };
    try {
      const response = await Promise.resolve(
        dispatch(callApi(API.GET_SECTOR_LIST, body, "post", null, true, false))
      );
      if (response.status === 1) {
        let sector = [];
        response.data.map((ele) => {
          sector.push({ value: ele.sector, label: ele.sector });
        });
        setSectorList(sector);
      }
    } catch (err) {}
  };

  /******************* 
  @Purpose : Used for file upload 
  @Parameter : {}
  @Author : INIC
  ******************/
  const onImageChange = async (file, type) => {
    const imageData = new FormData();
    imageData.append("file", file);
    try {
      type === "logo" ? setLogoLoader(true) : setCoverLoader(true);
      const response = await Promise.resolve(
        dispatch(callApi(API.FILE_UPLOAD, imageData, "post", null, true, true))
      );
      if (response.status === 1) {
        if (type === "logo") {
          setLogo(response.data.fileUrl);
          setLogoLoader(false);
        } else {
          setCover(response.data.fileUrl);
          setCoverLoader(false);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  /******************** 
@purpose : Used for new tag add
@Parameter : {  }
@Author : INIC
******************/
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  /******************** 
@purpose : Used for tag drag
@Parameter : {  }
@Author : INIC
******************/
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  /******************** 
@purpose : Used for tag remove
@Parameter : {  }
@Author : INIC
******************/
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  /******************** 
    @purpose : Used for tags
    @Parameter : 
    @Author : INIC
    ******************/
  const searchTags = useCallback(
    debounce((value) => {
      setTagsSearch(value);
    }, 500)
  );

  /******************* 
  @Purpose : Used for get tags
  @Parameter : {}
  @Author : INIC
  ******************/
  const getTags = () => {
    let body = {
      searchText: tagsSearch,
    };
    dispatch(getTagsList(body));
  };

  /******************* 
  @Purpose : Used for validation
  @Parameter : {}
  @Author : INIC
  ******************/
  const validation = () => {
    errors = {
      name: "",
      orgType: "",
      sector: "",
      roleInInstitute: "",
      instituteEmail: "",
      instituteContact: "",
      foundedOn: "",
      instituteURL: "",
      vatNo: "",
      pec: "",
      cu: "",
      tags: "",
      headquarter: "",
      branchesData: "",
      logo: "",
      cover: "",
      slogan: "",
      overview: "",
    };

    var mailFormat =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^\d{10}$)+$/;

    if (isEmpty(dataList.name.trim())) errors.name = ErrorMessages.REQUIRED;
    else errors.name = "";

    if (isEmpty(dataList.orgType)) errors.orgType = ErrorMessages.REQUIRED;
    else errors.orgType = "";

    if (isEmpty(dataList.sector)) errors.sector = ErrorMessages.REQUIRED;
    else errors.sector = "";

    if (isEmpty(dataList.roleInInstitute))
      errors.roleInInstitute = ErrorMessages.REQUIRED;
    else errors.roleInInstitute = "";

    if (!dataList.instituteEmail)
      errors.instituteEmail = ErrorMessages.REQUIRED;
    else if (!mailFormat.test(dataList.instituteEmail))
      errors.instituteEmail = ErrorMessages.REQUIRED;
    else errors.instituteEmail = "";

    if (!dataList.instituteContact.trim())
      errors.instituteContact = ErrorMessages.REQUIRED;
    else if (dataList.instituteContact <= 0)
      errors.instituteContact = ErrorMessages.PROVIDE_VALID_NUMBER;
    else errors.instituteContact = "";

    if (!dataList.foundedOn.trim()) errors.foundedOn = ErrorMessages.REQUIRED;
    else errors.foundedOn = "";

    if (!dataList.instituteURL.trim())
      errors.instituteURL = ErrorMessages.REQUIRED;
    else errors.instituteURL = "";

    if (!dataList.vatNo.trim()) errors.vatNo = ErrorMessages.REQUIRED;
    else errors.vatNo = "";

    if (!dataList.pec.trim()) errors.pec = ErrorMessages.REQUIRED;
    else errors.pec = "";

    if (!dataList.cu.trim()) errors.cu = ErrorMessages.REQUIRED;
    else errors.cu = "";

    if (dataList.tags.length === 0) errors.tags = ErrorMessages.REQUIRED;
    else if (dataList.tags.length > 3) errors.tags = ErrorMessages.MAXIMUM_TAGS;
    else errors.tags = "";

    if (branch) {
      branch.forEach((ele) => {
        if (isEmpty(ele.otherBranchAddress.trim())) {
          errors.branchesData = ErrorMessages.REQUIRED;
        }
      });
    } else errors.branchesData = "";

    if (!dataList.headquarter.trim())
      errors.headquarter = ErrorMessages.REQUIRED;
    else errors.headquarter = "";

    if (!dataList.logo) errors.logo = ErrorMessages.REQUIRED;
    else errors.logo = "";

    if (!dataList.cover) errors.cover = ErrorMessages.REQUIRED;
    else errors.cover = "";

    if (!dataList.slogan.trim()) errors.slogan = ErrorMessages.REQUIRED;
    else errors.slogan = "";

    if (!dataList.overview.trim()) errors.overview = ErrorMessages.REQUIRED;
    else errors.overview = "";

    if (
      errors.name !== "" ||
      errors.orgType !== "" ||
      errors.sector !== "" ||
      errors.roleInInstitute !== "" ||
      errors.instituteEmail !== "" ||
      errors.instituteContact !== "" ||
      errors.foundedOn !== "" ||
      errors.instituteURL !== "" ||
      errors.vatNo !== "" ||
      errors.pec !== "" ||
      errors.cu !== "" ||
      errors.tags !== "" ||
      errors.headquarter !== "" ||
      errors.logo !== "" ||
      errors.cover !== "" ||
      errors.slogan !== "" ||
      errors.overview !== "" ||
      errors.branchesData !== ""
    ) {
      setErrors(errors);
      return false;
    } else {
      setErrors(errors);
      return true;
    }
  };

  /******************* 
  @Purpose : Used for update
  @Parameter : {}
  @Author : INIC
  ******************/
  const updateHandler = async () => {
    let body = {
      ...dataList,
      logo: logo,
      cover: cover,
      branchesData: branch,
    };
    let dataTags = {
      title: dataList.tags,
    };
    if (validation()) {
      try {
        const response = await Promise.resolve(
          dispatch(
            callApi(
              API.UPDATE_LEARNING_INSTITUTE_DETAILS,
              body,
              "post",
              null,
              true,
              false
            )
          )
        );
        if (response.status === 1) {
          history.push("/peer-producers/learning-institute");
          dispatch(addTags(dataTags));
          showMessageNotification(response.message);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  /******************* 
  @Purpose : Used for delete branch
  @Parameter : {}
  @Author : INIC
  ******************/
  const deleteBranch = (index) => {
    const branchData = [...branch];
    branchData.splice(index, 1);
    setBranch(branchData);
    setErrors({ ...errors, branchesData: "" });
  };

  /******************* 
  @Purpose : Used for handle Change
  @Parameter : {}
  @Author : INIC
  ******************/
  const handleChange = (index, event) => {
    const branchData = [...branch];
    const { name, value } = event.target;
    branchData[index][name] = value;
    setBranch(branchData);
  };

  return (
    <>
      {isEdit === false && (
        <>
          <div className="content-area position-relative">
            <div className="grid">
              <div className="grid-content">
                <div className="user-listing-filterOptions mb-2 d-block">
                  <div className="row mb-2">
                    <div className="col-sm-8 position-static">
                      <div className="left-buttons">
                        <div className="form-group">
                          <h5 className="pl-3 font-weight-semibold">
                            {`${followers?.total} Followers, ${
                              dataList?.employeeCount || 0
                            } Employees, ${courseTotal} Courses`}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="right-buttons d-flex justify-content-end">
                        <div>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setPurchase(true)}
                          >
                            Purchases
                          </button>
                        </div>
                        <div>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setManageRoles(true)}
                          >
                            Manage Roles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </>
      )}

      <Card.Body className="custom-sizes p-0">
        <Form>
          <h5 className="pl-3 font-weight-semibold">Company Information</h5>
          <div className="border p-5 rounded mb-5 bg-white">
            <Row>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Business/Institute Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.name}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        name: e.target.value,
                      });
                      setErrors({ ...errors, name: "" });
                    }}
                  />
                  <span className="text-danger d-block">{errors.name}</span>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineSkill">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Choose your Organization Type
                  </Form.Label>
                  <div className="custom-selectpicker details-custom-input">
                    {dataList?.orgType && (
                      <Select
                        value={{
                          label:
                            dataList?.orgType.charAt(0).toUpperCase() +
                            dataList?.orgType.slice(1),
                          value: dataList?.orgType,
                        }}
                        isDisabled={isEdit ? false : true}
                        options={organizationOptions}
                        onChange={(opt) => {
                          setDataList({
                            ...dataList,
                            orgType: opt.value,
                          });
                          setErrors({ ...errors, orgType: "" });
                        }}
                      />
                    )}
                  </div>
                  <span className="text-danger d-block">{errors.orgType}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineSkill">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Choose Sector
                  </Form.Label>
                  <div className="custom-selectpicker details-custom-input">
                    {dataList?.sector && (
                      <Select
                        value={{
                          label:
                            dataList?.sector.charAt(0).toUpperCase() +
                            dataList?.sector.slice(1),
                          value: dataList?.sector,
                        }}
                        isDisabled={isEdit ? false : true}
                        options={sectorList}
                        onChange={(opt) => {
                          setDataList({
                            ...dataList,
                            sector: opt.value,
                          });
                          setErrors({ ...errors, sector: "" });
                        }}
                      />
                    )}
                  </div>
                  <span className="text-danger d-block">{errors.sector}</span>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineSkill">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Your Role in the institute
                  </Form.Label>
                  <div className="custom-selectpicker details-custom-input">
                    {dataList?.roleInInstitute && (
                      <Select
                        value={{
                          label:
                            dataList?.roleInInstitute.charAt(0).toUpperCase() +
                            dataList?.roleInInstitute.slice(1),
                          value: dataList?.roleInInstitute,
                        }}
                        isDisabled={isEdit ? false : true}
                        options={roleList}
                        onChange={(opt) => {
                          setDataList({
                            ...dataList,
                            roleInInstitute: opt.value,
                          });
                          setErrors({ ...errors, roleInInstitute: "" });
                        }}
                      />
                    )}
                  </div>
                  <span className="text-danger d-block">
                    {errors.roleInInstitute}
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Your Institute email Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.instituteEmail}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        instituteEmail: e.target.value,
                      });
                      setErrors({ ...errors, instituteEmail: "" });
                    }}
                  />
                  <span className="text-danger d-block">
                    {errors.instituteEmail}
                  </span>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Institute Contact No.
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={dataList?.instituteContact}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        instituteContact: e.target.value,
                      });
                      setErrors({ ...errors, instituteContact: "" });
                    }}
                  />
                  <span className="text-danger d-block">
                    {errors.instituteContact}
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Founded on
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.foundedOn}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        foundedOn: e.target.value,
                      });
                      setErrors({ ...errors, foundedOn: "" });
                    }}
                  />
                  <span className="text-danger d-block">
                    {errors.foundedOn}
                  </span>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    The Institute URL
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.instituteURL}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        instituteURL: e.target.value,
                      });
                      setErrors({ ...errors, instituteURL: "" });
                    }}
                  />
                  <span className="text-danger d-block">
                    {errors.instituteURL}
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Fiscal Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Fiscal Number"
                    value={dataList?.fiscalNumber}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        fiscalNumber: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    VAT No.
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.vatNo}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        vatNo: e.target.value,
                      });
                      setErrors({ ...errors, vatNo: "" });
                    }}
                  />
                  <span className="text-danger d-block">{errors.vatNo}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    IBAN
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter IBAN"
                    value={dataList?.iban}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        iban: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    BIC/SWIFT Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter BIC/SWIFT Number"
                    value={dataList?.bicSwiftNumber}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        bicSwiftNumber: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    PEC
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.pec}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        pec: e.target.value,
                      });
                      setErrors({ ...errors, pec: "" });
                    }}
                  />
                  <span className="text-danger d-block">{errors.pec}</span>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    CU
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.cu}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        cu: e.target.value,
                      });
                      setErrors({ ...errors, cu: "" });
                    }}
                  />
                  <span className="text-danger d-block">{errors.cu}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Tags (Max. 3)
                  </Form.Label>
                  <div
                    className={
                      isEdit
                        ? "custom-selectpicker-multi custom-input-inside"
                        : styles.ReactTags
                    }
                  >
                    <ReactTags
                      tags={tags}
                      suggestions={suggestions}
                      delimiters={delimiters}
                      handleAddition={handleAddition}
                      handleDelete={handleDelete}
                      handleDrag={handleDrag}
                      handleInputChange={searchTags}
                      minQueryLength={1}
                      inputFieldPosition="top"
                      autocomplete
                      readOnly={isEdit ? false : true}
                    />
                  </div>
                  <span className="text-danger d-block">{errors.tags}</span>
                </Form.Group>
              </Col>
            </Row>
          </div>
          <h5 className="pl-3 font-weight-semibold">Add Branches</h5>
          <div className="border p-5 rounded mb-5 bg-white">
            <Row>
              <Col sm={12}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Headquarter Address:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.headquarter}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        headquarter: e.target.value,
                      });
                      setErrors({ ...errors, headquarter: "" });
                    }}
                  />
                  <span className="text-danger d-block">
                    {errors.headquarter}
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium mb-0 text-capitalize">
                    Other Branch Address:
                  </Form.Label>
                </Form.Group>
              </Col>
              {Array.isArray(branch) &&
                branch.map((ele, index) => (
                  <>
                    <Col sm={8}>
                      <Form.Group controlId="uploadOfflineTitle">
                        <Form.Control
                          type="text"
                          value={ele?.otherBranchAddress}
                          name="otherBranchAddress"
                          disabled={isEdit ? false : true}
                          onChange={(event) => {
                            handleChange(index, event);
                            setErrors({ ...errors, branchesData: "" });
                          }}
                        />
                      </Form.Group>
                    </Col>
                    {branch.length > 1 && isEdit && (
                      <div className="d-flex justify-content-end align-items-center pt-4 text-danger cursor-pointer ml-1 ">
                        <span onClick={() => deleteBranch(index)}>
                          <i className="bx bx-x"></i>
                        </span>
                      </div>
                    )}
                  </>
                ))}
            </Row>
            <span className="text-danger d-block">{errors.branchesData}</span>
            {isEdit && (
              <Row>
                <Col sm={12}>
                  <Button
                    type="button"
                    variant="outline-info text-uppercase"
                    onClick={() =>
                      setBranch([...branch, { otherBranchAddress: "" }])
                    }
                    disabled={isEdit ? false : true}
                  >
                    Add Branches
                  </Button>
                </Col>
              </Row>
            )}
          </div>
          <h5 className="pl-3 font-weight-semibold">Institute Page Details</h5>
          <div className="border p-5 rounded mb-5 bg-white">
            <Row>
              <Col xl={6} lg={8}>
                <Form.Group>
                  <Form.Label className="text-charcoal-grey font-medium text-capitalize">
                    Upload Logo
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  controlId="uploadOfflineImg"
                  className="upload-here-files h-100"
                >
                  <FileUploader
                    handleChange={(file) => {
                      onImageChange(file, "logo");
                      setErrors({ ...errors, logo: "" });
                    }}
                    children={
                      <div className="dropzone-wrap text-center pointer">
                        <em className="icon icon-upload-cloud"></em>
                        <p className="m-0 font-16 font-medium">
                          Browse From Your System or Just Drag &amp; Drop Here..
                        </p>
                      </div>
                    }
                    name="file"
                    types={fileTypes}
                    disabled={isEdit ? false : true}
                  />
                  <span className="text-danger d-block">{errors.logo}</span>
                </Form.Group>
              </Col>
              <Col xl={6} lg={4}>
                <div className="form-group">
                  <label
                    htmlFor="preview"
                    className=" ml-10 mb-0 font-medium text-capitalize"
                  >
                    Preview
                  </label>
                </div>
                {logoLoader ? (
                  <div className="text-center mt-4 mb-3">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <img
                    src={logo}
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                    onError={(e) => {
                      e.target.src = "/assets/images/error.jpg";
                      e.target.alt = "failed to load image";
                      e.onerror = null;
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row className="my-4">
              <Col xl={6} lg={8}>
                <Form.Group>
                  <Form.Label className="text-charcoal-grey font-medium text-capitalize">
                    Cover Image
                  </Form.Label>
                </Form.Group>
                <Form.Group
                  controlId="uploadOfflineImg"
                  className="upload-here-files h-100"
                >
                  <FileUploader
                    handleChange={(file) => {
                      onImageChange(file, "cover");
                      setErrors({ ...errors, cover: "" });
                    }}
                    children={
                      <div className="dropzone-wrap text-center pointer">
                        <em className="icon icon-upload-cloud"></em>
                        <p className="m-0 font-16 font-medium">
                          Browse From Your System or Just Drag &amp; Drop Here..
                        </p>
                      </div>
                    }
                    name="file"
                    types={fileTypes}
                    disabled={isEdit ? false : true}
                  />
                  <span className="text-danger d-block">{errors.cover}</span>
                </Form.Group>
              </Col>
              <Col xl={6} lg={4}>
                <div className="form-group">
                  <label
                    htmlFor="preview"
                    className=" ml-10 mb-0 font-medium text-capitalize"
                  >
                    Preview
                  </label>
                </div>
                {coverLoader ? (
                  <div className="text-center mt-4 mb-3">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <img
                    src={cover}
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                    onError={(e) => {
                      e.target.src = "/assets/images/error.jpg";
                      e.target.alt = "failed to load image";
                      e.onerror = null;
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Slogan
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.slogan}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        slogan: e.target.value,
                      });
                      setErrors({ ...errors, slogan: "" });
                    }}
                  />
                  <span className="text-danger d-block">{errors.slogan}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Form.Group controlId="uploadOfflineTitle">
                  <Form.Label className="text-charcoal-grey font-medium pb-2 text-capitalize">
                    Overview
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={dataList?.overview}
                    disabled={isEdit ? false : true}
                    onChange={(e) => {
                      setDataList({
                        ...dataList,
                        overview: e.target.value,
                      });
                      setErrors({ ...errors, overview: "" });
                    }}
                  />
                  <span className="text-danger d-block">{errors.overview}</span>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {userPermissions &&
            userPermissions.includes("peer_producers_edit") &&
            isEdit && (
              <div className="text-center mt-4 mb-3">
                <Button
                  variant="info px-4 text-uppercase btn-xxl mx-sm-2 mb-2 w-sm-100"
                  onClick={updateHandler}
                  disabled={
                    logoLoader || coverLoader ? true : isEdit ? false : true
                  }
                >
                  Update
                </Button>

                <Button
                  variant="outline-info px-4 text-uppercase btn-xxl mx-sm-2 mb-2 w-sm-100"
                  onClick={() => {
                    history.push("/peer-producers/learning-institute");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
        </Form>
      </Card.Body>
      <Purchases
        purchase={purchase}
        setPurchase={setPurchase}
        instituteId={id}
      />
      <ManageRoles
        manageRoles={manageRoles}
        setManageRoles={setManageRoles}
        instituteId={id}
      />
    </>
  );
}

export default BasicDetails;
