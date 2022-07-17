import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useDisableModal from "./useDisableModal";
import { useUser } from "../context/userContext";

const useAxios = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { success, setSuccess } = useDisableModal();
  const { setCurrentError } = useUser();

  const fetchUser = async (
    method = "GET",
    url,
    body = null,
    message = null,
    newToken = true
  ) => {
    const storedUsers = JSON.parse(localStorage.getItem("user"));

    let data;
    try {
      setLoading(true);
      data = await axios[method](`${process.env.REACT_APP_BACKEND_URL}/${url}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUsers?.token}`,
        },
      });

      setLoading(false);
      setSuccess(true);
      setCurrentError({ fetchError: message, success: true });
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      setCurrentError({ fetchError: err.response.data, success: false });
    }
    data &&
      newToken &&
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.data.token,
          expiresIn: new Date().getTime() / 1000 + data.data.expiresIn,
        })
      );
    data && navigate("/");
  };

  return { fetchUser, loading, success };
};

export default useAxios;
