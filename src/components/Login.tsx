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
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
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
    <div className="authCard">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
        <Form>
          <div className="group">
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" className="form-control" />
            <ErrorMessage name="username" component="div" className="alert-danger" />
          </div>
          <div className="group">
            <label htmlFor="password">Password</label>

            <Field name="password" type="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="alert alert-danger" />
          </div>

          <div className="group">
            <button type="submit" className="btn-login" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="alert-danger" role="alert">
              {message}
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
