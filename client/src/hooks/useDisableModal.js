import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";

const useDisableModal = () => {
  const [success, setSuccess] = useState(false);
  const { currentError, setCurrentError } = useUser();

  useEffect(() => {
    if (!currentError.fetchError?.message) return;
    if (currentError.fetchError?.message) {
      setTimeout(() => {
        setCurrentError({});
      }, 5000);
    }
  }, [currentError]);

  return { success, setSuccess };
};

export default useDisableModal;
