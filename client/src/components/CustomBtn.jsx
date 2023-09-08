import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

import { getContrastingColor } from "../config/helpers";

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
        color: getContrastingColor(snap.accentColor),
      };
    } else if (variant === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.accentColor,
        color: snap.accentColor,
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
