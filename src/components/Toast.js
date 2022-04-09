import React from "react";
export const ToastContent = (message) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",

        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: "10px" }}>{message} </div>
    </div>
  );
};
