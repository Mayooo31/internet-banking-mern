import { useEffect } from "react";
import { useState } from "react";
import { useUser } from "../../context/userContext";
import { formatCur } from "../../utils/formatCurrency";

import styles from "./Balance.module.css";

const Balance = ({ movements }) => {
  const [timer, setTimer] = useState(false);
  const { setBalance } = useUser();

  let balance = 0;
  (() => {
    movements.map(mov => {
      balance = balance + mov.movement;
    });
  })();

  useEffect(() => {
    setBalance(balance);
  }, [balance]);

  let now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, 0);
  const min = `${now.getMinutes()}`.padStart(2, 0);

  const currentTime = `${day}.${month}.${year}, ${hour}:${min}`;

  setTimeout(() => {
    now = new Date();
    setTimer(!timer);
  }, 60000);

  return (
    <div className={styles.balance}>
      <div>
        <p className={styles.label}>Current balance</p>
        <p className={styles.date}>
          <span>{currentTime}</span>
        </p>
      </div>
      <p className={styles.value}>{formatCur(balance, "cz-CZ", "CZK")}</p>
    </div>
  );
};

export default Balance;
