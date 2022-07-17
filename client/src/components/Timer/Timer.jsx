import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Timer.module.css";

const Timer = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState();

  const storedUsers = JSON.parse(localStorage.getItem("user"));

  const secondsToHms = d => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? h : "";
    const mDisplay = m > 0 ? m : "";
    const sDisplay = s > 0 ? s : "";
    return (
      `${hDisplay}`.padStart(2, 0) +
      ":" +
      `${mDisplay}`.padStart(2, 0) +
      ":" +
      `${sDisplay}`.padStart(2, 0)
    );
  };

  useEffect(() => {
    setTime(secondsToHms(storedUsers?.expiresIn - new Date().getTime() / 1000));
  }, []);

  setTimeout(() => {
    if (storedUsers?.expiresIn < new Date().getTime() / 1000) {
      localStorage.setItem("user", JSON.stringify({}));
      navigate("/login");
    }
    setTime(secondsToHms(storedUsers?.expiresIn - new Date().getTime() / 1000));
  }, 1000);

  return (
    <p className={styles.logout_timer}>
      You will be logged out in <span className={styles.timer}>{time}</span>
    </p>
  );
};

export default Timer;
