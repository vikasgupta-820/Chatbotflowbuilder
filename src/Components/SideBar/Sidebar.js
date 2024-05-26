


import React from 'react'
import MessageEdit from "../MessageEdit/MessageEdit";
import "./sideBar.css"

const Sidebar = ({ isSelected, textRef, nodeName, setNodeName }) => {
  const onDragStart = (event, nodeType, content) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <aside>
    {isSelected ? (
      <MessageEdit
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
        Message
      </div>
    )}
  </aside>
  )
}

export default Sidebar
