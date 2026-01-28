/**
 * Canvas Store
 * 画布状态管理
 *
 * Zustand store for managing research canvas state
 * 使用 Zustand 管理研究画布状态
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Node, Edge } from 'reactflow';
import type { ResearchNode, ResearchEdge } from '@/types/research';

interface CanvasState {
  // Canvas state / 画布状态
  nodes: Node<ResearchNode>[];
  edges: Edge<ResearchEdge>[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  viewport: { x: number; y: number; zoom: number };

  // Actions / 操作
  setNodes: (nodes: Node<ResearchNode>[]) => void;
  setEdges: (edges: Edge<ResearchEdge>[]) => void;
  addNode: (node: Node<ResearchNode>) => void;
  updateNode: (nodeId: string, updates: Partial<Node<ResearchNode>>) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: Edge<ResearchEdge>) => void;
  updateEdge: (edgeId: string, updates: Partial<Edge<ResearchEdge>>) => void;
  removeEdge: (edgeId: string) => void;

  // Selection / 选择
  selectNode: (nodeId: string | null) => void;
  selectEdge: (edgeId: string | null) => void;
  clearSelection: () => void;

  // Viewport / 视口
  setViewport: (viewport: { x: number; y: number; zoom: number }) => void;

  // Reset / 重置
  reset: () => void;
}

const initialState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  viewport: { x: 0, y: 0, zoom: 1 },
};

export const useCanvasStore = create<CanvasState>()(
  devtools(
    (set) => ({
      ...initialState,

      // Node operations / 节点操作
      setNodes: (nodes) => set({ nodes }, false, 'setNodes'),

      setEdges: (edges) => set({ edges }, false, 'setEdges'),

      addNode: (node) =>
        set((state) => ({ nodes: [...state.nodes, node] }), false, 'addNode'),

      updateNode: (nodeId, updates) =>
        set(
          (state) => ({
            nodes: state.nodes.map((node) =>
              node.id === nodeId ? { ...node, ...updates } : node
            ),
          }),
          false,
          'updateNode'
        ),

      removeNode: (nodeId) =>
        set(
          (state) => ({
            nodes: state.nodes.filter((node) => node.id !== nodeId),
            edges: state.edges.filter(
              (edge) => edge.source !== nodeId && edge.target !== nodeId
            ),
          }),
          false,
          'removeNode'
        ),

      // Edge operations / 边操作
      addEdge: (edge) =>
        set((state) => ({ edges: [...state.edges, edge] }), false, 'addEdge'),

      updateEdge: (edgeId, updates) =>
        set(
          (state) => ({
            edges: state.edges.map((edge) =>
              edge.id === edgeId ? { ...edge, ...updates } : edge
            ),
          }),
          false,
          'updateEdge'
        ),

      removeEdge: (edgeId) =>
        set(
          (state) => ({
            edges: state.edges.filter((edge) => edge.id !== edgeId),
          }),
          false,
          'removeEdge'
        ),

      // Selection / 选择
      selectNode: (nodeId) => set({ selectedNodeId: nodeId }, false, 'selectNode'),

      selectEdge: (edgeId) => set({ selectedEdgeId: edgeId }, false, 'selectEdge'),

      clearSelection: () =>
        set({ selectedNodeId: null, selectedEdgeId: null }, false, 'clearSelection'),

      // Viewport / 视口
      setViewport: (viewport) => set({ viewport }, false, 'setViewport'),

      // Reset / 重置
      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'CanvasStore' }
  )
);

// Selectors / 选择器
export const selectNodes = (state: CanvasState) => state.nodes;
export const selectEdges = (state: CanvasState) => state.edges;
export const selectSelectedNode = (state: CanvasState) =>
  state.nodes.find((n) => n.id === state.selectedNodeId) || null;
export const selectSelectedEdge = (state: CanvasState) =>
  state.edges.find((e) => e.id === state.selectedEdgeId) || null;
