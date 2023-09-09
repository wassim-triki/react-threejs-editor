import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { download } from "../assets";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import {
  AIPicker,
  ColorPicker,
  CustomBtn,
  FilePicker,
  Tab,
} from "../components";
import { reader } from "../config/helpers";
import config from "../config/config";
const Editor = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);

  const [activeEditorTab, setActivEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState("");

  //show tab content depending on active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImage={generatingImage}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImage(true);
      //call backend to gen image

      const response = await fetch(config.backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.image}`);
    } catch (error) {
    } finally {
      setGeneratingImage(false);
      setActivEditorTab("");
    }
  };

  const handleDecals = (decalType, readerResult) => {
    const decalT = DecalTypes[decalType];
    state[decalT.stateProperty] = readerResult;

    if (!activeFilterTab[decalT.filterTab]) {
      handleActiveFilterTab(decalT.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prev) => ({ ...prev, [tabName]: !prev[tabName] }));
  };

  const readFile = (decalType) => {
    reader(file).then((result) => {
      handleDecals(decalType, result);
      setActivEditorTab("");
    });
  };
  return (
    <AnimatePresence>
      {!snap.inHomePage && (
        <>
          <motion.div
            key="edit"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActivEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomBtn
              variant="contained"
              title={"Go Back"}
              handleClick={() => (state.inHomePage = true)}
              className={"w-fit px-4 py-2.5 font-bold text-sm"}
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                key={tab.name}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Editor;
