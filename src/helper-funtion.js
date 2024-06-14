export function isAllNodeConnected(nodes, edges) {
  const allNodesIds = nodes.map((node) => node.id);
  const allSourceEdges = edges.map((edge) => edge.source);
  const count = allNodesIds.filter(nodeId => !allSourceEdges.includes(nodeId)).length;
  if (count >= 2) {
    return false;
  }
  return true;
}
