import React from "react";
import { CustomBtn } from "./";
const AIPicker = ({ prompt, setPrompt, generatingImage, handleSubmit }) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        placeholder="Ask DALL.E AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        {generatingImage ? (
          <CustomBtn
            variant="outline"
            title={"Asking DALLE.E AI..."}
            className={"text-xs"}
          />
        ) : (
          <>
            <CustomBtn
              variant="outline"
              title={"AI Logo"}
              className={"text-xs"}
              handleClick={() => handleSubmit("logo")}
            />
            <CustomBtn
              variant="contained"
              title={"AI Full"}
              className={"text-xs"}
              handleClick={() => handleSubmit("full")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
