/**
 * Literature Node Component
 * 文献节点组件
 *
 * Represents a literature reference or citation
 * 表示文献引用或参考资料
 */

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { BookOpen, ExternalLink } from 'lucide-react';
import { cn } from '@/utils/classNames';
import { CompactMarkdown } from '../shared/MarkdownRenderer';

export const LiteratureNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg border-2 min-w-[200px] bg-slate-800 transition-all',
        selected ? 'border-green-500 shadow-lg shadow-green-500/20' : 'border-green-600'
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-green-500 !border-2 !border-green-400"
      />

      {/* Node Header */}
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-green-400" />
        <span className="font-semibold text-white text-sm truncate">
          {data.title?.zh || data.title?.['zh-CN'] || data.title?.en || '文献'}
        </span>
      </div>

      {/* Authors */}
      {data.authors && data.authors.length > 0 && (
        <div className="text-xs text-gray-400 mb-2">
          {data.authors.slice(0, 3).join(', ')}
          {data.authors.length > 3 && ' 等'}
        </div>
      )}

      {/* Summary - Markdown rendered */}
      {data.summary && (
        <div className="mb-2">
          <CompactMarkdown
            content={data.summary?.zh || data.summary?.['zh-CN'] || data.summary?.en || ''}
          />
        </div>
      )}

      {/* Year Badge */}
      {data.year && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
            {data.year}
          </span>

          {/* DOI/URL Link */}
          {(data.doi || data.url) && (
            <a
              href={data.url || `https://doi.org/${data.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* Key Findings - Markdown rendered */}
      {data.keyFindings && (data.keyFindings.zh || data.keyFindings.en || data.keyFindings['zh-CN']) && (
        <div className="p-2 bg-slate-900/50 rounded">
          <div className="text-xs text-green-400 mb-1">关键发现</div>
          <div className="text-xs text-gray-300">
            <CompactMarkdown
              content={(data.keyFindings.zh || data.keyFindings['zh-CN'] || data.keyFindings.en || [])[0] || ''}
            />
          </div>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-green-500 !border-2 !border-green-400"
      />
    </div>
  );
});

LiteratureNode.displayName = 'LiteratureNode';
