import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { download } from "../assets";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { EditorTabs, FilterTabs } from "../config/constants";
import { CustomBtn, Tab } from "../components";
const Editor = () => {
  const snap = useSnapshot(state);
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
                  <Tab key={tab.name} tab={tab} handleClick={() => {}} />
                ))}
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
                isActiveTab=""
                key={tab.name}
                tab={tab}
                handleClick={() => {}}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Editor;
