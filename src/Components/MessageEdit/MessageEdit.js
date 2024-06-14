import "./messageEdit.css";
import { IoArrowBack } from "react-icons/io5";
export default function MessageEdit({ textRef, nodeName, setNodeName,handleCloseBtn }) {
  return (
    <div className="updatenode__controls">
      <div className="label-header-container">
      <div className="back-btn" onClick={handleCloseBtn}>
     <IoArrowBack />
      </div>
        <label className="label-header">Message</label>
      </div>
      <div className="label-text-container">
      <label className="label-text">Text</label>
      <textarea
        ref={textRef}
        value={nodeName}
        onChange={(e) => setNodeName(e.target.value)}
        rows={5}
      />
      </div>
    </div>
  );
}
