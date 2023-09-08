import React from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import state from "../store";
const ColorPicker = () => {
  const snap = useSnapshot(state);
  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.accentColor}
        disableAlpha
        onChange={(color) => {
          state.accentColor = color.hex;
        }}
        // presetColors={[
        //   "#FF6B6B", // Fiery Red
        //   "#48A9A6", // Teal Blue
        //   "#FED766", // Bright Yellow
        //   "#1A2A2A", // Charcoal
        //   "#03CEA4", // Muted Green
        //   "#D499B9", // Soft Pink
        //   "#556270", // Muted Blue-Gray
        //   "#726DE8", // Goldenrod
        //   "#5F0F40", // Deep Purple
        //   "#679436", // Olive Green
        //   "#2A2B2A", // Almost Black
        //   "#FF165D", // Pink Red
        // ]}
      />
    </div>
  );
};

export default ColorPicker;
