/**
 * Problem Node Component
 * 问题节点组件
 *
 * Represents a research question or problem
 * 表示研究问题或疑问
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { HelpCircle, Circle } from 'lucide-react';
import { cn } from '@/utils/classNames';
import { CompactMarkdown } from '../shared/MarkdownRenderer';

export const ProblemNode = memo(({ data, selected }: NodeProps) => {
  const priorityColors = {
    low: 'bg-gray-500/20 text-gray-400 border-gray-500',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500',
    high: 'bg-red-500/20 text-red-400 border-red-500',
  };

  const statusIcons = {
    open: <Circle className="w-3 h-3 text-gray-400" />,
    investigating: <HelpCircle className="w-3 h-3 text-blue-400 animate-pulse" />,
    answered: <Circle className="w-3 h-3 text-green-400 fill-green-400" />,
  };

  const getDescriptionText = () => {
    return data.description?.zh || data.description?.['zh-CN'] || data.description?.en || '';
  };

  const getHypothesisText = () => {
    return data.hypothesis?.zh || data.hypothesis?.['zh-CN'] || data.hypothesis?.en || '';
  };

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg border-2 min-w-[200px] bg-slate-800 transition-all',
        selected ? 'border-amber-500 shadow-lg shadow-amber-500/20' : 'border-amber-600'
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-amber-500 !border-2 !border-amber-400"
      />

      {/* Node Header */}
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-amber-400" />
        <span className="font-semibold text-white text-sm truncate">
          {data.title?.zh || data.title?.['zh-CN'] || data.title?.en || '问题'}
        </span>
        {data.status && statusIcons[data.status as keyof typeof statusIcons]}
      </div>

      {/* Problem Description - Markdown rendered */}
      {getDescriptionText() && (
        <div className="mb-2">
          <CompactMarkdown content={getDescriptionText()} />
        </div>
      )}

      {/* Hypothesis - Markdown rendered */}
      {data.hypothesis && getHypothesisText() && (
        <div className="p-2 bg-slate-900/50 rounded mb-2">
          <div className="text-xs text-blue-400 mb-1">假设</div>
          <div className="text-xs text-gray-300">
            <CompactMarkdown content={getHypothesisText()} />
          </div>
        </div>
      )}

      {/* Priority Badge */}
      {data.priority && (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded-full border',
              priorityColors[data.priority as keyof typeof priorityColors]
            )}
          >
            {data.priority === 'low' && '低优先级'}
            {data.priority === 'medium' && '中优先级'}
            {data.priority === 'high' && '高优先级'}
          </span>

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div className="flex gap-1">
              {data.tags.slice(0, 2).map((tag: string, i: number) => (
                <span key={i} className="text-xs px-1.5 py-0.5 bg-slate-700 rounded text-gray-300">
                  {tag}
                </span>
              ))}
              {data.tags.length > 2 && (
                <span className="text-xs text-gray-500">+{data.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-amber-500 !border-2 !border-amber-400"
      />
    </div>
  );
});

ProblemNode.displayName = 'ProblemNode';
