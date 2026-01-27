import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/classNames";
import { MessageCircle, ThumbsUp, Send } from "lucide-react";
import type { Comment } from "@/data/gallery";
import { formatTimestamp } from "@/data/gallery";

interface CommentSectionProps {
  comments: Comment[];
  workId: string;
}

export function CommentSection({ comments, workId: _workId }: CommentSectionProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState("");

  // 构建评论树（顶级评论 + 回复）
  const topLevelComments = comments.filter((c) => !c.replyTo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    // TODO: 实现评论提交逻辑
    console.log("提交评论:", newComment);
    setNewComment("");
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        theme === "dark" ? "bg-slate-800/50" : "bg-white"
      )}
    >
      <h2
        className={cn(
          "text-xl font-bold mb-6",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}
      >
        {t("works.discussion.title")}
      </h2>

      {/* 评论输入框 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t("works.discussion.placeholder")}
            className={cn(
              "flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2",
              theme === "dark"
                ? "bg-slate-700 border-slate-600 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder-gray-400"
                : "bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-gray-900 placeholder-gray-400"
            )}
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className={cn(
              "px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2",
              "bg-purple-600 text-white hover:bg-purple-700",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Send className="w-4 h-4" />
            {t("works.discussion.send")}
          </button>
        </div>
      </form>

      {/* 评论列表 */}
      <div className="space-y-6">
        {topLevelComments.length === 0 ? (
          <div
            className={cn(
              "text-center py-12",
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            )}
          >
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t("works.discussion.noComments")}</p>
          </div>
        ) : (
          topLevelComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} allComments={comments} />
          ))
        )}
      </div>
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
  allComments: Comment[];
  isReply?: boolean;
}

function CommentItem({ comment, allComments, isReply = false }: CommentItemProps) {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  // 获取该评论的回复
  const replies = allComments.filter((c) => c.replyTo === comment.id);

  return (
    <div className={cn(isReply && "ml-12")}>
      <div
        className={cn(
          "rounded-xl p-4",
          theme === "dark" ? "bg-slate-700/30" : "bg-gray-50"
        )}
      >
        {/* 评论头部 */}
        <div className="flex items-start gap-3">
          {/* 头像 */}
          {comment.authorAvatar ? (
            <img
              src={comment.authorAvatar}
              alt={comment.authorName[i18n.language] || comment.authorName["zh-CN"]}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold",
                "bg-gradient-to-br from-purple-500 to-blue-500"
              )}
            >
              {(comment.authorName[i18n.language] || comment.authorName["zh-CN"])[0]}
            </div>
          )}

          {/* 内容 */}
          <div className="flex-1">
            {/* 作者和时间 */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className={cn(
                  "font-medium",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}
              >
                {comment.authorName[i18n.language] || comment.authorName["zh-CN"]}
              </span>
              <span
                className={cn(
                  "text-xs",
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                )}
              >
                {formatTimestamp(comment.timestamp)}
              </span>
            </div>

            {/* 评论内容 */}
            <p
              className={cn(
                "mb-3",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}
            >
              {comment.content}
            </p>

            {/* 操作按钮 */}
            <div className="flex items-center gap-4">
              <button
                className={cn(
                  "inline-flex items-center gap-1 text-sm transition-colors",
                  theme === "dark"
                    ? "text-gray-400 hover:text-purple-400"
                    : "text-gray-500 hover:text-purple-600"
                )}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{comment.likes}</span>
              </button>
              <button
                className={cn(
                  "text-sm transition-colors",
                  theme === "dark"
                    ? "text-gray-400 hover:text-purple-400"
                    : "text-gray-500 hover:text-purple-600"
                )}
              >
                {t("works.discussion.reply")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 回复列表 */}
      {replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} allComments={allComments} isReply />
          ))}
        </div>
      )}
    </div>
  );
}
