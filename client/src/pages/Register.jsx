import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "./Register.module.css";
import PulseLoader from "react-spinners/PulseLoader";

import useAxios from "../hooks/useAxios";

const Register = () => {
  const navigate = useNavigate();

  const storedUsers = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (storedUsers?.token) return navigate("/");
  }, []);

  const firstNameRef = useRef();
  const secondNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const birthYearRef = useRef();
  const genderRef = useRef();
  const [formError, setFormError] = useState({});

  const { fetchUser, loading } = useAxios();

  const submitHandler = e => {
    e.preventDefault();

    let errors = {};

    const currentYear = new Date().getFullYear();
    if (currentYear - birthYearRef.current.value < 18)
      errors.birthYear = "You are too young!";

    if (!firstNameRef.current.value) errors.firstName = "First name is required!";
    if (!secondNameRef.current.value) errors.secondName = "Second name is required!";
    if (!emailRef.current.value) errors.email = "Email is required!";
    if (!passwordRef.current.value) errors.password = "Password is required!";
    if (!confirmPasswordRef.current.value)
      errors.confirmPassword = "Confirm password is required!";
    if (!birthYearRef.current.value) errors.birthYear = "Birth Year is required!";
    if (genderRef.current.value === "select") errors.gender = "Gender is required!";

    if (passwordRef.current.value.length < 8)
      errors.password = "Password must be atleast 8 character long!";
    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      errors.confirmPassword = "Passwords must be same!";

    setFormError(errors);

    const isEmpty = Object.keys(errors).length === 0;

    if (!isEmpty) return;

    const body = {
      firstName: firstNameRef.current.value,
      secondName: secondNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      birthYear: birthYearRef.current.value,
      gender: genderRef.current.value,
    };

    const message = { message: "Account created!", status: 200 };

    fetchUser("post", "auth/register", body, message);
  };

  const changeHandler = e => {
    const inputId = e.target.id;

    if (formError[inputId] === "") return;

    setFormError({ ...formError, [inputId]: "" });
  };

  return (
    <div className={`operation ${styles.register_container}`}>
      <Helmet>
        <title>Internet banking | Register</title>
      </Helmet>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input id="firstName" ref={firstNameRef} onChange={changeHandler} />
          <p>{formError?.firstName}</p>
        </div>
        <div>
          <label htmlFor="secondName">Second name</label>
          <input id="secondName" ref={secondNameRef} onChange={changeHandler} />
          <p>{formError?.secondName}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" ref={emailRef} onChange={changeHandler} />
          <p>{formError?.email}</p>
        </div>
        <div>
          <label htmlFor="password">Password ( 8 characters )</label>
          <input
            id="password"
            type="password"
            ref={passwordRef}
            onChange={changeHandler}
          />
          <p>{formError?.password}</p>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            ref={confirmPasswordRef}
            onChange={changeHandler}
          />
          <p>{formError?.confirmPassword}</p>
        </div>
        <div>
          <label htmlFor="birthYear">Birth year</label>
          <input
            id="birthYear"
            type="number"
            ref={birthYearRef}
            onChange={changeHandler}
          />
          <p>{formError?.birthYear}</p>
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" ref={genderRef} onChange={changeHandler}>
            <option value="select">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="else">Different</option>
          </select>
          <p>{formError?.gender}</p>
        </div>
        <div>
          <button type="submit">
            {!loading && "Register!"}
            {loading && <PulseLoader color={"#3b3b3b"} loading={loading} size={8} />}
          </button>
          <Link to="/login">You have account? Login in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
