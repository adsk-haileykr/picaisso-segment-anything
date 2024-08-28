// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import React, { useContext } from "react";
import * as _ from "underscore";
import Tool from "./Tool";
import { modelInputProps } from "./helpers/Interfaces";
import AppContext from "./hooks/createContext";

const Stage = () => {
  const {
    clicks: [, setClicks],
    image: [image],
    imageSelection: [, setImageSelection],
  } = useContext(AppContext)!;

  const getClick = (x: number, y: number): modelInputProps => {
    const clickType = 1;
    return { x, y, clickType };
  };

  // Get mouse position and scale the (x, y) coordinates back to the natural
  // scale of the image. Update the state of clicks with setClicks to trigger
  // the ONNX model to run and generate a new mask via a useEffect in App.tsx
  const handleMouseMove = _.throttle((e: any) => {
    let el = e.nativeEvent.target;
    const rect = el.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    const imageScale = image ? image.width / el.offsetWidth : 1;
    x *= imageScale;
    y *= imageScale;
    const click = getClick(x, y);
    if (click) setClicks([click]);
  }, 15);

  const flexCenterClasses = "flex items-center justify-center";
  return (
    <div className={`${flexCenterClasses} w-full h-full`}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "0.5rem",
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Autodesk
        <div style={{ float: "right" }}>
          <button
            style={{
              border: "1px solid white",
              padding: "5px",
              marginRight: "1rem",
            }}
            onClick={() => setImageSelection(1)}
          >
            Truck
          </button>
          <button
            style={{
              border: "1px solid white",
              padding: "5px",
            }}
            onClick={() => setImageSelection(2)}
          >
            Stadium
          </button>
        </div>
      </div>
      <div className={`${flexCenterClasses} relative w-[90%] h-[90%]`}>
        <Tool handleMouseMove={handleMouseMove} />
      </div>
    </div>
  );
};

export default Stage;
