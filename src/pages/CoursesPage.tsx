/**
 * Chronicles Page - History of Light and Polarization
 * 光的编年史 - 双线叙事：广义光学 + 偏振光
 *
 * Interactive dual-timeline showcasing key discoveries:
 * - Left track: General optics history (核心光学发现)
 * - Right track: Polarization-specific history (偏振光专属旅程)
 */

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
// import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/utils/classNames";
// import { Tabs, Badge, PersistentHeader } from "@/components/shared";
import { Tabs, PersistentHeader } from "@/components/shared";
import { BookOpen, Camera, Film } from "lucide-react";

// Data imports
import { COURSE_DATA } from "@/data/courses";

// Component imports
import { CourseViewer } from "@/components/courses/CourseViewer";

// Visible tabs - reordered: resources (default), timeline, slides, psrt
const TABS = [
  {
    id: "slides",
    label: { "zh-CN": "课程幻灯片" },
    icon: <Film className="w-4 h-4" />,
  },
];

export function CoursesPage() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("slides");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null); // 选中的课程（用于幻灯片查看）

  return (
    <div
      className={cn(
        "min-h-screen",
        theme === "dark"
          ? "bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a2a]"
          : "bg-gradient-to-br from-[#fffbeb] via-[#fef3c7] to-[#fffbeb]",
      )}
    >
      {/* Header with Persistent Logo */}
      <PersistentHeader
        moduleKey="courses"
        moduleName={t("page.courses.title")}
        variant="glass"
        className={cn(
          "sticky top-0 z-40",
          theme === "dark"
            ? "bg-slate-900/80 border-b border-slate-700"
            : "bg-white/80 border-b border-gray-200",
        )}
      />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero section */}
        <div className="text-center mb-8">
          <h2
            className={cn(
              "text-2xl sm:text-3xl font-bold mb-3",
              theme === "dark" ? "text-white" : "text-gray-900",
            )}
          >
            {t("page.courses.title")}
          </h2>
          <p
            className={cn(
              "text-base max-w-3xl mx-auto mb-4",
              theme === "dark" ? "text-gray-400" : "text-gray-600",
            )}
          >
            {t("page.courses.description")}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {activeTab === "slides" && (
          <>
            {selectedCourse ? (
              <CourseViewer
                course={COURSE_DATA.find((c) => c.id === selectedCourse)!}
                onBack={() => setSelectedCourse(null)}
                theme={theme}
              />
            ) : (
              <>
                {/* Course cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {COURSE_DATA.map((course) => {
                    return (
                      <div
                        key={course.id}
                        onClick={() => setSelectedCourse(course.id)}
                        className={cn(
                          "group rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl",
                          theme === "dark"
                            ? "bg-slate-800/50 border-2 border-slate-700 hover:border-slate-500"
                            : "bg-white shadow-sm hover:shadow-lg",
                        )}
                      >
                        {/* Cover Image */}
                        <div className="relative h-40 overflow-hidden">
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${course.color}40 0%, ${course.color}10 100%)`,
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center"
                              style={{ backgroundColor: `${course.color}30` }}
                            >
                              <BookOpen
                                className="w-8 h-8"
                                style={{ color: course.color }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          {/* Title */}
                          <h3
                            className={cn(
                              "text-lg font-bold mb-2 line-clamp-2",
                              theme === "dark" ? "text-white" : "text-gray-900",
                            )}
                          >
                            {course.title[i18n.language]}
                          </h3>

                          {/* Description */}
                          <p
                            className={cn(
                              "text-sm mb-4 line-clamp-2",
                              theme === "dark" ? "text-gray-400" : "text-gray-600",
                            )}
                          >
                            {course.description[i18n.language]}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center gap-4 text-xs">
                            <div
                              className="flex items-center gap-1.5"
                              style={{ color: course.color }}
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <span>
                                {course.media.length} {i18n.t("page.courses.media")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default CoursesPage;
