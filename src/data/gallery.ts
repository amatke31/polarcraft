/**
 * Gallery Data Structure
 * 作品展示数据结构
 *
 * 定义学生作品展示平台的类型和数据
 */

// ============================================================
// Types - 类型定义
// ============================================================

/** 媒体类型 */
export type GalleryMediaType =
  | "image" // 图片
  | "video" // 视频
  | "pdf" // PDF 文档
  | "docx" // Word 文档
  | "pptx" // PPT 演示文稿
  | "markdown" // Markdown 文档
  | "matlab" // MATLAB 代码
  | "other"; // 其他

/** 作者信息 */
export interface Author {
  id: string;
  name: LabelI18n;
  avatar?: string;
  role?: LabelI18n; // 学生/教师/研究员
}

/** 实验记录条目 */
export interface RecordEntry {
  id: string;
  date: string; // ISO 日期格式
  title: LabelI18n;
  content: string;
  images?: string[]; // 图片 URL 数组
}

/** 媒体资源 */
export interface GalleryMedia {
  id: string;
  type: GalleryMediaType;
  url: string;
  title: LabelI18n;
  description?: LabelI18n;
  thumbnail?: string;
  duration?: number; // 视频时长（秒）
  fileSize?: number; // 文件大小（字节）
  uploadedAt: string; // ISO 时间格式
}

/** 作品数据 */
export interface GalleryWork {
  id: string;

  // 基本信息
  title: LabelI18n;
  subtitle?: LabelI18n;
  description: LabelI18n;

  // 作者信息
  authors: Author[];

  // 视觉资源
  coverImage: string;
  gallery: string[]; // 展示画廊图片

  // 研究记录
  recordEntries?: RecordEntry[];

  // 媒体资源
  mediaResources: GalleryMedia[];

  // 元数据
  createdAt: string;
  updatedAt: string;
  status: "private" | "public";

  // 统计数据
  views: number;
  likes: number;
}

// ============================================================
// Sample Data - 示例数据
// ============================================================

export const GALLERY_WORKS: GalleryWork[] = [
  // ========================================
  // 作品 1: 洗手液气泡偏振实验
  // ========================================
  {
    id: "bubble-polarization",
    title: { "zh-CN": "洗手液气泡在偏振光下的条纹成因探究" },
    subtitle: { "zh-CN": "三分之七个诸葛亮组" },
    description: {
      "zh-CN":
        "通过观察洗手液气泡在偏振光下的条纹现象，探究其成因并分析偏振光的干涉原理。本实验记录了从装置搭建、现象观察到数据分析的完整研究过程。",
    },
    authors: [
      { id: "author1", name: { "zh-CN": "张三" }, role: { "zh-CN": "学生" } },
      { id: "author2", name: { "zh-CN": "李四" }, role: { "zh-CN": "学生" } },
      { id: "author3", name: { "zh-CN": "王五" }, role: { "zh-CN": "学生" } },
    ],
    coverImage: "/gallery/bubble/IMG_7523.png",
    gallery: [
      "/gallery/bubble/IMG_7523.png",
      "/gallery/bubble/IMG_7524.png",
      "/gallery/bubble/IMG_7525.png",
    ],
    recordEntries: [
      {
        id: "record1",
        date: "2025-01-15",
        title: { "zh-CN": "初次观察" },
        content:
          "将两片偏振片垂直放置，中间形成气泡膜。在白光照射下观察到清晰的彩色条纹，条纹间距随气泡厚度变化呈现规律性分布。发现颜色顺序为红、橙、黄、绿、青、蓝、紫，这与薄膜干涉理论预测一致。",
        images: ["/gallery/bubble/record1.png"],
      },
      {
        id: "record2",
        date: "2025-01-16",
        title: { "zh-CN": "定量测量" },
        content:
          "使用游标卡尺测量不同位置的条纹间距，数据表明条纹间距与气泡厚度呈反比关系。记录了15组数据，绘制了厚度-间距关系图，拟合优度R²=0.96。",
        images: ["/gallery/bubble/record2.png", "/gallery/bubble/record3.png"],
      },
      {
        id: "record3",
        date: "2025-01-17",
        title: { "zh-CN": "理论验证" },
        content:
          "根据薄膜干涉公式 δ=2ndcosθ，计算理论条纹间距并与实测值对比。误差在5%以内，验证了理论的正确性。同时研究了入射角对条纹的影响。",
      },
      {
        id: "record4",
        date: "2025-01-18",
        title: { "zh-CN": "结论与展望" },
        content:
          "本实验成功观察并解释了洗手液气泡在偏振光下的条纹现象。实验结果与理论预测高度吻合。未来可进一步研究不同液体（如肥皂水、油膜）的干涉图案差异。",
      },
    ],
    mediaResources: [
      {
        id: "media1",
        type: "image",
        url: "/gallery/bubble/IMG_7523.png",
        title: { "zh-CN": "条纹照片1" },
        description: { "zh-CN": "偏振光下的气泡条纹特写，清晰显示彩色干涉条纹" },
        uploadedAt: "2025-01-15T10:00:00Z",
      },
      {
        id: "media2",
        type: "image",
        url: "/gallery/bubble/IMG_7524.png",
        title: { "zh-CN": "条纹照片2" },
        description: { "zh-CN": "不同厚度区域的条纹对比" },
        uploadedAt: "2025-01-15T10:05:00Z",
      },
      {
        id: "media3",
        type: "pptx",
        url: "/gallery/bubble/presentation.pptx",
        title: { "zh-CN": "研究报告演示文稿" },
        description: { "zh-CN": "完整的研究报告PPT，包含实验过程、数据分析和结论" },
        uploadedAt: "2025-01-17T14:30:00Z",
      },
      {
        id: "media4",
        type: "pdf",
        url: "/gallery/bubble/report.pdf",
        title: { "zh-CN": "实验报告 PDF" },
        description: { "zh-CN": "详细的实验报告，包含完整的理论推导和数据分析" },
        uploadedAt: "2025-01-18T09:00:00Z",
      },
    ],
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-18T15:30:00Z",
    status: "public",
    views: 156,
    likes: 23,
  },

  // ========================================
  // 作品 2: 糖溶液旋光性研究
  // ========================================
  {
    id: "sugar-rotation",
    title: { "zh-CN": "糖溶液浓度对旋光性的影响研究" },
    subtitle: { "zh-CN": "光学探索小队" },
    description: {
      "zh-CN":
        "研究不同浓度的糖溶液对偏振光旋转角度的影响，验证旋光性与浓度的线性关系，并测量蔗糖的比旋光度。实验采用自制旋光仪，精度达到±0.5°。",
    },
    authors: [
      { id: "author4", name: { "zh-CN": "陈明" }, role: { "zh-CN": "学生" } },
      { id: "author5", name: { "zh-CN": "刘华" }, role: { "zh-CN": "学生" } },
    ],
    coverImage: "/gallery/sugar/cover.png",
    gallery: ["/gallery/sugar/setup.jpg", "/gallery/sugar/measurement.jpg"],
    recordEntries: [
      {
        id: "record5",
        date: "2025-01-10",
        title: { "zh-CN": "仪器搭建" },
        content:
          "使用偏振片、LED光源和量角器搭建简易旋光仪。光源经过起偏器后成为线偏振光，穿过糖溶液管后被检偏器检测，旋转检偏器找到最暗位置即可读出旋转角度。",
        images: ["/gallery/sugar/setup.jpg"],
      },
      {
        id: "record6",
        date: "2025-01-11",
        title: { "zh-CN": "浓度梯度实验" },
        content:
          "配制了5%、10%、15%、20%、25%五种浓度的蔗糖溶液，每种浓度测量3次取平均。溶液长度固定为20cm，测量时温度保持在20°C。",
      },
      {
        id: "record7",
        date: "2025-01-12",
        title: { "zh-CN": "数据分析" },
        content:
          "绘制旋转角度-浓度关系图，得到良好的线性关系（R²=0.998）。计算得到蔗糖的比旋光度为+66.7°·mL/(dm·g)，与标准值+66.5°非常接近。",
        images: ["/gallery/sugar/chart.png"],
      },
    ],
    mediaResources: [
      {
        id: "media5",
        type: "image",
        url: "/gallery/sugar/setup.jpg",
        title: { "zh-CN": "实验装置" },
        description: { "zh-CN": "自制的旋光仪装置" },
        uploadedAt: "2025-01-10T14:00:00Z",
      },
      {
        id: "media6",
        type: "video",
        url: "/gallery/sugar/demo.mp4",
        title: { "zh-CN": "实验演示视频" },
        description: { "zh-CN": "完整的实验操作演示" },
        duration: 180,
        uploadedAt: "2025-01-12T16:00:00Z",
      },
    ],
    createdAt: "2025-01-10T14:00:00Z",
    updatedAt: "2025-01-12T17:00:00Z",
    status: "public",
    views: 98,
    likes: 15,
  },

  // ========================================
  // 作品 3: 液晶显示器偏振原理探究
  // ========================================
  {
    id: "lcd-polarization",
    title: { "zh-CN": "液晶显示器中的偏振现象解析" },
    subtitle: { "zh-CN": "科技探究组" },
    description: {
      "zh-CN":
        "通过拆解废旧液晶显示器，研究其内部偏振片的排列方式和工作原理。利用显微镜观察液晶盒结构，并用偏振片分析不同显示状态下的光偏振变化。",
    },
    authors: [
      { id: "author6", name: { "zh-CN": "周杰" }, role: { "zh-CN": "学生" } },
      { id: "author7", name: { "zh-CN": "吴敏" }, role: { "zh-CN": "学生" } },
      { id: "author8", name: { "zh-CN": "郑强" }, role: { "zh-CN": "学生" } },
    ],
    coverImage: "/gallery/lcd/cover.jpg",
    gallery: [
      "/gallery/lcd/disassembly.jpg",
      "/gallery/lcd/microscope.jpg",
      "/gallery/lcd/polarization.jpg",
    ],
    recordEntries: [
      {
        id: "record8",
        date: "2025-01-08",
        title: { "zh-CN": "显示器拆解" },
        content:
          "小心拆开液晶显示屏，取出背光模组和液晶面板。注意避免损坏玻璃基板。观察发现有两片偏振片，分别位于液晶层两侧。",
        images: ["/gallery/lcd/disassembly.jpg"],
      },
      {
        id: "record9",
        date: "2025-01-09",
        title: { "zh-CN": "偏振片角度测量" },
        content:
          "用检偏器测量两片偏振片的透光轴方向，发现它们相互垂直。这解释了为什么LCD在不通电时是黑的——两片垂直偏振片完全阻挡光线。",
        images: ["/gallery/lcd/polarization.jpg"],
      },
      {
        id: "record10",
        date: "2025-01-09",
        title: { "zh-CN": "显微镜观察" },
        content:
          "在显微镜下观察液晶盒结构，可以看到彩色滤光片阵列和薄膜晶体管。液晶层的厚度约5微米，通过电场可以控制液晶分子的排列方向。",
        images: ["/gallery/lcd/microscope.jpg"],
      },
    ],
    mediaResources: [
      {
        id: "media7",
        type: "image",
        url: "/gallery/lcd/disassembly.jpg",
        title: { "zh-CN": "拆解过程" },
        uploadedAt: "2025-01-08T15:00:00Z",
      },
      {
        id: "media8",
        type: "pptx",
        url: "/gallery/lcd/presentation.pptx",
        title: { "zh-CN": "研究报告PPT" },
        description: { "zh-CN": "LCD偏振原理研究报告" },
        uploadedAt: "2025-01-10T10:00:00Z",
      },
    ],
    createdAt: "2025-01-08T15:00:00Z",
    updatedAt: "2025-01-10T11:00:00Z",
    status: "public",
    views: 203,
    likes: 34,
  },

  // ========================================
  // 作品 4: 反射光的偏振特性研究
  // ========================================
  {
    id: "reflection-polarization",
    title: { "zh-CN": "不同介质表面的反射光偏振度研究" },
    subtitle: { "zh-CN": "光之探索者" },
    description: {
      "zh-CN":
        "研究光线在不同介质表面反射时的偏振特性，测量布儒斯特角，并验证菲涅尔公式。实验使用了玻璃、水、金属等多种介质。",
    },
    authors: [
      { id: "author9", name: { "zh-CN": "孙丽" }, role: { "zh-CN": "学生" } },
      { id: "author10", name: { "zh-CN": "钱伟" }, role: { "zh-CN": "学生" } },
    ],
    coverImage: "/gallery/reflection/cover.jpg",
    gallery: ["/gallery/reflection/setup.jpg", "/gallery/reflection/data.jpg"],
    recordEntries: [
      {
        id: "record11",
        date: "2025-01-05",
        title: { "zh-CN": "实验原理" },
        content:
          "当光从介质表面反射时，反射光的偏振度与入射角有关。在布儒斯特角处，反射光完全为s偏振光（垂直入射面）。理论布儒斯特角θB = arctan(n2/n1)。",
      },
      {
        id: "record12",
        date: "2025-01-06",
        title: { "zh-CN": "测量玻璃的布儒斯特角" },
        content:
          "使用激光器和旋转平台，改变入射角并测量反射光强度。通过检偏器确定反射光偏振度，找到偏振度最大的角度。测得玻璃（n=1.52）的布儒斯特角约为56°，与理论值56.3°非常接近。",
        images: ["/gallery/reflection/setup.jpg"],
      },
      {
        id: "record13",
        date: "2025-01-07",
        title: { "zh-CN": "不同介质对比" },
        content:
          "测量了水（n=1.33）、玻璃（n=1.52）、亚克力（n=1.49）的布儒斯特角，分别为53°、56°、56°，与理论计算值一致。金属表面反射光也有部分偏振，但不遵循布儒斯特定律。",
        images: ["/gallery/reflection/data.jpg"],
      },
    ],
    mediaResources: [
      {
        id: "media9",
        type: "image",
        url: "/gallery/reflection/setup.jpg",
        title: { "zh-CN": "实验装置" },
        uploadedAt: "2025-01-06T14:00:00Z",
      },
      {
        id: "media10",
        type: "pdf",
        url: "/gallery/reflection/report.pdf",
        title: { "zh-CN": "研究报告" },
        uploadedAt: "2025-01-07T16:00:00Z",
      },
    ],
    createdAt: "2025-01-05T14:00:00Z",
    updatedAt: "2025-01-07T17:00:00Z",
    status: "public",
    views: 87,
    likes: 12,
  },

  // ========================================
  // 作品 5: 应力光弹性的可视化
  // ========================================
  {
    id: "photoelasticity",
    title: { "zh-CN": "利用偏振光可视化材料内部应力分布" },
    subtitle: { "zh-CN": "创新实验小组" },
    description: {
      "zh-CN":
        "利用光弹性效应，通过偏振光观察透明材料内部的应力分布。制作了简单的光弹性装置，观察了受力的亚克力板和塑料尺的彩色干涉条纹。",
    },
    authors: [
      { id: "author11", name: { "zh-CN": "林峰" }, role: { "zh-CN": "学生" } },
      { id: "author12", name: { "zh-CN": "黄磊" }, role: { "zh-CN": "学生" } },
      { id: "author13", name: { "zh-CN": "杨阳" }, role: { "zh-CN": "学生" } },
    ],
    coverImage: "/gallery/photoelasticity/cover.jpg",
    gallery: [
      "/gallery/photoelasticity/setup.jpg",
      "/gallery/photoelasticity/stress1.jpg",
      "/gallery/photoelasticity/stress2.jpg",
      "/gallery/photoelasticity/stress3.jpg",
    ],
    recordEntries: [
      {
        id: "record14",
        date: "2025-01-03",
        title: { "zh-CN": "光弹性原理学习" },
        content:
          "某些透明材料（如环氧树脂、聚碳酸酯）在受力时会产生双折射现象，称为光弹性效应。在偏振光场中，应力不同的区域会产生不同的干涉颜色。",
      },
      {
        id: "record15",
        date: "2025-01-04",
        title: { "zh-CN": "装置搭建" },
        content:
          "使用两片偏振片和白光光源搭建平面光弹性装置。两片偏振片可以平行或垂直放置，分别得到明场和暗场图案。",
        images: ["/gallery/photoelasticity/setup.jpg"],
      },
      {
        id: "record16",
        date: "2025-01-04",
        title: { "zh-CN": "实验观察" },
        content:
          "在暗场中观察到清晰的彩色等色线，红色表示应力较小，蓝紫色表示应力较大。对亚克力板施加三点弯曲，可以看到应力集中在加载点和支撑点。",
        images: ["/gallery/photoelasticity/stress1.jpg", "/gallery/photoelasticity/stress2.jpg"],
      },
      {
        id: "record17",
        date: "2025-01-05",
        title: { "zh-CN": "应用拓展" },
        content:
          "用装置观察了塑料尺、眼镜片、光盘等多种透明物品，发现了许多有趣的应力分布图案。这种方法可用于实际工程中的应力分析。",
        images: ["/gallery/photoelasticity/stress3.jpg"],
      },
    ],
    mediaResources: [
      {
        id: "media11",
        type: "image",
        url: "/gallery/photoelasticity/setup.jpg",
        title: { "zh-CN": "实验装置" },
        uploadedAt: "2025-01-04T10:00:00Z",
      },
      {
        id: "media12",
        type: "video",
        url: "/gallery/photoelasticity/demo.mp4",
        title: { "zh-CN": "应力变化视频" },
        description: { "zh-CN": "显示施加力时应力条纹的变化" },
        duration: 60,
        uploadedAt: "2025-01-05T14:00:00Z",
      },
    ],
    createdAt: "2025-01-03T10:00:00Z",
    updatedAt: "2025-01-05T15:00:00Z",
    status: "public",
    views: 175,
    likes: 28,
  },
];

// ============================================================
// Helper Functions - 辅助函数
// ============================================================

/**
 * 根据 ID 获取作品
 */
export function getWorkById(id: string): GalleryWork | undefined {
  return GALLERY_WORKS.find((work) => work.id === id);
}

/**
 * 搜索作品
 */
export function searchWorks(query: string): GalleryWork[] {
  const lowerQuery = query.toLowerCase();
  return GALLERY_WORKS.filter(
    (work) =>
      work.title["zh-CN"].toLowerCase().includes(lowerQuery) ||
      work.description["zh-CN"].toLowerCase().includes(lowerQuery) ||
      work.subtitle?.["zh-CN"].toLowerCase().includes(lowerQuery),
  );
}

/**
 * 获取公开作品列表
 */
export function getPublicWorks(): GalleryWork[] {
  return GALLERY_WORKS.filter((work) => work.status === "public");
}

/**
 * 获取公开作品列表
 */
export function getPrivateWorks(): GalleryWork[] {
  return GALLERY_WORKS.filter((work) => work.status === "private");
}
