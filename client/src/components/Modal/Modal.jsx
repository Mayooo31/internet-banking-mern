import React, { useRef, useState, useEffect } from "react";

import styles from "./Modal.module.css";
import "../../global.css";
import PulseLoader from "react-spinners/PulseLoader";

import useAxios from "../../hooks/useAxios";
import { useUser } from "../../context/userContext";

const Modal = ({ amount, to, firstName, lastName, setShowModal, reFetchUser }) => {
  const toRef = useRef();
  const amountRef = useRef();
  const fromRef = useRef();
  const messageRef = useRef();

  const [formError, setFormError] = useState({});

  const { fetchUser, loading } = useAxios();
  const { currentError, balance } = useUser();

  const submitHandler = async e => {
    e.preventDefault();

    let errors = {};
    if (!amountRef.current.value) errors.amount = "Amount is required!";
    if (!toRef.current.value) errors.to = "Who do you want to send it to?";
    if (balance < amountRef.current.value)
      errors.amount = "You don't have that much money";

    setFormError(errors);

    const isEmpty = Object.keys(errors).length === 0;

    if (!isEmpty) return;

    const body = {
      movement: Number("-" + amountRef.current.value),
      from: firstName + " " + lastName,
      to: toRef.current.value,
      message: messageRef.current.value,
    };

    const message = { message: "Successfully sent money!", status: 200 };

    fetchUser("post", "movements", body, message, false);
  };

  const changeHandler = e => {
    const inputId = e.target.id;

    if (formError[inputId] === "") return;

    setFormError({ ...formError, [inputId]: "" });
  };

  useEffect(() => {
    if (currentError.fetchError?.message === "Successfully sent money!") {
      setShowModal(false);
      reFetchUser();
    }
  }, [currentError]);

  return (
    <div className={`color_blue ${styles.transfer_form}`}>
      <form onSubmit={submitHandler}>
        <h1>Confirm transfer money</h1>
        <div>
          <label className="form__label">Amount</label>
          <input
            defaultValue={amount}
            type="number"
            className="form__input start"
            ref={amountRef}
            min="10"
            onChange={changeHandler}
            id="amount"
          />
          <p>{formError?.amount}</p>
        </div>
        <div>
          <label className="form__label">From</label>
          <input
            disabled
            value={firstName + " " + lastName}
            type="text"
            className="form__input start"
            ref={fromRef}
          />
        </div>
        <div>
          <label className="form__label">To</label>
          <input
            defaultValue={to}
            type="text"
            className="form__input start"
            ref={toRef}
            onChange={changeHandler}
            id="to"
          />
          <p>{formError?.to}</p>
        </div>
        <div>
          <label className="form__label">Message</label>
          <textarea
            className="form__input start"
            ref={messageRef}
            placeholder="Message is optional"
          />
        </div>

        <button>
          {!loading && "Send money!"}
          {loading && <PulseLoader color={"#3b3b3b"} loading={loading} size={8} />}
        </button>
      </form>
    </div>
  );
};

export default Modal;
