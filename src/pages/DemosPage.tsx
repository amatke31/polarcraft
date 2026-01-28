// src/pages/DemosPage.tsx
// Demos Page Component - Interactive simulations and visualizations for polarization concepts

import { useState, useEffect, Suspense } from "react";
import { Link, useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/utils/classNames";

// UI 组件导入
import {
  // Gamepad2,
  // BookOpen,
  // Box,
  // BarChart2,
  Menu,
  X,
  // ChevronDown,
  // ChevronRight,
  // Lightbulb,
  // HelpCircle,
  // Search,
  // GraduationCap,
  ArrowLeft,
} from "lucide-react";
import { PersistentHeader } from "@/components/shared/PersistentHeader";
import { AuthThemeSwitcher } from "@/components/ui/AuthThemeSwitcher";

// 判断是否为移动设备的自定义 Hook
// import { useIsMobile } from "@/hooks/useIsMobile";

// 错误边界组件导入
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

// Optical Basics demos
//import { PolarizationIntroDemo } from '@/feature/demos/unit0/PolarizationIntroDemo'
//import { InteractiveOpticalBenchDemo } from '@/feature/demos/unit0/InteractiveOpticalBenchDemo'
import { PolarizationTypesDemo } from "@/feature/demos/unit0/PolarizationTypesDemo";
import { ElectromagneticWaveDemo } from "@/feature/demos/unit0/ElectromagneticWaveDemo";

// Unit 1 Demo components
import { PolarizationStateDemo } from "@/feature/demos/unit1/PolarizationStateDemo";

// 课程难度层级类型
export type DifficultyLevel = "foundation" | "application" | "research";

// 演示组件属性接口提供难度层级等可选属性
interface DemoComponentProps {
  //difficultyLevel?: DifficultyLevel
}

interface DemoItem {
  id: string;
  titleKey: string;
  unit: number; // 0 = basics
  component: React.ComponentType<DemoComponentProps>;
  descriptionKey: string;
  visualType: "2D" | "3D";
  //difficulty: DifficultyLevel // 可选难度层级
}

// demo item演示列表
const DEMOS: DemoItem[] = [
  // Unit 0 - Optical Basics
  // Unified: 电磁波 + 电磁波谱 (merged into one comprehensive demo)
  {
    id: "em-wave",
    titleKey: "basics.demos.emWave.title",
    unit: 0,
    component: ElectromagneticWaveDemo,
    descriptionKey: "basics.demos.emWave.description",
    visualType: "2D",
    //difficulty: 'foundation', // 电磁波可视化 + 波谱（统一演示）
  },
  // Unified: 偏振类型 + 三偏振片悖论 (merged into one comprehensive demo)
  {
    id: "polarization-types-unified",
    titleKey: "basics.demos.polarizationTypesUnified.title",
    unit: 0,
    component: PolarizationTypesDemo,
    descriptionKey: "basics.demos.polarizationTypesUnified.description",
    visualType: "2D",
    //difficulty: 'application', // 偏振类型 + 三偏振片悖论（统一演示）
  },
  // Unit 1 - Polarization State
  {
    id: "polarization-state",
    titleKey: "demos.polarizationState.title",
    unit: 1,
    component: PolarizationStateDemo,
    descriptionKey: "demos.polarizationState.description",
    visualType: "3D",
    //difficulty: 'foundation', // 3D可视化偏振态,直观理解
  },
];

// 简化的单元配置
const UNITS = [
  {
    num: 0,
    titleKey: "basics.title",
    color: "yellow",
  },
];

// 简化的加载组件
const DemoLoading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div>Loading...</div>
    </div>
  );
};

// 简化的视觉类型徽章
const VisualTypeBadge = ({ type }: { type: "2D" | "3D" }) => {
  return <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-800">{type}</span>;
};

export function DemosPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { demoId: urlDemoId } = useParams<{ demoId?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 简化的移动设备检测
  const isCompact = true;

  // Determine initial demo from URL param or show museum homepage
  const getInitialDemo = (): string | null => {
    // First check path param (/demos/:demoId)
    if (urlDemoId && DEMOS.find((d) => d.id === urlDemoId)) {
      return urlDemoId;
    }
    // Fallback to query param for backwards compatibility
    const queryDemo = searchParams.get("demo");
    if (queryDemo && DEMOS.find((d) => d.id === queryDemo)) {
      return queryDemo;
    }
    // Return null to show museum homepage
    return null;
  };

  const [activeDemo, setActiveDemo] = useState<string | null>(getInitialDemo);
  const [showMuseumHomepage, setShowMuseumHomepage] = useState<boolean>(
    () => getInitialDemo() === null,
  );
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [expandedUnit, setExpandedUnit] = useState<number | null>(0);

  // Handle URL changes for deep linking
  useEffect(() => {
    // If using path param
    if (urlDemoId) {
      const targetDemo = DEMOS.find((d) => d.id === urlDemoId);
      if (targetDemo && activeDemo !== urlDemoId) {
        setActiveDemo(urlDemoId);
        setExpandedUnit(targetDemo.unit);
      }
    }
    // Legacy query param support - redirect to new URL format
    const queryDemo = searchParams.get("demo");
    if (queryDemo) {
      const targetDemo = DEMOS.find((d) => d.id === queryDemo);
      if (targetDemo) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("demo");
        const paramString = newParams.toString();
        navigate(`/demos/${queryDemo}${paramString ? `?${paramString}` : ""}`, { replace: true });
      }
    }
  }, [urlDemoId, searchParams, activeDemo, navigate]);

  const handleDemoChange = (demoId: string) => {
    setActiveDemo(demoId);
    setShowMuseumHomepage(false);

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("unit");
    const paramString = newParams.toString();
    navigate(`/demos/${demoId}${paramString ? `?${paramString}` : ""}`, { replace: true });

    const demo = DEMOS.find((d) => d.id === demoId);
    if (demo) {
      setExpandedUnit(demo.unit);
    }
  };

  const handleShowMuseumHomepage = () => {
    setShowMuseumHomepage(true);
    setActiveDemo(null);
    navigate("/demos", { replace: true });
  };

  const currentDemo = activeDemo ? DEMOS.find((d) => d.id === activeDemo) : null;
  const DemoComponent = currentDemo?.component;

  return (
    <div
      className={cn(
        "min-h-screen",
        theme === "dark" ? "bg-[#0a0a0f] text-gray-200" : "bg-[#f8fafc] text-gray-800",
      )}
    >
      {/* Navigation Header with Persistent Logo */}
      <PersistentHeader
        moduleKey="demos"
        moduleName={t("page.demos.title")}
        variant="glass"
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          isCompact ? "px-3 py-2" : "px-6 py-3",
          theme === "dark"
            ? "bg-slate-900/95 border-b border-cyan-400/20"
            : "bg-white/95 border-b border-cyan-500/20",
        )}
        showSettings={false}
        rightContent={
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Back to Gallery button - only show when viewing a demo */}
            {currentDemo && !showMuseumHomepage && (
              <button
                onClick={handleShowMuseumHomepage}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200",
                  "text-sm font-medium",
                  theme === "dark"
                    ? "text-cyan-400 hover:bg-cyan-400/15 border border-cyan-400/30 hover:border-cyan-400/50"
                    : "text-cyan-600 hover:bg-cyan-100 border border-cyan-500/30 hover:border-cyan-500/50",
                )}
                title={t("museum.backToGallery", "返回演示馆")}
              >
                <ArrowLeft className="w-4 h-4" />
                {!isCompact && <span>{t("museum.backToGallery", "返回演示馆")}</span>}
              </button>
            )}
            {/* Mobile menu button */}
            {isCompact && (
              <button
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  theme === "dark"
                    ? "text-cyan-400 hover:bg-cyan-400/10"
                    : "text-cyan-600 hover:bg-cyan-100",
                )}
              >
                {showMobileSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            {!isCompact && (
              <>
                <Link
                  to="/games"
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    theme === "dark"
                      ? "text-gray-400 hover:text-white hover:bg-cyan-400/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-cyan-100",
                  )}
                >
                  Games
                </Link>
                <Link
                  to="/course"
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg",
                    theme === "dark" ? "text-cyan-400 bg-cyan-400/15" : "text-cyan-600 bg-cyan-100",
                  )}
                >
                  Course
                </Link>
              </>
            )}
            <AuthThemeSwitcher compact />
          </div>
        }
      />

      {/* Main Container */}
      <div className={cn("flex", isCompact ? "pt-[52px]" : "pt-[60px]")}>
        {/* Sidebar - Desktop always visible, Mobile slide-in */}
        <aside
          className={cn(
            "fixed top-0 bottom-0 border-r overflow-y-auto transition-transform duration-300 z-40",
            isCompact
              ? cn(
                  "w-72 left-0",
                  showMobileSidebar ? "translate-x-0" : "-translate-x-full",
                  "pt-14",
                )
              : "w-64 left-0 top-[60px]",
            theme === "dark" ? "bg-slate-900/95 border-cyan-400/10" : "bg-white/95 border-cyan-200",
          )}
        >
          <div className="p-4">
            {UNITS.map((unit) => {
              const unitDemos = DEMOS.filter((d) => d.unit === unit.num);
              const isExpanded = !isCompact || expandedUnit === unit.num;

              return (
                <div
                  key={unit.num}
                  className="mb-3"
                >
                  <button
                    onClick={() =>
                      isCompact && setExpandedUnit(expandedUnit === unit.num ? null : unit.num)
                    }
                    className={cn(
                      "w-full text-[10px] uppercase tracking-wider mb-2 px-2 font-semibold flex items-center gap-2",
                      theme === "dark" ? "text-gray-500" : "text-gray-500",
                      "transition-colors",
                    )}
                  >
                    <span className="text-yellow-400">★</span>
                    <span className="flex-1 text-left">{t("basics.title")}</span>
                  </button>
                  {isExpanded && (
                    <ul className="space-y-0.5">
                      {unitDemos.map((demo) => (
                        <li key={demo.id}>
                          <button
                            onClick={() => {
                              handleDemoChange(demo.id);
                              if (isCompact) setShowMobileSidebar(false);
                            }}
                            className={cn(
                              "w-full flex flex-col gap-1 px-3 py-2 rounded-lg text-sm text-left transition-all duration-200",
                              "hover:translate-x-1 active:scale-[0.98]",
                              activeDemo === demo.id
                                ? theme === "dark"
                                  ? "bg-gradient-to-r from-cyan-400/20 to-blue-400/10 text-cyan-400 border-l-2 border-cyan-400"
                                  : "bg-gradient-to-r from-cyan-100 to-blue-50 text-cyan-700 border-l-2 border-cyan-500"
                                : theme === "dark"
                                  ? "text-gray-400 hover:bg-slate-800/50 hover:text-white"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0",
                                  activeDemo === demo.id
                                    ? theme === "dark"
                                      ? "bg-cyan-400 text-black"
                                      : "bg-cyan-500 text-white"
                                    : theme === "dark"
                                      ? "bg-slate-700 text-gray-400"
                                      : "bg-gray-200 text-gray-500",
                                )}
                              >
                                {unitDemos.indexOf(demo) + 1}
                              </span>
                              <span className="truncate flex-1">{t(demo.titleKey)}</span>
                              <VisualTypeBadge type={demo.visualType} />
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {isCompact && showMobileSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setShowMobileSidebar(false)}
          />
        )}

        {/* Main Content */}
        <main className={cn("flex-1", isCompact ? "ml-0 p-3" : "ml-64 p-6")}>
          {/* Show Gallery Hero when no demo is selected, otherwise show demo content */}
          {showMuseumHomepage || !currentDemo ? (
            <div className="max-w-[1400px] mx-auto space-y-8">
              <div className="text-center py-16">
                <h1 className="text-3xl font-bold mb-4">{t("basics.title", "Optical Basics")}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  {t(
                    "basics.description",
                    "Explore interactive demos to learn about polarization concepts",
                  )}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {DEMOS.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => handleDemoChange(demo.id)}
                      className={cn(
                        "px-6 py-3 rounded-lg border transition-all",
                        theme === "dark"
                          ? "bg-slate-800 text-white border-slate-700 hover:border-cyan-400"
                          : "bg-white text-gray-800 border-gray-200 hover:border-cyan-500",
                      )}
                    >
                      {t(demo.titleKey)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[1400px] mx-auto">
              {/* Title and description */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={cn(
                      "px-2.5 py-1 text-xs rounded-lg border",
                      theme === "dark"
                        ? "bg-gradient-to-r from-cyan-400/20 to-blue-400/20 text-cyan-400 border-cyan-400/30"
                        : "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border-cyan-300",
                    )}
                  >
                    {t("basics.title")}
                  </span>
                  <VisualTypeBadge type={currentDemo?.visualType || "2D"} />
                  <h1
                    className={cn(
                      "text-2xl font-bold",
                      theme === "dark" ? "text-white" : "text-gray-900",
                    )}
                  >
                    {t(currentDemo?.titleKey || "")}
                  </h1>
                </div>
                <p
                  className={cn(
                    theme === "dark" ? "text-gray-400 text-sm" : "text-gray-700 text-sm",
                  )}
                >
                  {t(currentDemo?.descriptionKey || "")}
                </p>
              </div>

              {/* Demo area */}
              <div
                className={cn(
                  "rounded-2xl border overflow-hidden",
                  theme === "dark"
                    ? "bg-gradient-to-br from-slate-900/80 to-slate-800/50 border-cyan-400/20"
                    : "bg-gradient-to-br from-white to-gray-50 border-cyan-200",
                )}
              >
                <div className="p-5 min-h-[550px]">
                  <ErrorBoundary>
                    <Suspense fallback={<DemoLoading />}>
                      {DemoComponent && <DemoComponent />}
                    </Suspense>
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DemosPage;
