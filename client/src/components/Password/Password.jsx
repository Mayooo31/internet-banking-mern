import styles from "./Password.module.css";
import "../../global.css";

import { ArrowSmRightIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import useAxios from "../../hooks/useAxios";

const initialState = {
  password: "",
  confirmPassword: "",
};

const Password = () => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [formError, setFormError] = useState(initialState);

  const { fetchUser, loading } = useAxios();

  const submitHandler = e => {
    e.preventDefault();

    let errors = {};

    if (!passwordRef.current.value) errors.password = "Password is required!";
    if (!confirmPasswordRef.current.value)
      errors.confirmPassword = "Confirm password is required!";
    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      errors.confirmPassword = "Passwords must be same!";

    setFormError(errors);

    const isEmpty = Object.keys(errors).length === 0;

    if (!isEmpty) return;

    const body = {
      newPassword: passwordRef.current.value,
      confirmNewPassword: confirmPasswordRef.current.value,
    };

    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
    passwordRef.current.blur();
    confirmPasswordRef.current.blur();

    const message = { message: "Passwords successfully changed!", status: 200 };

    fetchUser("patch", "auth/change-password", body, message);
  };

  const changeHandler = e => {
    const inputId = e.target.id;

    if (formError[inputId] === "") return;

    setFormError({ ...formError, [inputId]: "" });
  };

  return (
    <div className={`operation ${styles.operation_password}`}>
      <h2>
        {formError?.password || formError?.confirmPassword
          ? formError?.password || formError?.confirmPassword
          : "Change password"}
      </h2>
      <form className="form" onSubmit={submitHandler}>
        <input
          type="password"
          minLength="8"
          id="password"
          className="form__input"
          ref={passwordRef}
          onChange={changeHandler}
        />
        <input
          type="password"
          minLength="8"
          id="confirmPassword"
          className="form__input"
          ref={confirmPasswordRef}
          onChange={changeHandler}
        />
        <button className="form__btn">
          {!loading && (
            <ArrowSmRightIcon className="arrow-right" style={{ color: "red" }} />
          )}
          {loading && <PulseLoader color={"#e52a5a"} loading={loading} size={8} />}
        </button>
        <label className="form__label">New PIN</label>
        <label className="form__label">Confirm PIN</label>
      </form>
    </div>
  );
};

export default Password;
