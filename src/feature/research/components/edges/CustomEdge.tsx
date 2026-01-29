/**
 * Custom Edge Component
 * 自定义边组件
 *
 * Styled edge with label for research relationships
 * 带标签的研究关系边
 */

import { memo } from "react";
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from "reactflow";
import { X } from "lucide-react";

interface CustomEdgeProps extends EdgeProps {
  onDelete?: (edgeId: string) => void;
}

// Edge type configurations
const edgeTypeConfig = {
  derivesTo: {
    color: "#f59e0b", // amber
    label: "推导出",
    icon: "→",
    dashArray: "",
  },
  verifies: {
    color: "#22c55e", // green
    label: "验证",
    icon: "✓",
    dashArray: "",
  },
  refutes: {
    color: "#ef4444", // red
    label: "反驳",
    icon: "✕",
    dashArray: "5,5",
  },
  cites: {
    color: "#3b82f6", // blue
    label: "引用",
    icon: "📖",
    dashArray: "",
  },
  basedOn: {
    color: "#a855f7", // purple
    label: "基于",
    icon: "◇",
    dashArray: "2,2",
  },
  relatedTo: {
    color: "#64748b", // slate
    label: "关联",
    icon: "~",
    dashArray: "10,5",
  },
};

export const CustomEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    selected,
    onDelete,
  }: CustomEdgeProps) => {
    const edgeType = data?.edgeType || "relatedTo";
    const config =
      edgeTypeConfig[edgeType as keyof typeof edgeTypeConfig] || edgeTypeConfig.relatedTo;

    // Calculate bezier path
    const [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    // Calculate midpoint for delete button
    const midX = (sourceX + targetX) / 2;
    const midY = (sourceY + targetY) / 2;

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      const deleteFn = data?.onDelete || onDelete;
      if (deleteFn) {
        deleteFn(id);
      }
    };

    return (
      <>
        <g className="group">
          {/* Main edge line */}
          <path
            id={id}
            d={edgePath}
            stroke={selected ? config.color : `${config.color}80`}
            strokeWidth={selected ? 3 : 2}
            strokeDasharray={config.dashArray || undefined}
            fill="none"
            className="transition-all duration-200"
          />

          {/* Selection glow */}
          {selected && (
            <path
              d={edgePath}
              stroke={config.color}
              strokeWidth={6}
              strokeOpacity={0.3}
              fill="none"
              className="animate-pulse"
            />
          )}

          {/* Arrow marker at target */}
          <defs>
            <marker
              id={`arrow-${config.color.replace("#", "")}`}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M0,0 L0,6 L9,3 z"
                fill={config.color}
              />
            </marker>
          </defs>

          {/* Arrow path */}
          <path
            d={edgePath}
            stroke="none"
            fill="none"
            markerEnd={`url(#arrow-${config.color.replace("#", "")})`}
            style={{ pointerEvents: "none" }}
          />
        </g>

        {/* Delete button - shown on hover or selection */}
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${midX}px,${midY}px)`,
              pointerEvents: "all",
            }}
            className={`transition-opacity duration-200 ${
              selected || document.querySelector(`[data-edgeid="${id}"]`)?.matches(":hover")
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <button
              data-edgeid={id}
              onClick={handleDelete}
              className="flex items-center justify-center w-6 h-6 bg-red-500 hover:bg-red-400 text-white rounded-full shadow-lg border-2 border-red-600 transition-colors"
              title="删除关联"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </EdgeLabelRenderer>
      </>
    );
  },
);

CustomEdge.displayName = "CustomEdge";
