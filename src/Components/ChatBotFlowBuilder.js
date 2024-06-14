import { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";
import "./dnd.css";
import Sidebar from "./SideBar/Sidebar";
import Node from "./Message/MessageNode";
import { isAllNodeConnected } from "../helper-funtion";
import {
  nodes as initialNodes,
  edges as initialEdges
} from "../initial-data";
import Success from "./Toast/Success";
import Error from "./Toast/Error";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { node: Node };

const ChatBotFlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [nodeName, setNodeName] = useState("Node 1");
  const[toast,setToast] = useState(false)
  const[errrorToast,setErrorToast] = useState(false)


  //The onInit callback is called when the viewport is initialized. At this point you can use the instance to call methods like fitView or zoomTo.
  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  //When a connection line is completed and two nodes are connected by the user, this event fires with the new connection. You can use the addEdge utility to convert the connection to a complete edge.
  // addEdges adds a new Edge to an array of edges
  const onConnect = useCallback(
    (params) =>
      setEdges((e) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, e)
      ),
    [setEdges]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
  
      const type = e.dataTransfer.getData("application/reactflow");
      const label = e.dataTransfer.getData("content");
      //With screenToFlowPosition function you can translate a screen pixel position to a flow position. It is useful for implemting drag and drop from a sidebar
      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { heading: "Send Message", content: label }
      };
      setNodes((e) => e.concat(newNode));
      setSelectedNode(newNode.id);
    }, [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  useEffect(() => {
    const node = nodes.filter((node) => {
      if (node.selected) return true;
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
      setIsSelected(true);
    } else {
      setSelectedNode("");
      setIsSelected(false);
    }
  }, [nodes]);

  useEffect(() => {
    setNodeName(selectedNode?.data?.content || selectedNode);
  }, [selectedNode]);
  useEffect(() => {
    textRef?.current?.focus();
  }, [selectedNode]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            content: nodeName || " "
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);

  const handleSave = () => {
    return isAllNodeConnected(nodes, edges) ?  setToast(true) : setErrorToast(true)
  };
const handleClose = () => {
  setToast(false)
  setErrorToast(false)
}
  return (
    <>
    {
      toast ? (<Success text="Flow Saved Successfully" handleClose={handleClose}/>) : null
    }
    {
      errrorToast? (<Error text="Cannot Save Flow" handleClose={handleClose}/>) : null
    }
    <div className="dndflow-save">
      <div className="save">
      <button className="save-btn" onClick={handleSave}>Save Changes</button>
      </div>
    </div>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <Background color="#111111" gap={20} />
            </ReactFlow>
          </div>

          <Sidebar
            isSelected={isSelected}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default ChatBotFlowBuilder;
