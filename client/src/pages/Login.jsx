import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "./Login.module.css";
import PulseLoader from "react-spinners/PulseLoader";
import Account from "../components/Account/Account";

import useAxios from "../hooks/useAxios";

const Login = () => {
  const navigate = useNavigate();

  const storedUsers = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (storedUsers?.token) return navigate("/");
  }, []);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [formError, setFormError] = useState({});

  const { fetchUser, loading } = useAxios();

  const submitHandler = e => {
    e.preventDefault();

    let errors = {};

    if (!emailRef.current.value) errors.email = "Email is required!";
    if (!passwordRef.current.value) errors.password = "Password is required!";

    setFormError(errors);

    const isEmpty = Object.keys(errors).length === 0;

    if (!isEmpty) return;

    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const message = { message: "You are logged in!", status: 200 };

    fetchUser("post", "auth/login", body, message);
  };

  const changeHandler = e => {
    const inputId = e.target.id;

    if (formError[inputId] === "") return;

    setFormError({ ...formError, [inputId]: "" });
  };

  return (
    <div className={`operation ${styles.login_container}`}>
      <Helmet>
        <title>Internet banking | Login</title>
      </Helmet>

      <h1>Log in</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={changeHandler} ref={emailRef} />
          <p>{formError?.email}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={changeHandler}
            ref={passwordRef}
          />
          <p>{formError?.password}</p>
        </div>
        <div className={styles.login}>
          <button type="submit">
            {!loading && "Log in!"}
            {loading && <PulseLoader color={"#3b3b3b"} loading={loading} size={8} />}
          </button>

          <Link to="/register">Dont have account? Register</Link>
        </div>
      </form>
      <Account />
    </div>
  );
};

export default Login;
