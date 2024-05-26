import { MarkerType } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "node",
    data: { heading: "Send Message", content: "text message 1" },
    position: { x: 100, y: 200 }
  },
  {
    id: "2",
    type: "node",
    data: { heading: "Send Message", content: "text message 2" },
    position: { x: 300, y: 150 }
  }
];

export const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  }
];
