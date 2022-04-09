import React from "react";
import { WaveLoading } from "react-loadingg";

export const Loader = ({ Title }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "6rem",
        marginBottom: "4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <WaveLoading color={"#7AC3EC"} style={{ position: "relative" }} />
      <h3
        className="font-weight-normal fs-18 text-center"
        style={{
          color: "black",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        {Title}
      </h3>
    </div>
  );
};
