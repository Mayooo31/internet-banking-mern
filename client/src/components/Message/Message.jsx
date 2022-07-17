import React, { Fragment } from "react";

const Message = ({ fetchError, success }) => {
  return (
    <Fragment>
      {fetchError && (
        <p className={`error ${success ? "success" : "fail"}`}>
          {fetchError.message} {!success && `( ${fetchError.status} )`}
        </p>
      )}
    </Fragment>
  );
};

export default Message;
