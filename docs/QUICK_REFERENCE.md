# 页面开发快速参考

> 📋 快速查找常用代码片段

## 目录

- [页面骨架](#页面骨架)
- [常用 Hooks](#常用-hooks)
- [样式模式](#样式模式)
- [数据获取](#数据获取)
- [表单处理](#表单处理)
- [路由导航](#路由导航)
- [条件渲染](#条件渲染)
- [常用组件](#常用组件)

---

## 页面骨架

```tsx
/**
 * PageName - Description
 * 页面名称 - 描述
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/utils/classNames";
import { PersistentHeader } from "@/components/shared";

export function PageName() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={cn("min-h-screen", theme === "dark" ? "bg-slate-900" : "bg-gray-50")}>
      <PersistentHeader moduleKey="key" moduleName="Name" variant="glass" />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 内容 */}
      </main>
    </div>
  );
}

export default PageName;
```

---

## 常用 Hooks

### useTheme

```tsx
const { theme } = useTheme();
// theme: "dark" | "light"
```

### useTranslation

```tsx
const { t, i18n } = useTranslation();
t("key"); // 翻译
i18n.language; // 当前语言
```

### useNavigate

```tsx
const navigate = useNavigate();
navigate("/path");
navigate("/path", { replace: true });
navigate(-1); // 返回上一页
```

### useParams

```tsx
const params = useParams();
const id = params.id; // 获取路由参数
```

### useIsMobile

```tsx
const { isMobile, isTablet } = useIsMobile();
```

### Zustand Store

```tsx
const { data, isLoading, error, fetchData } = useExampleStore();
```

---

## 样式模式

### 主题切换

```tsx
className={cn(
  "base-classes",
  theme === "dark"
    ? "dark:bg-slate-900 dark:text-white"
    : "light:bg-white light:text-gray-900"
)}
```

### 响应式

```tsx
// Tailwind 断点
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// 条件渲染
className={cn(
  "text-base",
  isMobile && "text-sm",
  isTablet && "text-md"
)}
```

### 卡片样式

```tsx
className={cn(
  "rounded-xl p-6 border transition-all hover:-translate-y-1",
  theme === "dark"
    ? "bg-slate-800 border-slate-700 hover:border-slate-500"
    : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
)}
```

### 按钮样式

```tsx
// 主要按钮
className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors"

// 次要按钮
className={cn(
  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
  theme === "dark"
    ? "bg-slate-700 hover:bg-slate-600 text-white"
    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
)}

// 危险按钮
className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
```

### 输入框样式

```tsx
className={cn(
  "w-full px-4 py-2 rounded-lg border transition-colors",
  theme === "dark"
    ? "bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-cyan-500"
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500"
)}
```

---

## 数据获取

### useEffect 模式

```tsx
useEffect(() => {
  fetchData();
}, [fetchData]);
```

### 依赖数组

```tsx
// 仅挂载时执行
useEffect(() => { ... }, []);

// 响应 state 变化
useEffect(() => { ... }, [count]);

// 响应 props 变化
useEffect(() => { ... }, [props.id]);
```

### 清理副作用

```tsx
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

---

## 表单处理

### 受控组件

```tsx
const [formData, setFormData] = useState({
  name: "",
  email: ""
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

<input
  name="name"
  value={formData.name}
  onChange={handleChange}
/>
```

### 表单提交

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await submitData(formData);
    // 成功处理
  } catch (error) {
    // 错误处理
  }
};

<form onSubmit={handleSubmit}>
  {/* 表单字段 */}
  <button type="submit">提交</button>
</form>
```

---

## 路由导航

### 编程式导航

```tsx
// 跳转到新页面
navigate("/courses");

// 带参数跳转
navigate(`/courses/${id}`);

// 替换当前历史记录
navigate("/login", { replace: true });

// 返回上一页
navigate(-1);
```

### Link 组件

```tsx
import { Link } from "react-router-dom";

<Link to="/courses" className="...">
  课程
</Link>
```

### 获取路由参数

```tsx
const params = useParams();
const id = params.id; // /courses/:id
```

---

## 条件渲染

### 三元运算符

```tsx
{isLoading ? <Spinner /> : <Content />}
```

### 逻辑与 (&&)

```tsx
{error && <ErrorMessage error={error} />}
```

### 多条件

```tsx
{!isLoading && data.length === 0 && <EmptyState />}
```

### 早期返回

```tsx
if (isLoading) return <Spinner />;
if (error) return <ErrorPage />;
if (!data) return <NotFound />;

return <MainContent />;
```

---

## 常用组件

### PersistentHeader

```tsx
<PersistentHeader
  moduleKey="courses"
  moduleName="课程管理"
  variant="glass"  // glass | solid
  className="..."
  rightContent={<button>操作</button>}
/>
```

### Tabs

```tsx
const TABS = [
  { id: "tab1", label: { "zh-CN": "标签1" }, icon: <Icon /> },
  { id: "tab2", label: { "zh-CN": "标签2" }, icon: <Icon /> }
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

### 加载状态

```tsx
<div className="animate-pulse flex flex-col items-center gap-4">
  <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
  <span className="text-cyan-500 text-sm">加载中...</span>
</div>
```

### 空状态

```tsx
<div className="text-center py-16">
  <p className={cn("mb-4", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
    暂无数据
  </p>
  <button className="text-cyan-500 hover:text-cyan-600 text-sm">
    创建第一个项目
  </button>
</div>
```

### 错误提示

```tsx
<div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between">
  <span className="text-red-400">{error}</span>
  <button onClick={clearError} className="text-red-400 hover:text-red-300">
    ×
  </button>
</div>
```

---

## 常用工具函数

### cn() - 类名合并

```tsx
import { cn } from "@/utils/classNames";

cn("class1", "class2"); // "class1 class2"
cn("class1", condition && "class2"); // 条件类名
cn("class1", theme === "dark" ? "dark-class" : "light-class");
```

### getLabel() - 国际化标签

```tsx
const getLabel = (label: { "zh-CN"?: string; "en-US"?: string }) => {
  const lang = i18n.language as "zh-CN" | "en-US";
  return label[lang] || label["zh-CN"] || "";
};

// 使用
<h1>{getLabel(item.title)}</h1>
```

---

## 事件处理

### useCallback 模式

```tsx
const handleClick = useCallback((id: string) => {
  navigate(`/detail/${id}`);
}, [navigate]);
```

### 事件类型

```tsx
// 点击事件
const onClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... };

// 输入事件
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... };

// 表单提交
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { ... };
```

### 阻止默认行为

```tsx
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  // 处理逻辑
};
```

---

## 性能优化

### useMemo 缓存计算结果

```tsx
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

### useCallback 缓存函数

```tsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### React.memo 避免重渲染

```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

---

## 调试技巧

### 打印状态

```tsx
useEffect(() => {
  console.log("State changed:", state);
}, [state]);
```

### 错误边界

```tsx
try {
  await fetchData();
} catch (error) {
  console.error("Failed to fetch:", error);
}
```

---

## 图标库 (lucide-react)

```tsx
import {
  Plus, Pencil, Trash2, Search, Filter,
  BookOpen, Film, Image, Video, Link2,
  Settings, User, Home, ArrowLeft, Check
} from "lucide-react";

<Plus className="w-4 h-4" />
<Search className="w-5 h-5" />
```

---

## 快速命令

### 创建新页面

```bash
# 1. 复制模板
cp src/pages/.template.page.tsx src/pages/NewPage.tsx

# 2. 替换占位符
# PageName → NewPage
# 页面中文名称 → 实际名称
# module-name → 模块键

# 3. 添加路由
# 编辑 App.tsx
```

### 添加翻译

```json
{
  "page": {
    "newpage": {
      "title": "页面标题",
      "description": "页面描述"
    }
  }
}
```

---

## 检查清单

新页面完成前检查：

- [ ] 替换所有占位符
- [ ] 添加类型定义
- [ ] 实现数据获取
- [ ] 添加错误处理
- [ ] 测试加载状态
- [ ] 测试空状态
- [ ] 测试暗色/亮色主题
- [ ] 测试响应式布局
- [ ] 添加国际化翻译
- [ ] 配置路由

---

**相关文档：** [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) | [模板文件](.template.page.tsx)
