# 页面模板使用指南

这是一个基于项目现有页面模式提取的通用模板，适用于流水线式开发。

## 模板位置

```
../.template.page.tsx
```

## 快速开始

### 1. 复制模板

```bash
# 创建新页面时，复制模板文件
cp ../.template.page.tsx src/pages/YourNewPage.tsx
```

### 2. 替换占位符

模板中有以下占位符需要替换:

| 占位符 | 替换为 | 说明 |
|--------|--------|------|
| `PageName` | `YourPageName` | 页面组件名称（大驼峰） |
| `页面中文名称` | 实际中文名 | 如：课程管理、用户列表 |
| `Brief description` | 英文描述 | 页面功能的简短英文说明 |
| `module-name` | 模块标识 | 用于 PersistentHeader 的模块键 |
| `page.pagename.*` | i18n 键名 | 国际化翻译键名 |

## 模板结构说明

### 1. 文件头注释

```tsx
/**
 * PageName - Brief description in English
 * 页面中文名称 - 中文描述
 *
 * Detailed description of what this page does
 * 这个页面的详细功能说明
 */
```

### 2. 导入区域（按顺序）

```tsx
// 外部库
import { useState, useEffect, ... } from "react";
import { useNavigate, ... } from "react-router-dom";

// Context & Hooks
import { useTheme } from "@/contexts/ThemeContext";

// 工具函数
import { cn } from "@/utils/classNames";

// 组件
import { PersistentHeader, ... } from "@/components/shared";

// 数据 & Store
import { useExampleStore } from "@/stores/exampleStore";
```

### 3. 类型定义区

```tsx
interface DataItem {
  id: string;
  title: string;
  // ...
}
```

### 4. 常量定义区

```tsx
const TABS = [ ... ];
const DEFAULT_CONFIG = { ... };
```

### 5. 子组件区

```tsx
function SubComponent({ data, onAction }: ComponentProps) {
  // 可复用的UI组件
}
```

### 6. 主组件区

```tsx
export function PageName() {
  // Hooks
  const { theme } = useTheme();

  // State
  const [activeTab, setActiveTab] = useState("tab1");

  // 数据获取
  useEffect(() => { ... }, []);

  // 事件处理
  const handleClick = useCallback(() => { ... }, []);

  // 渲染
  return ( ... );
}
```

## 常见页面类型

### 类型 A：列表页（CRUD）

参考：`AdminCoursesPage.tsx`

```tsx
// 特征：
// - 数据列表展示
// - 新增/编辑/删除操作
// - 筛选和搜索
// - 分页（可选）
```

### 类型 B：详情页

参考：`CourseViewerPage.tsx`

```tsx
// 特征：
// - 根据 URL 参数获取详情
// - 展示单个项目的完整信息
// - 可能包含编辑模式
```

### 类型 C：双轨/多标签页

参考：`CoursesPage.tsx`

```tsx
// 特征：
// - 使用 Tabs 组件切换视图
// - 每个标签页有独立的内容
// - 可能共享数据源
```

### 类型 D：简单重定向页

参考：`LoginPage.tsx`

```tsx
// 特征：
// - useEffect 执行重定向
// - 不渲染任何内容（返回 null）
// - 或打开模态框后重定向
```

## 最佳实践

### 1. 样式规范

**使用 `cn()` 工具函数合并类名：**

```tsx
className={cn(
  "base-class",
  theme === "dark" ? "dark-class" : "light-class",
  condition && "conditional-class"
)}
```

**响应式断点：**

```tsx
// Tailwind 断点
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// 使用 useIsMobile hook
const { isMobile, isTablet } = useIsMobile();
```

### 2. 国际化

**定义翻译键：**

```json
// locales/zh-CN.json
{
  "page": {
    "pagename": {
      "title": "页面标题",
      "description": "页面描述",
      "searchPlaceholder": "搜索..."
    }
  }
}
```

**在组件中使用：**

```tsx
const { t } = useTranslation();
<h1>{t("page.pagename.title")}</h1>
```

### 3. 数据获取模式

```tsx
// 使用 Zustand store
const { data, isLoading, error, fetchData } = useExampleStore();

useEffect(() => {
  fetchData();
}, [fetchData]);
```

### 4. 事件处理

使用 `useCallback` 避免不必要的重渲染：

```tsx
const handleClick = useCallback((id: string) => {
  navigate(`/detail/${id}`);
}, [navigate]);
```

### 5. 加载和错误状态

```tsx
if (isLoading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

if (data.length === 0) {
  return <EmptyState />;
}
```

## 常用组件

### PersistentHeader

```tsx
<PersistentHeader
  moduleKey="courses"      // 模块标识
  moduleName="课程管理"     // 显示名称
  variant="glass"          // glass | solid
  className="..."          // 额外类名
  rightContent={<Button />} // 右侧内容
/>
```

### Tabs

```tsx
const TABS = [
  { id: "tab1", label: { "zh-CN": "标签1" }, icon: <Icon /> },
  { id: "tab2", label: { "zh-CN": "标签2" }, icon: <Icon /> },
];

<Tabs
  tabs={TABS}
  activeTab={activeTab}
  onChange={setActiveTab}
/>
```

### Badge

```tsx
<Badge variant="default">默认</Badge>
<Badge variant="success">成功</Badge>
<Badge variant="warning">警告</Badge>
<Badge variant="error">错误</Badge>
```

## 检查清单

创建新页面时，确保完成以下步骤：

- [ ] 复制模板并重命名文件
- [ ] 替换所有占位符
- [ ] 更新文件头注释
- [ ] 添加必要的类型定义
- [ ] 配置常量和数据
- [ ] 实现数据获取逻辑
- [ ] 添加事件处理函数
- [ ] 更新 i18n 翻译文件
- [ ] 在 `App.tsx` 中添加路由
- [ ] 测试暗色/亮色主题
- [ ] 测试响应式布局
- [ ] 测试加载状态
- [ ] 测试错误处理

## 示例：创建新页面

假设你要创建一个"用户管理"页面：

1. **复制模板**
   ```bash
   cp src/pages/.template.page.tsx src/pages/UsersPage.tsx
   ```

2. **替换占位符**
   - `PageName` → `UsersPage`
   - `页面中文名称` → `用户管理`
   - `Brief description` → `User management page`
   - `module-name` → `users`
   - `page.pagename.*` → `page.users.*`

3. **添加翻译**
   ```json
   {
     "page": {
       "users": {
         "title": "用户管理",
         "description": "管理系统用户",
         "empty": "暂无用户"
       }
     }
   }
   ```

4. **添加路由**
   ```tsx
   // App.tsx
   <Route path="/users" element={<UsersPage />} />
   ```

## 进阶技巧

### 1. 自定义 Hooks

如果逻辑复杂，提取为自定义 Hook：

```tsx
// hooks/useUserData.ts
export function useUserData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 获取数据逻辑
  }, []);

  return { data, isLoading };
}
```

### 2. 性能优化

```tsx
// 使用 useMemo 缓存计算结果
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);

// 使用 useCallback 缓存函数
const handleClick = useCallback((id) => {
  // 处理逻辑
}, [依赖项]);
```

### 3. 表单处理

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

## 相关文件

- 模板文件：[src/pages/.template.page.tsx](.template.page.tsx)
- 示例页面：
  - 列表页：[src/pages/admin/AdminCoursesPage.tsx](admin/AdminCoursesPage.tsx)
  - 详情页：[src/pages/CourseViewerPage.tsx](CourseViewerPage.tsx)
  - 标签页：[src/pages/CoursesPage.tsx](CoursesPage.tsx)

## 问题反馈

如果遇到问题或需要改进模板，请联系团队负责人。
