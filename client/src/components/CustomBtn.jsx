import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const CustomBtn = ({
  className,
  title,
  handleClick,
  variant = "contained",
}) => {
  const snap = useSnapshot(state);
  const generateStyle = (variant) => {
    if (variant === "contained") {
      return {
        backgroundColor: snap.accentColor,
        color: "#fff",
      };
    }
  };
  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${className}`}
      style={generateStyle(variant)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomBtn;
