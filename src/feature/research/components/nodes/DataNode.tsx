/**
 * Data Node Component
 * 数据节点组件
 *
 * Represents experimental data or measurements
 * 表示实验数据或测量结果
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Database, FileText, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/classNames';

export const DataNode = memo(({ data, selected }: NodeProps) => {
  const dataTypeConfig = {
    observation: {
      icon: <FileText className="w-4 h-4 text-yellow-400" />,
      label: '观察',
      color: 'border-yellow-600',
    },
    calculation: {
      icon: <TrendingUp className="w-4 h-4 text-cyan-400" />,
      label: '计算',
      color: 'border-cyan-600',
    },
    measurement: {
      icon: <Database className="w-4 h-4 text-orange-400" />,
      label: '测量',
      color: 'border-orange-600',
    },
    simulation: {
      icon: <Database className="w-4 h-4 text-purple-400" />,
      label: '仿真',
      color: 'border-purple-600',
    },
  };

  const config = dataTypeConfig[data.dataType as keyof typeof dataTypeConfig] || dataTypeConfig.observation;

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg border-2 min-w-[200px] bg-slate-800 transition-all',
        selected ? 'border-red-500 shadow-lg shadow-red-500/20' : config.color
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-red-500 !border-2 !border-red-400"
      />

      {/* Node Header */}
      <div className="flex items-center gap-2 mb-2">
        <Database className="w-5 h-5 text-red-400" />
        <span className="font-semibold text-white text-sm truncate">
          {data.title?.zh || data.title?.en || '数据'}
        </span>
      </div>

      {/* Data Type Badge */}
      <div className="flex items-center gap-1 mb-2">
        {config.icon}
        <span className="text-xs text-gray-400">{config.label}</span>
        {data.unit && (
          <span className="text-xs text-gray-500">({data.unit})</span>
        )}
      </div>

      {/* Values Preview */}
      {data.values && Object.keys(data.values).length > 0 && (
        <div className="p-2 bg-slate-900/50 rounded mb-2">
          <div className="text-xs text-gray-500 mb-1">数据值</div>
          <div className="text-xs font-mono text-gray-300">
            {Object.entries(data.values)
              .slice(0, 3)
              .map(([key, value]) => (
                <div key={key}>
                  <span className="text-gray-500">{key}:</span>{' '}
                  <span className="text-cyan-400">
                    {typeof value === 'number' ? value.toFixed(3) : String(value)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Uncertainty */}
      {data.uncertainty !== undefined && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>不确定度:</span>
          <span className="font-mono">±{data.uncertainty}</span>
        </div>
      )}

      {/* Source Node Reference */}
      {data.sourceNodeId && (
        <div className="text-xs text-gray-500 mt-2">
          来源: {data.sourceNodeId.slice(0, 8)}...
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-red-500 !border-2 !border-red-400"
      />
    </div>
  );
});

DataNode.displayName = 'DataNode';
