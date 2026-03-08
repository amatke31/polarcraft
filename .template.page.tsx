/**
 * PageName - Brief description in English
 * 页面中文名称 - 中文描述
 *
 * Detailed description of what this page does
 * 这个页面的详细功能说明
 */

// ==================== 外部库导入 ====================
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ==================== Context & Hooks ====================
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/useIsMobile";

// ==================== 工具函数 ====================
import { cn } from "@/utils/classNames";

// ==================== 组件导入 ====================
import { PersistentHeader, Tabs, Badge } from "@/components/shared";
import { IconName1, IconName2 } from "lucide-react";

// ==================== 数据 & Store ====================
import { useExampleStore } from "@/stores/exampleStore";
import { EXAMPLE_DATA } from "@/data/example-data";

// ==================== 类型定义 ====================
/**
 * 数据项类型
 */
interface DataItem {
  id: string;
  title: string;
  description?: string;
  [key: string]: any;
}

/**
 * 组件 Props 类型
 */
interface ComponentProps {
  data: DataItem;
  onAction: (id: string) => void;
}

// ==================== 常量定义 ====================
/**
 * 标签页配置
 */
const TABS = [
  { id: "tab1", label: { "zh-CN": "标签1" }, icon: <IconName1 className="w-4 h-4" /> },
  { id: "tab2", label: { "zh-CN": "标签2" }, icon: <IconName2 className="w-4 h-4" /> },
];

/**
 * 默认配置
 */
const DEFAULT_CONFIG = {
  itemsPerPage: 10,
  maxItems: 100,
};

// ==================== 子组件 ====================
/**
 * 子组件 - 用于封装可复用的UI逻辑
 *
 * @param props - 组件属性
 * @returns JSX 元素
 */
function SubComponent({ data, onAction }: ComponentProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "rounded-lg p-4 border transition-all",
        theme === "dark"
          ? "bg-slate-800 border-slate-700 hover:border-slate-600"
          : "bg-white border-gray-200 hover:border-gray-300"
      )}
    >
      <h3
        className={cn(
          "font-semibold mb-2",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}
      >
        {data.title}
      </h3>
      {data.description && (
        <p
          className={cn(
            "text-sm",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}
        >
          {data.description}
        </p>
      )}
      <button
        onClick={() => onAction(data.id)}
        className="mt-3 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors"
      >
        操作按钮
      </button>
    </div>
  );
}

// ==================== 主组件 ====================
/**
 * PageName 主组件
 *
 * @returns JSX 元素
 */
export function PageName() {
  // ==================== Hooks & Context ====================
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const { isMobile, isTablet } = useIsMobile();

  // ==================== Store ====================
  const { data, isLoading, error, fetchData } = useExampleStore();

  // ==================== State ====================
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ==================== 数据获取 ====================
  useEffect(() => {
    // 组件挂载时获取数据
    fetchData();
  }, [fetchData]);

  // ==================== 计算属性 ====================
  /**
   * 过滤后的数据列表
   */
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item: DataItem) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  /**
   * 获取本地化标签
   */
  const getLabel = useCallback(
    (label: { "zh-CN"?: string; "en-US"?: string }) => {
      const lang = i18n.language as "zh-CN" | "en-US";
      return label[lang] || label["zh-CN"] || "";
    },
    [i18n]
  );

  // ==================== 事件处理 ====================
  /**
   * 处理项目点击
   */
  const handleItemClick = useCallback(
    (id: string) => {
      setSelectedId(id);
      navigate(`/detail/${id}`);
    },
    [navigate]
  );

  /**
   * 处理搜索输入
   */
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  /**
   * 处理标签页切换
   */
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  // ==================== 条件渲染辅助函数 ====================
  /**
   * 渲染加载状态
   */
  if (isLoading && !data?.length) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center",
          theme === "dark" ? "bg-slate-900" : "bg-gray-50"
        )}
      >
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-cyan-500 text-sm">加载中...</span>
        </div>
      </div>
    );
  }

  // ==================== 主渲染 ====================
  return (
    <div
      className={cn(
        "min-h-screen",
        theme === "dark"
          ? "bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-black"
          : "bg-gray-50 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100"
      )}
    >
      {/* ==================== 固定顶部栏 ==================== */}
      <PersistentHeader
        moduleKey="module-name"
        moduleName={t("page.pagename.title")}
        variant="glass"
        className={cn(
          "sticky top-0 z-40",
          theme === "dark"
            ? "bg-slate-900/80 border-b border-slate-700"
            : "bg-white/80 border-b border-gray-200"
        )}
      />

      {/* ==================== 主要内容区域 ==================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Section - 页面标题区域 */}
        <div className="text-center mb-8">
          <h2
            className={cn(
              "text-2xl sm:text-3xl font-bold mb-3",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            {t("page.pagename.title")}
          </h2>
          <p
            className={cn(
              "text-base max-w-3xl mx-auto mb-4",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}
          >
            {t("page.pagename.description")}
          </p>
        </div>

        {/* 搜索框 */}
        {searchQuery !== undefined && (
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t("page.pagename.searchPlaceholder") || "搜索..."}
              className={cn(
                "w-full px-4 py-2 rounded-lg border transition-colors",
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-cyan-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500"
              )}
            />
          </div>
        )}

        {/* 标签页 */}
        {activeTab && (
          <div className="mb-6">
            <Tabs tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <span className="text-red-400">{error}</span>
          </div>
        )}

        {/* 内容区域 - 根据 activeTab 渲染不同内容 */}
        {activeTab === "tab1" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item: DataItem) => (
              <SubComponent
                key={item.id}
                data={item}
                onAction={handleItemClick}
              />
            ))}
          </div>
        )}

        {activeTab === "tab2" && (
          <div>
            {/* 第二个标签页的内容 */}
            <p
              className={cn(
                "text-center py-16",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}
            >
              {t("page.pagename.tab2Content") || "标签页2内容"}
            </p>
          </div>
        )}

        {/* 空状态 */}
        {filteredData.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <p
              className={cn(
                "mb-4",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}
            >
              {t("page.pagename.empty") || "暂无数据"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

// ==================== 默认导出 ====================
export default PageName;
