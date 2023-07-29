import clsx from "clsx";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string().trim().required("Username is required"),
  password: Yup.string().trim().required("Password is required"),
});

const initialValues: LoginCredentials = {
  username: "",
  password: "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      login(values.username, values.password)
        .then((response) => {
          setStatus(false);
          localStorage.setItem("admss-admin-user", JSON.stringify(response));
          navigate("/dashboard");
        })
        .catch((err) => {
          setStatus(err.response.data.error);
        })
        .finally(() => {
          setSubmitting(false);
          setLoading(false);
        });
    },
  });
  return (
    <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
      <div className="d-flex flex-center flex-column flex-lg-row-fluid">
        <div className="w-lg-500px p-10">
          <form
            className="form w-100"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="text-center mb-11">
              <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
            </div>

            {formik.status && (
              <div className="mb-lg-15 alert alert-danger">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}

            <div className="fv-row mb-8">
              <label className="form-label fs-6 fw-bolder text-dark">
                Username
              </label>
              <input
                placeholder="Username"
                {...formik.getFieldProps("username")}
                className={clsx(
                  "form-control bg-transparent",
                  {
                    "is-invalid":
                      formik.touched.username && formik.errors.username,
                  },
                  {
                    "is-valid":
                      formik.touched.username && !formik.errors.username,
                  }
                )}
                type="text"
                name="username"
                autoComplete="off"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.username}</span>
                </div>
              )}
            </div>

            <div className="fv-row mb-8">
              <label className="form-label fw-bolder text-dark fs-6 mb-0">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                {...formik.getFieldProps("password")}
                className={clsx(
                  "form-control bg-transparent",
                  {
                    "is-invalid":
                      formik.touched.password && formik.errors.password,
                  },
                  {
                    "is-valid":
                      formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.password}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting || !formik.isValid || loading}
              >
                {!loading && <span className="indicator-label">Continue</span>}
                {loading && (
                  <span className="indicator-progress d-block">
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
