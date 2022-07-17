import { useEffect, useRef, useState } from "react";

import styles from "./Loan.module.css";
import "../../global.css";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import PulseLoader from "react-spinners/PulseLoader";

import useAxios from "../../hooks/useAxios";
import { useUser } from "../../context/userContext";

const Loan = ({ userData, reFetchUser }) => {
  const amountRef = useRef();
  const [formError, setFormError] = useState({});

  const { fetchUser, loading } = useAxios();
  const { currentError } = useUser();

  const submitHandler = e => {
    e.preventDefault();

    let errors = {};

    if (amountRef.current.value < 500) errors.amount = "Minimum is 500";
    if (amountRef.current.value > 2000000) errors.amount = "Maximum is 1 000 000";

    setFormError(errors);

    const isEmpty = Object.keys(errors).length === 0;

    if (!isEmpty) return;

    const body = {
      movement: amountRef.current.value,
      from: "Bank",
      to: userData.firstName + " " + userData.secondName,
      message: "Hypotéka",
    };

    const message = { message: "Your loan should be here any minute!", status: 200 };

    fetchUser("post", "movements", body, message, false);
  };

  const changeHandler = e => {
    const inputId = e.target.id;

    if (formError[inputId] === "") return;

    setFormError({ ...formError, [inputId]: "" });
  };

  useEffect(() => {
    if (currentError.fetchError?.message === "Your loan should be here any minute!") {
      reFetchUser();
    }
  }, [currentError]);

  return (
    <div className={`operation ${styles.operation_loan}`}>
      <h2>{formError?.amount ? formError?.amount : "Request loan"}</h2>
      <form className="form form--loan" onSubmit={submitHandler}>
        <input
          type="number"
          className="form__input"
          onChange={changeHandler}
          ref={amountRef}
          id="amount"
        />
        <button className="form__btn">
          {!loading && (
            <ArrowSmRightIcon className="arrow-right" style={{ color: "lightgreen" }} />
          )}
          {loading && <PulseLoader color={"#24de6b"} loading={loading} size={8} />}
        </button>
        <label className="form__label form__label--loan">Amount</label>
      </form>
    </div>
  );
};

export default Loan;
