import Balance from "../components/Balance/Balance";
import Loan from "../components/Loan/Loan";
import Password from "../components/Password/Password";
import Movements from "../components/Movements/Movements";
import Summary from "../components/Summary/Summary";
import Timer from "../components/Timer/Timer";
import Transfer from "../components/Transfer/Transfer";

import styles from "./Home.module.css";

import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/userContext";

const Home = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();
  const [userData, setUserData] = useState();

  const storedUsers = JSON.parse(localStorage.getItem("user"));

  const fetchUser = async () => {
    let data;
    try {
      data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/is-logged-in`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUsers?.token}`,
        },
      });
      setUserData(data.data.user);
      setCurrentUser(data.data.user);
    } catch (err) {
      localStorage.setItem("user", JSON.stringify({}));
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Internet banking | Home Page</title>
      </Helmet>
      {userData && (
        <div className={styles.container}>
          <Balance movements={userData.movements} />
          <Movements userData={userData} />
          <Summary userData={userData} setUserData={setUserData} />
          <Transfer
            firstName={userData.firstName}
            lastName={userData.secondName}
            reFetchUser={fetchUser}
          />
          <Loan userData={userData} reFetchUser={fetchUser} />
          <Password />
          <Timer />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
