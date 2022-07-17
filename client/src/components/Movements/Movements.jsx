import { Fragment, useState } from "react";
import { formatCur } from "../../utils/formatCurrency";
import { getDate } from "../../utils/getDate";

import { EmojiSadIcon } from "@heroicons/react/outline";
import styles from "./Movements.module.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Movements = ({ userData }) => {
  const [movementInfo, setMovementInfo] = useState(false);

  const formatInfo = (i, option) => {
    return option
      ? i + 1 >= userData.movements.length - 2 && userData.movements.length > 4
        ? styles.square_last
        : styles.square_all
      : i + 1 >= userData.movements.length - 2 && userData.movements.length > 4
      ? styles.movement_info_last
      : styles.movement_info_all;
  };

  const getMonthInOneWord = (month, secondMonth = false) => {
    const numberMonth = getDate(month, "month");

    if (secondMonth) {
      const currentMonth = getDate(month, "month");
      const nextMonth = getDate(secondMonth, "month");

      if (currentMonth === nextMonth) return;
      return months[currentMonth - 1];
    }
    return months[numberMonth - 1];
  };

  return (
    <div className={styles.movements}>
      {userData.movements.length === 0 && (
        <div className={styles.payment}>
          No payments <EmojiSadIcon style={{ height: "4rem", color: "#666" }} />
        </div>
      )}
      {userData.movements.map((mov, i) => (
        <Fragment key={mov._id}>
          {i === 0 && (
            <div className={styles.month}>{getMonthInOneWord(mov.createdAt)}</div>
          )}
          {i !== 0 && (
            <div className={styles.month}>
              {getMonthInOneWord(mov.createdAt, userData.movements[i - 1]?.createdAt)}
            </div>
          )}
          <div
            className={styles.row}
            onMouseEnter={() => {
              setMovementInfo(i);
            }}
            onMouseLeave={() => {
              setMovementInfo(false);
            }}
          >
            <div
              className={`${styles.type} ${
                mov.movement > 0 ? styles.type_deposit : styles.type_withdrawal
              }`}
            >
              {userData.movements.length - i}{" "}
              {mov.movement > 0 ? "deposit" : "withdrawal"}
            </div>
            <div className={styles.date}>{getDate(mov.createdAt)}</div>
            <div className={styles.value}>{formatCur(mov.movement, "cz-CZ", "CZK")}</div>

            {movementInfo === i && (
              <div>
                <div className={`${styles.square} ${formatInfo(i, true)}`}></div>
                <div className={`${styles.movement_info} ${formatInfo(i, false)}`}>
                  <div>
                    Time:
                    <p> {getDate(mov.createdAt, true)}</p>
                  </div>
                  <div>
                    From:<p> {mov.from}</p>
                  </div>
                  <div>
                    To:
                    <p> {mov.to}</p>
                  </div>
                  <div>
                    Message:
                    <p> {mov.message}</p>
                  </div>
                  <div>
                    Movement:
                    <p> {formatCur(mov.movement, "cz-CZ", "CZK")}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Movements;
