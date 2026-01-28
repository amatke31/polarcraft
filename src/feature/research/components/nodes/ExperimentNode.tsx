/**
 * Experiment Node Component
 * 实验节点组件
 *
 * Represents an experiment or simulation
 * 表示实验或仿真
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { FlaskConical, Play, CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/utils/classNames';
import { CompactMarkdown } from '../shared/MarkdownRenderer';

export const ExperimentNode = memo(({ data, selected }: NodeProps) => {
  const statusConfig = {
    pending: {
      icon: <Clock className="w-4 h-4 text-gray-400" />,
      color: 'border-gray-600',
      bg: 'bg-gray-600/10',
      text: '待执行',
    },
    running: {
      icon: <Play className="w-4 h-4 text-blue-400 animate-pulse" />,
      color: 'border-blue-600',
      bg: 'bg-blue-600/10',
      text: '运行中',
    },
    completed: {
      icon: <CheckCircle className="w-4 h-4 text-green-400" />,
      color: 'border-green-600',
      bg: 'bg-green-600/10',
      text: '已完成',
    },
    failed: {
      icon: <XCircle className="w-4 h-4 text-red-400" />,
      color: 'border-red-600',
      bg: 'bg-red-600/10',
      text: '失败',
    },
  };

  const currentStatus = statusConfig[data.status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg border-2 min-w-[220px] bg-slate-800 transition-all',
        selected ? 'border-blue-500 shadow-lg shadow-blue-500/20' : currentStatus.color
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 !border-2 !border-blue-400"
      />

      {/* Node Header */}
      <div className="flex items-center gap-2 mb-2">
        <FlaskConical className="w-5 h-5 text-blue-400" />
        <span className="font-semibold text-white text-sm truncate">
          {data.title?.zh || data.title?.['zh-CN'] || data.title?.en || '实验'}
        </span>
        {currentStatus.icon}
      </div>

      {/* Description - Markdown rendered */}
      {data.description && (
        <div className="mb-2">
          <CompactMarkdown
            content={data.description?.zh || data.description?.['zh-CN'] || data.description?.en || ''}
          />
        </div>
      )}

      {/* Linked Demo */}
      {data.linkedDemo && (
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs text-cyan-400">演示:</span>
          <span className="text-xs text-gray-300">{data.linkedDemo}</span>
        </div>
      )}

      {/* Result Preview */}
      {data.resultSnapshot && (
        <div className={cn('p-2 rounded mb-2', currentStatus.bg)}>
          <div className="flex items-center gap-1 mb-1">
            <CheckCircle className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">结果已保存</span>
          </div>
          <div className="text-xs text-gray-500">
            {new Date(data.resultSnapshot.timestamp).toLocaleString('zh-CN', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      )}

      {/* Assigned Users */}
      {data.assignedTo && data.assignedTo.length > 0 && (
        <div className="flex items-center gap-1 mt-2">
          <div className="flex -space-x-2">
            {data.assignedTo.slice(0, 3).map((userId: string, i: number) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-purple-500 border-2 border-slate-800 flex items-center justify-center text-xs text-white"
                title={`用户: ${userId}`}
              >
                {userId.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
          {data.assignedTo.length > 3 && (
            <span className="text-xs text-gray-500 ml-1">
              +{data.assignedTo.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 !border-2 !border-blue-400"
      />
    </div>
  );
});

ExperimentNode.displayName = 'ExperimentNode';
