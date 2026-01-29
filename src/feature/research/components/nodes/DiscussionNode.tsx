/**
 * Discussion Node Component
 * 讨论节点组件
 *
 * Represents a discussion or conversation with comment threads
 * 表示带有评论线程的讨论或对话
 */

import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { MessageSquare, Users, ThumbsUp, Reply, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { cn } from '@/utils/classNames';
import { CompactMarkdown } from '../shared/MarkdownRenderer';
import { useCanvasStore } from '../../stores/canvasStore';

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
  isExpanded?: boolean;
}

export const DiscussionNode = memo(({ id, data, selected }: NodeProps) => {
  const { updateNode } = useCanvasStore();
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Local state for comments - initialized from data.comments
  const [comments, setComments] = useState<Comment[]>(() => (data as any).comments || []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    return `${diffDays}天前`;
  };

  const toggleExpand = (commentId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        author: '我',
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
      };
      // Update local state
      const updatedComments = [...comments, comment];
      setComments(updatedComments);
      // Update node data
      updateNode(id, {
        data: {
          ...data,
          comments: updatedComments,
        },
      });
      setNewComment('');
    }
  };

  const handleSubmitReply = (commentId: string) => {
    if (replyText.trim()) {
      const reply: Comment = {
        id: `reply-${Date.now()}`,
        author: '我',
        content: replyText,
        timestamp: new Date().toISOString(),
        likes: 0,
      };
      // Find the parent comment and add the reply
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      // Update node data
      updateNode(id, {
        data: {
          ...data,
          comments: updatedComments,
        },
      });
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const renderComment = (comment: Comment, depth = 0) => (
    <div
      key={comment.id}
      className={cn(
        'border-l-2 border-cyan-500/30 pl-3',
        depth > 0 && 'ml-2'
      )}
    >
      <div className="flex gap-2">
        {/* Avatar */}
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex-shrink-0 flex items-center justify-center text-xs text-white font-medium">
          {comment.author.charAt(0)}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-white">{comment.author}</span>
            <span className="text-xs text-gray-500">{formatTime(comment.timestamp)}</span>
          </div>

          <div className="text-xs text-gray-300 mb-2">
            <CompactMarkdown content={comment.content} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-cyan-400 transition-colors">
              <ThumbsUp className="w-3 h-3" />
              {comment.likes > 0 && <span>{comment.likes}</span>}
            </button>
            <button
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-cyan-400 transition-colors"
              onClick={() => {
                setReplyingTo(replyingTo === comment.id ? null : comment.id);
                setReplyText('');
              }}
            >
              <Reply className="w-3 h-3" />
              回复
            </button>
            {comment.replies && comment.replies.length > 0 && (
              <button
                onClick={() => toggleExpand(comment.id)}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:underline"
              >
                {expandedComments.has(comment.id) ? (
                  <>
                    <ChevronUp className="w-3 h-3" />
                    收起
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" />
                    {comment.replies.length} 条回复
                  </>
                )}
              </button>
            )}
          </div>

          {/* Reply Input */}
          {replyingTo === comment.id && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="写下你的回复..."
                className="flex-1 px-2 py-1.5 text-xs bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                autoFocus
              />
              <button
                onClick={() => handleSubmitReply(comment.id)}
                className="px-2 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs rounded flex items-center gap-1 transition-colors"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Replies */}
          {comment.replies && expandedComments.has(comment.id) && (
            <div className="mt-2 space-y-2">
              {comment.replies.map((reply) => renderComment(reply, depth + 1))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg border-2 min-w-[280px] bg-slate-800 transition-all max-w-[400px]',
        selected ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-cyan-600'
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-cyan-500 !border-2 !border-cyan-400"
      />

      {/* Node Header */}
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="w-5 h-5 text-cyan-400" />
        <span className="font-semibold text-white text-sm truncate">
          {data.title?.zh || data.title?.['zh-CN'] || data.title?.en || '讨论'}
        </span>
      </div>

      {/* Topic - Markdown rendered */}
      {data.topic && (
        <div className="mb-3 p-2 bg-slate-900/50 rounded">
          <CompactMarkdown
            content={data.topic?.zh || data.topic?.['zh-CN'] || data.topic?.en || ''}
          />
        </div>
      )}

      {/* Participants */}
      {data.participants && data.participants.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-3 h-3 text-cyan-400" />
          <span className="text-xs text-gray-400">
            {data.participants.length} 位参与者
          </span>
          <div className="flex -space-x-1">
            {data.participants.slice(0, 3).map((participant: string, i: number) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border border-cyan-400 flex items-center justify-center text-xs text-white"
                title={participant}
              >
                {participant.charAt(0)}
              </div>
            ))}
            {data.participants.length > 3 && (
              <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs text-gray-400">
                +{data.participants.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Badge */}
      {data.status && (
        <div className="flex items-center gap-2 mb-3">
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded-full border',
              data.status === 'active' && 'bg-green-500/20 text-green-400 border-green-500',
              data.status === 'pending' && 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
              data.status === 'closed' && 'bg-gray-500/20 text-gray-400 border-gray-500'
            )}
          >
            {data.status === 'active' && '进行中'}
            {data.status === 'pending' && '待开始'}
            {data.status === 'closed' && '已结束'}
          </span>
          <span className="text-xs text-gray-500">
            {comments.length} 条评论
          </span>
        </div>
      )}

      {/* Comments Section */}
      <div className="space-y-3 mb-3">
        {comments.length === 0 ? (
          <div className="text-center text-xs text-gray-500 py-2">
            暂无评论，来发表第一条吧！
          </div>
        ) : (
          <>
            {comments.slice(0, expandedComments.has('all') ? comments.length : 2).map((comment) => renderComment(comment))}
            {comments.length > 2 && (
              <button
                onClick={() => toggleExpand('all')}
                className="w-full text-xs text-cyan-400 hover:underline py-1"
              >
                {expandedComments.has('all') ? '收起' : `查看全部 ${comments.length} 条评论`}
              </button>
            )}
          </>
        )}

        {/* New Comment Input */}
        <div className="flex gap-2 pt-2 border-t border-slate-700/50">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="发表评论..."
              className="w-full px-3 py-2 pr-10 text-xs bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className={cn(
              'px-3 py-2 rounded-lg text-white text-xs flex items-center gap-1 transition-colors',
              newComment.trim()
                ? 'bg-cyan-600 hover:bg-cyan-500'
                : 'bg-slate-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <Send className="w-3 h-3" />
            发送
          </button>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-cyan-500 !border-2 !border-cyan-400"
      />
    </div>
  );
});

DiscussionNode.displayName = 'DiscussionNode';
