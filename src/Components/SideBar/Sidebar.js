import React from "react";
import MessageEdit from "../MessageEdit/MessageEdit";
import "./sideBar.css";
import { BsChatText } from "react-icons/bs";

const Sidebar = ({
  isSelected,
  textRef,
  nodeName,
  setNodeName,
  handleCloseBtn,
}) => {
  const onDragStart = (event, nodeType, content) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <aside>
      {isSelected ? (
        <MessageEdit
          handleCloseBtn={handleCloseBtn}
          textRef={textRef}
          nodeName={nodeName}
          setNodeName={setNodeName}
        />
      ) : (
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "node", "message")}
          draggable
        >
          <div className="chat-icon">
          <BsChatText />
          </div>
            
          Message
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
