/**
 * Research Project Page
 * 研究项目页面
 *
 * Displays a single research project with its canvases
 * 显示单个研究项目及其画布
 */

import { useParams, Link, Navigate } from "react-router-dom";
import { Plus, Grid3x3, ArrowLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/utils/classNames";
import { getExampleProjectById } from "@/data/researchExampleProjects";
import { PersistentHeader } from "@/components/shared";

export function ResearchProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { theme } = useTheme();

  // Check if this is an example project
  const isExampleProject = projectId?.startsWith('example-');
  const exampleId = projectId?.replace('example-', '');
  const exampleProject = exampleId ? getExampleProjectById(exampleId) : undefined;

  // Placeholder: In real implementation, fetch project data
  const projectExists = true; // TODO: Check if project exists

  if (!projectExists) {
    return <Navigate to="/lab/projects" replace />;
  }

  const project = exampleProject || {
    id: projectId,
    title: { 'zh-CN': '示例研究项目' },
    description: { 'zh-CN': '这是一个示例研究项目' },
    nodes: [],
    edges: [],
  };

  return (
    <div
      className={cn(
        "min-h-screen",
        theme === "dark"
          ? "bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a2a]"
          : "bg-gradient-to-br from-[#fff5eb] via-[#fef3e2] to-[#fff5eb]"
      )}
    >
      <PersistentHeader
        moduleKey="labGroup"
        moduleNameKey={project.title['zh-CN']}
        variant="glass"
        className={cn("sticky top-0 z-40", theme === "dark" ? "bg-slate-900/80" : "bg-white/80")}
        rightContent={
          <Link
            to="/lab/projects"
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              theme === "dark"
                ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Link>
        }
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Canvas Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2
            className={cn(
              "text-xl font-semibold",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            研究画布
          </h2>
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
              theme === "dark"
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            )}
          >
            <Plus className="w-4 h-4" />
            新建画布
          </button>
        </div>

        {/* Canvas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Canvas */}
          <Link
            to={`/lab/projects/${projectId}/canvases/main`}
            state={isExampleProject ? { exampleProjectId: exampleId } : undefined}
            className={cn(
              "group relative p-6 rounded-xl border-2 transition-all hover:shadow-lg",
              theme === "dark"
                ? "bg-slate-800/50 border-slate-700 hover:border-purple-500"
                : "bg-white border-gray-200 hover:border-purple-400"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={cn(
                  "p-3 rounded-lg",
                  theme === "dark"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-purple-100 text-purple-600"
                )}
              >
                <Grid3x3 className="w-6 h-6" />
              </div>
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  theme === "dark"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-green-100 text-green-600"
                )}
              >
                活跃
              </span>
            </div>
            <h3
              className={cn(
                "text-lg font-semibold mb-2",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              主画布
            </h3>
            <p
              className={cn(
                "text-sm mb-4 line-clamp-2",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}
            >
              {project.description['zh-CN']}
            </p>
            <div
              className={cn(
                "text-xs",
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              )}
            >
              {project.nodes.length} 个节点 · {project.edges.length} 条关系
            </div>
          </Link>
        </div>

        {/* Getting Started Guide */}
        <div className="mt-12 p-6 rounded-xl border-2 border-dashed border-slate-600">
          <h3
            className={cn(
              "text-lg font-semibold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            开始使用
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h4
                  className={cn(
                    "font-medium mb-1",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}
                >
                  创建画布
                </h4>
                <p
                  className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  为您的研究创建一个新的画布
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h4
                  className={cn(
                    "font-medium mb-1",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}
                >
                  添加节点
                </h4>
                <p
                  className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  添加问题、实验、文献等节点
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h4
                  className={cn(
                    "font-medium mb-1",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}
                >
                  建立联系
                </h4>
                <p
                  className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  用有向边连接节点，构建知识网络
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
