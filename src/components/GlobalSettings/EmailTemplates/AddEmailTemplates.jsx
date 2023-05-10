import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import Select from 'react-select';
import RichTextComponent from '../../Editor/CKEditor';
import { connect } from 'react-redux';
import { callApi } from '../../../api';
import API from '../../../api/Routes';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { showMessageNotification } from '../../../utils/Functions';
import { Form } from 'antd';

function AddEmailTemplates(props) {
  let history = useHistory();

  const [lang] = useTranslation('language');

  const [tempalteName, setTempalteName] = useState('');
  const [richText, setRichText] = useState('');
  const [emailKey, setEmailKey] = useState('');
  const [subject, setSubject] = useState('');
  let [errors, setErrors] = useState({});
  const [language, setLanguage] = useState({ value: 'en', label: 'English' });

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'it', label: 'Italian' },
  ];
  /******************* 
  @Purpose : Used for validation
  @Parameter : {}
  @Author : INIC
  ******************/
  const validation = () => {
    if (isEmpty(tempalteName)) {
      setErrors((prevState) => ({
        ...prevState,
        tempalteName: 'Please enter template name',
      }));
    }
    if (isEmpty(emailKey)) {
      setErrors((prevState) => ({
        ...prevState,
        emailKey: 'Please enter email key',
      }));
    }
    if (isEmpty(subject)) {
      setErrors((prevState) => ({
        ...prevState,
        subject: 'Please enter subject',
      }));
    }
    if (isEmpty(richText)) {
      setErrors((prevState) => ({
        ...prevState,
        richText: 'Please enter email content',
      }));
    }
    if (isEmpty(language)) {
      setErrors((prevState) => ({
        ...prevState,
        language: 'Please select a language',
      }));
    }

    if (
      !isEmpty(tempalteName) &&
      !isEmpty(richText) &&
      !isEmpty(subject) &&
      !isEmpty(emailKey) &&
      !isEmpty(language) 
    ) {
      return true;
    }
  };

  /******************* 
  @Purpose : Used for submit handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const addHandler = async () => {
    if (validation()) {
      let body = {
        emailTitle: tempalteName,
        subject: subject,
        emailKey: emailKey,
        emailContent: richText,
        language: language.value
      };

      try {
        const response = await props.callApi(
          API.ADD_UPDATE_EMAIL,
          body,
          'post',
          null,
          true,
          false,
        );
        if (response.status === 1) {
          history.push('/global-settings/emailTemplates');
          showMessageNotification(response.message);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <Layout>
      <div className='main-content-area'>
        <div className='main-content-block'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='content-header-title'>Settings</li>
              <li className='breadcrumb-item'>
                <Link to={'/dashboard'}>
                  <span>
                    <i className='bx bx-home-alt'></i>
                  </span>
                </Link>
              </li>
              <li className='breadcrumb-item active'>
                <Link to={'/global-settings/emailTemplates'}>
                  <span>Settings</span>
                </Link>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                <span>Add New Email Templates</span>
              </li>
            </ol>
          </nav>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label>Tempalte Name</label>
              <input
                className='form-control'
                type='text'
                onChange={(e) => {
                  setTempalteName(e.target.value);
                  errors = Object.assign(errors, {
                    tempalteName: '',
                  });
                  setErrors(errors);
                }}
              />
              <span className='error-msg' style={{ color: 'red' }}>
                {errors.tempalteName}
              </span>
            </div>
            <div className='form-group col-md-6'>
              <label>Email key</label>
              <input
                className='form-control'
                value={emailKey}
                onChange={(e) => {
                  setEmailKey(e.target.value);
                  errors = Object.assign(errors, {
                    emailKey: '',
                  });
                  setErrors(errors);
                }}
              />
              <span className='error-msg' style={{ color: 'red' }}>
                {errors.emailKey}
              </span>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label>Subject</label>
              <input
                className='form-control'
                type='text'
                onChange={(e) => {
                  setSubject(e.target.value);
                  errors = Object.assign(errors, {
                    subject: '',
                  });
                  setErrors(errors);
                }}
              />
              <span className='error-msg' style={{ color: 'red' }}>
                {errors.subject}
              </span>
            </div>
          <div className='col-md-6'>
            <Form layout={`vertical`}>
              <Form.Item label='Select Language'>
                <Select
                  options={languageOptions}
                  value={language}
                  className='d-block custom-input'
                  onChange={(opt) => {
                    setLanguage(opt);
                    errors = Object.assign(errors, {
                      language: '',
                    });
                    setErrors(errors);
                  }}
                />
                <span className='error-msg' style={{ color: 'red' }}>
                  {errors.language}
                </span>
              </Form.Item>
            </Form>
          </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-7'>
              <label>Email Content</label>
              <RichTextComponent
                onChange={(value) => {
                  setRichText(value);
                  errors = Object.assign(errors, {
                    richText: '',
                  });
                  setErrors(errors);
                }}
              />
              <span className='error-msg' style={{ color: 'red' }}>
                {errors.richText}
              </span>
            </div>
          </div>
          <div className='text-right mt-2 pr-5 pb-5'>
            <button className='btn btn-primary' onClick={() => addHandler()}>
              {lang('ButtonText.Add')}
            </button>
            <button
              className='btn btn-secondary ml-4'
              onClick={() => history.push('/global-settings/emailTemplates')}
            >
              {lang('ButtonText.Cancel')}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default connect(null, { callApi })(AddEmailTemplates);
