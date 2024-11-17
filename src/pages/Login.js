import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { username: process.env.REACT_APP_USERNAME, password: process.env.REACT_APP_PASSWORD },
  });

  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosClient.post("/auth/login-admin", { ...data, isAdmin: true });
      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        navigate("/");
      }
    } catch (errs) {
      if (errs.response && errs.response.status === 422) {
        if (errs.response.data.errors) {
          errs.response.data.errors.forEach((err) => {
            setError(err.path, { type: "manual", message: err.msg });
          });
        }
        if (errs.response.data.message) {
          alert(errs.response.data.message);
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="auth">
      <form action="" className="authForm" onSubmit={handleSubmit(submitHandler)}>
        <h1 className="form-title">Login</h1>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            {...register("username", { required: "username is required" })}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
        <div className="form-control">
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
