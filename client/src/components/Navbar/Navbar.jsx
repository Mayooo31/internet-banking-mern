import { Fragment, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import PulseLoader from "react-spinners/PulseLoader";
import styles from "./Navbar.module.css";

import useAxios from "../../hooks/useAxios";
import { useUser } from "../../context/userContext";

import {
  CogIcon,
  LogoutIcon,
  TrashIcon,
  XIcon,
  UserAddIcon,
  UserIcon,
} from "@heroicons/react/outline";

const Navbar = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { currentUser, setCurrentUser, currentError } = useUser();
  const { fetchUser, loading } = useAxios();

  const storedUsers = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.setItem("user", JSON.stringify({}));
    setCurrentUser({});
    navigate("/login");
  };

  const deleteHandler = () => {
    const body = { data: { alternativeToken: storedUsers.token } };
    const message = { message: "Account deleted!", status: 200 };

    fetchUser("delete", "users", body, message, false);
  };

  useEffect(() => {
    if (currentError.fetchError?.message === "Account deleted!") {
      setShowConfirm(false);
      setShowSettings(false);
      navigate("/login");
    }
  }, [currentError]);

  return (
    <Fragment>
      <nav className={styles.nav}>
        {storedUsers?.token ? (
          <p className={styles.welcome}>Welcome back, {currentUser.firstName}</p>
        ) : (
          <p className={`${styles.welcome} ${styles.welcome_reg}`}>
            Welcome to internet banking
          </p>
        )}

        {storedUsers?.token ? (
          <div className={styles.logout}>
            <div
              className={styles.settings}
              onMouseEnter={() => {
                setShowSettings(true);
              }}
              onMouseLeave={() => {
                setShowSettings(false);
                setShowConfirm(false);
              }}
            >
              <CogIcon className={styles.settings_icon} />

              {showSettings && (
                <div className={styles.settings_modal}>
                  <button className={styles.btn_normal}>MY PROFILE</button>
                  <div className={styles.line} />
                  <button className={styles.btn_normal}>CHANGE ACCOUNT</button>
                  {!showConfirm && (
                    <button
                      className={styles.btn_delete}
                      onClick={() => {
                        setShowConfirm(true);
                      }}
                    >
                      DELETE ACCOUNT
                    </button>
                  )}
                  {showConfirm && (
                    <div className={styles.btn_confirm}>
                      <div
                        className={styles.back}
                        onClick={() => {
                          setShowConfirm(false);
                        }}
                      >
                        <XIcon />
                      </div>
                      <div className={styles.go} onClick={deleteHandler}>
                        {!loading && <TrashIcon />}
                        {loading && (
                          <PulseLoader color={"#ffffff"} loading={loading} size={8} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button className={`${styles.btn} color_red`} onClick={logoutHandler}>
              <LogoutIcon className={styles.logout_icon} />
              Logout
            </button>
          </div>
        ) : (
          <div className={`${styles.logout} ${styles.logout_reg}`}>
            <NavLink
              to="/register"
              className={dataActive =>
                dataActive.isActive
                  ? `${styles.btn} ${styles.active} color_blue`
                  : `${styles.btn} color_blue`
              }
            >
              <UserAddIcon style={{ width: "2.6rem" }} />
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={dataActive =>
                dataActive.isActive
                  ? `${styles.btn} ${styles.active} color_purple`
                  : `${styles.btn} color_purple`
              }
            >
              <UserIcon style={{ width: "2.6rem" }} />
              Login
            </NavLink>
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Navbar;
