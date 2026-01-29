/**
 * Conclusion Node Component
 * 结论节点组件
 *
 * Represents a research conclusion or finding
 * 表示研究结论或发现
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Lightbulb, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/classNames';
import { CompactMarkdown } from '../shared/MarkdownRenderer';

export const ConclusionNode = memo(({ data, selected }: NodeProps) => {
  // Confidence level color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-500/20 text-green-400 border-green-500';
    if (confidence >= 0.5) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
    return 'bg-red-500/20 text-red-400 border-red-500';
  };

  // Use strict check to handle 0 confidence correctly
  const confidence = data.confidence !== undefined ? data.confidence : 0.5;
  const confidencePercent = Math.round(confidence * 100);

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg border-2 min-w-[220px] bg-slate-800 transition-all',
        selected ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-purple-600'
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-500 !border-2 !border-purple-400"
      />

      {/* Node Header */}
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-purple-400" />
        <span className="font-semibold text-white text-sm truncate">
          {data.title?.zh || data.title?.['zh-CN'] || data.title?.en || '结论'}
        </span>
      </div>

      {/* Description - Markdown rendered */}
      {data.description && (
        <div className="mb-2 text-xs text-gray-300">
          <CompactMarkdown
            content={data.description?.zh || data.description?.['zh-CN'] || data.description?.en || ''}
          />
        </div>
      )}

      {/* Statement - Markdown rendered */}
      {data.statement && (
        <div className="mb-2">
          <CompactMarkdown
            content={data.statement?.zh || data.statement?.['zh-CN'] || data.statement?.en || ''}
          />
        </div>
      )}

      {/* Confidence Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">置信度</span>
        <span
          className={cn(
            'text-xs px-2 py-0.5 rounded-full border',
            getConfidenceColor(confidence)
          )}
        >
          {confidencePercent}%
        </span>
      </div>

      {/* Confidence Bar */}
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
        <div
          className={cn(
            'h-full transition-all',
            confidence >= 0.8 ? 'bg-green-500' : confidence >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
          )}
          style={{ width: `${confidencePercent}%` }}
        />
      </div>

      {/* Evidence Count */}
      {data.evidenceIds && data.evidenceIds.length > 0 && (
        <div className="flex items-center gap-1 mb-2">
          <CheckCircle2 className="w-3 h-3 text-green-400" />
          <span className="text-xs text-gray-400">
            基于 {data.evidenceIds.length} 条证据
          </span>
        </div>
      )}

      {/* Limitations - Markdown rendered */}
      {data.limitations && (
        <div className="p-2 bg-slate-900/50 rounded mb-2">
          <div className="text-xs text-orange-400 mb-1">局限性</div>
          <div className="text-xs text-gray-400">
            <CompactMarkdown
              content={data.limitations?.zh || data.limitations?.['zh-CN'] || data.limitations?.en || ''}
            />
          </div>
        </div>
      )}

      {/* Future Work - Markdown rendered */}
      {data.futureWork && (
        <div className="text-xs text-gray-500">
          <span className="text-blue-400">后续:</span>{' '}
          <CompactMarkdown
            content={data.futureWork?.zh || data.futureWork?.['zh-CN'] || data.futureWork?.en || ''}
          />
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-500 !border-2 !border-purple-400"
      />
    </div>
  );
});

ConclusionNode.displayName = 'ConclusionNode';
