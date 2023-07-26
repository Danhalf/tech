import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './styles/login.css';

import { login } from '../services/auth.service';

type Props = { onLogin: () => void };

const Login: React.FC<Props> = ({ onLogin }) => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().trim().required('This field is required!'),
    password: Yup.string().trim().required('This field is required!'),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage('');
    setLoading(true);
    const prms = login(username, password);
    prms.then(
      (response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        navigate('/');
        onLogin();
        return response.data;
      },
      (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="d-flex flex-column-fluid justify-content-center align-items-center mt-30 mt-lg-0 min-vh-100 bg-white">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
        {({ errors, touched, getFieldProps }) => (
          <Form className="form w-25">
            <div className="text-center mb-11">
              <h3 className="text-dark fw-bolder mb-3">Sign In</h3>
            </div>
            <div className="form-group fv-plugins-icon-container">
              <label className="form-label fs-6 font-weight-bold text-dark mb-0">Username</label>
              <input
                {...getFieldProps('username')}
                placeholder="Username"
                type="text"
                className={`form-control bg-transparent w-100 ${
                  touched.username && errors.username ? 'is-invalid' : touched.username ? 'is-valid' : ''
                }`}
              />
              <ErrorMessage name="username" component="div" className="text-sm fv-plugins-message-container" />
            </div>
            <div className="fv-row mb-3">
              <label className="form-label font-weight-bold text-dark fs-6 mb-0">Password</label>

              <input
                {...getFieldProps('password')}
                placeholder="Password"
                type="password"
                className={`form-control bg-transparent w-100 ${
                  touched.password && errors.password ? 'is-invalid' : touched.password ? 'is-valid' : ''
                }`}
              />
              <ErrorMessage name="password" component="div" className="text-sm fv-plugins-message-container" />
            </div>

            <div className="d-grid mb-10">
              <button type="submit" className="btn btn-primary font-weight-bold px-9 py-2 my-3 w-25 w-100" disabled={loading}>
                {!loading && <span className="indicator-label">Login</span>}
                {loading && (
                  <span className="indicator-progress" style={{ display: 'block' }}>
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>

            {message && (
              <div className="alert-danger" role="alert">
                {message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
