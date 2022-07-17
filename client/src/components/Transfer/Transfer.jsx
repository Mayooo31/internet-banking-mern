import { useRef } from "react";

import styles from "./Transfer.module.css";
import "../../global.css";

import { ArrowSmRightIcon } from "@heroicons/react/solid";
import Modal from "../Modal/Modal";
import { useState } from "react";

const Transfer = ({ firstName, lastName, reFetchUser }) => {
  const transferToRef = useRef();
  const amountRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const submitHandler = e => {
    e.preventDefault();

    setShowModal(true);
  };

  return (
    <div className={`operation ${styles.operation_transfer}`}>
      {showModal && (
        <div className={styles.backdrop} onClick={() => setShowModal(false)} />
      )}
      {showModal && (
        <Modal
          amount={amountRef.current.value}
          to={transferToRef.current.value}
          firstName={firstName}
          lastName={lastName}
          setShowModal={setShowModal}
          reFetchUser={reFetchUser}
        />
      )}
      <h2>Transfer money</h2>
      <form className="form" onSubmit={submitHandler}>
        <input type="text" className="form__input" ref={transferToRef} />
        <input type="number" className="form__input" ref={amountRef} />
        <button className="form__btn">
          <ArrowSmRightIcon className="arrow-right" style={{ color: "orange" }} />
        </button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
};

export default Transfer;
