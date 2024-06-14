import React, { memo } from "react";

import { Handle, Position } from "reactflow";
import "./messageNode.css";
import { BsChatText } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";

const Node = ({ data, selected }) => {


  return (
    <div className="text-updater-node">
      <div className={`message-body ${selected ? "selected" : ""}`}>
        <div className="message-title">
          <span><BsChatText/></span>&nbsp;{data?.heading}
          <div className="whats-app-container">
            <div><IoLogoWhatsapp/></div>
            </div>  
       </div>
        <div className="contentWrapper">{data?.content}</div>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

export default memo(Node);
