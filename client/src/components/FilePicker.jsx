import React from "react";
import CustomBtn from "./CustomBtn";
import { getContrastingColor } from "../config/helpers";
import { useSnapshot } from "valtio";
import state from "../store";

const FilePicker = ({ file, setFile, readFile }) => {
  const snap = useSnapshot(state);
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          htmlFor="file-upload"
          className="filepicker-label"
          style={{
            color: getContrastingColor(snap.accentColor),
            // borderColor: getContrastingColor(snap.accentColor),
          }}
        >
          Upload File
        </label>
        <p className="mt-2 text-gray-500 text-sm truncate">
          {file === "" ? "No file selected" : file?.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomBtn
          variant="outline"
          title={"Logo"}
          handleClick={() => readFile("logo")}
          className={"text-xs"}
        />
        <CustomBtn
          variant="contained"
          title={"Full"}
          handleClick={() => readFile("full")}
          className={"text-xs"}
        />
      </div>
    </div>
  );
};

export default FilePicker;
