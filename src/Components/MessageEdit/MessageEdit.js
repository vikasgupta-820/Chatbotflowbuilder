import "./messageEdit.css";
export default function MessageEdit({ textRef, nodeName, setNodeName }) {
  return (
    <div className="updatenode__controls">
      <div className="label-header-container">
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
