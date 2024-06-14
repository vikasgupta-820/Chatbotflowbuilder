import React, { memo } from "react";

import { Handle, Position } from "reactflow";
import "./messageNode.css";

const Node = ({ data, selected }) => {


  return (
    <div className="text-updater-node">
      <div className={`message-body ${selected ? "selected" : ""}`}>
        <div className="message-title">
          {data?.heading}  
       </div>
        <div className="contentWrapper">{data?.content}</div>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

export default memo(Node);
