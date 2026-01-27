/**
 * Course Data Structure
 * 课程数据结构
 *
 * 定义课程内容的类型，包括 PPT、图片、视频等
 * 一个 unit 对应一节课
 */

// ============================================================
// Types - 类型定义
// ============================================================

/** 媒体类型 */
export type MediaType = "pptx" | "image" | "video" | "pdf";

/** 单个媒体资源 */
export interface MediaResource {
  id: string;
  type: MediaType;
  /** 媒体 URL 或本地路径 */
  url: string;
  /** 媒体标题 */
  title: LabelI18n;
  /** 媒体描述 */
  description: LabelI18n;
  /** 持续时间（秒，用于视频） */
  duration?: number;
}

/** 课程数据 */
export interface CourseData {
  id: string;
  /** 课程 ID（对应 psrt-curriculum.ts 中的单元 ID） */
  unitId: string;
  /** 课程标题 */
  title: LabelI18n;
  /** 课程描述 */
  description: LabelI18n;
  /** 课程封面图 */
  coverImage?: string;
  /** 课程颜色 */
  color: string;
  /** 媒体资源列表 */
  media: MediaResource[];
  /** 最后更新时间 */
  lastUpdated: string;
}

// ============================================================
// Course Data - 课程数据
// ============================================================

export const COURSE_DATA: CourseData[] = [
  // ========================================
  // Course 1
  // ========================================
  {
    id: "course1",
    unitId: "course1",
    title: { "zh-CN": "冰洲石和布儒斯特实验介绍" },
    description: { "zh-CN": "介绍冰洲石和布儒斯特实验的基本原理和实验过程。" },
    color: "#C9A227",
    lastUpdated: "2025-01-15",
    media: [
      {
        id: "course1-1-pdf",
        type: "pdf",
        url: "/courses/unit1/第一单元——冰洲石和布儒斯特实验介绍.pdf",
        title: { "zh-CN": "冰洲石和布儒斯特实验介绍" },
        description: { "zh-CN": "冰洲石和布儒斯特实验介绍" },
      },
      {
        id: "course1-1-ppt",
        type: "pptx",
        url: "/courses/unit1/第一单元——冰洲石和布儒斯特实验介绍.pptx",
        title: { "zh-CN": "冰洲石和布儒斯特实验介绍" },
        description: { "zh-CN": "冰洲石和布儒斯特实验介绍" },
      },
      {
        id: "course1-2-ppt",
        type: "pptx",
        url: "/courses/unit1/偏振光2.pptx",
        title: { "zh-CN": "偏振光2" },
        description: { "zh-CN": "偏振光2" },
      },
    ],
  },
];

// ============================================================
// Helper Functions - 辅助函数
// ============================================================

/**
 * 根据单元 ID 获取课程数据
 */
export function getCourseByUnitId(unitId: string): CourseData | undefined {
  return COURSE_DATA.find((course) => course.unitId === unitId);
}

/**
 * 获取课程的所有媒体资源
 */
export function getAllMediaForCourse(courseId: string): MediaResource[] {
  const course = COURSE_DATA.find((c) => c.id === courseId);
  if (!course) return [];
  return course.media;
}

/**
 * 根据媒体类型筛选资源
 */
export function filterMediaByType(courseId: string, type: MediaType): MediaResource[] {
  const allMedia = getAllMediaForCourse(courseId);
  return allMedia.filter((media) => media.type === type);
}
