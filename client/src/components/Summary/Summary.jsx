import { formatCur } from "../../utils/formatCurrency";

import styles from "./Summary.module.css";
import { ArrowSmDownIcon } from "@heroicons/react/solid";
import { useState } from "react";

const Summary = ({ userData, setUserData }) => {
  const [sort, setSort] = useState(true);

  let income = 0;
  let outcome = 0;
  (() => {
    userData.movements.map(mov => {
      if (mov.movement >= 0) {
        income = income + mov.movement;
      }
      if (mov.movement <= 0) {
        outcome = outcome + mov.movement;
      }
    });
  })();

  const sortHandler = () => {
    if (sort) {
      userData.movements.sort((a, b) => {
        if (a.createdAt > b.createdAt) return 1;
        if (a.createdAt < b.createdAt) return -1;
      });
      setUserData({ ...userData });
      setSort(false);
      return;
    } else {
      userData.movements.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
      });
      setUserData({ ...userData });
      setSort(true);
    }
  };

  return (
    <div className={styles.summary}>
      <p className={styles.summary__label}>In</p>
      <p className={`${styles.summary__value} ${styles.summary__value_in}`}>
        {formatCur(income, "cz-CZ", "CZK")}
      </p>
      <p className={styles.summary__label}>Out</p>
      <p className={`${styles.summary__value} ${styles.summary__value_out}`}>
        {formatCur(Math.abs(outcome), "cz-CZ", "CZK")}
      </p>
      <button className={styles.btn_sort} onClick={sortHandler}>
        <ArrowSmDownIcon className={sort ? styles.arrow_down : styles.arrow_up} />
        SORT
      </button>
    </div>
  );
};

export default Summary;
