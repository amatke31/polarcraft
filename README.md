<p align="center">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='80' viewBox='0 0 300 80' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='owl-grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23E91E8C'/%3E%3Cstop offset='100%25' stop-color='%23D91A7D'/%3E%3C/linearGradient%3E%3ClinearGradient id='text-grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2322D3EE'/%3E%3Cstop offset='100%25' stop-color='%2306B6D4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(10, 10)'%3E%3Cpath d='M30 5 Q35 0 40 5 L45 20 Q45 35 40 45 L30 50 L20 45 Q15 35 15 20 L20 5 Q25 0 30 5' fill='url(%23owl-grad)'/%3E%3Ccircle cx='25' cy='18' r='6' fill='white'/%3E%3Ccircle cx='26' cy='18' r='3' fill='%231a1a1a'/%3E%3Ccircle cx='35' cy='18' r='6' fill='white'/%3E%3Ccircle cx='36' cy='18' r='3' fill='%231a1a1a'/%3E%3Cpath d='M30 24 L28 28 L30 27 L32 28 Z' fill='%23D91A7D'/%3E%3Cpath d='M18 25 Q15 30 16 35' stroke='%23D91A7D' stroke-width='3' stroke-linecap='round' fill='none'/%3E%3Cpath d='M42 25 Q45 30 44 35' stroke='%23D91A7D' stroke-width='3' stroke-linecap='round' fill='none'/%3E%3Cpath d='M22 8 L20 3' stroke='%23E91E8C' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M38 8 L40 3' stroke='%23E91E8C' stroke-width='2' stroke-linecap='round'/%3E%3C/g%3E%3Cg transform='translate(75, 0)'%3E%3Ctext x='0' y='28' font-family='Arial, sans-serif' font-size='20' font-weight='700' fill='url(%23text-grad)' letter-spacing='1.5'%3EOPEN%3C/text%3E%3Ctext x='0' y='50' font-family='Arial, sans-serif' font-size='20' font-weight='700' fill='url(%23text-grad)' letter-spacing='1.5'%3EWISDOM%3C/text%3E%3Ctext x='0' y='72' font-family='Arial, sans-serif' font-size='20' font-weight='700' fill='url(%23text-grad)' letter-spacing='1.5'%3ELAB%3C/text%3E%3C/g%3E%3C/svg%3E" alt="Open Wisdom Lab Logo">
</p>

# PolarCraft 开发指南

## 项目概述

PolarCraft 是一款由零一学院开发的，基于偏振光物理的教育类体素解谜游戏。它结合了真实的光学原理（马吕斯定律、双折射、干涉）和 Minecraft 风格的体素玩法。玩家通过操控各种光学组件来操纵偏振光束以解决谜题。

## 如何在项目中贡献代码

> 除了下列工具，你可能还需要AI代码辅助，比如Trae,下载链接为[https://www.trae.cn/](https://www.trae.cn/)

首先你需要一个代码编辑器，如VScode，下载链接是[https://code.visualstudio.com/download](https://code.visualstudio.com/download)，然后需要一个必备的代码管理器git下载链接是[https://cn-git.com/downloads/](https://cn-git.com/downloads/),接下来你需要安装该项目的工具链，首先是node.js，下载链接是[https://nodejs.cn/download/](https://nodejs.cn/download/)，请务必确保这些软件都添加到了路径下，否则可能无法调用指令，如果在终端上可以正确显示上述软件版本

> （具体指令可以参考浏览器搜索(如何查询XXX（工具名称）的版本）或者询问AI）

那么接下来可以在git bash 里克隆远程的github仓库（可以在互联网直接搜索或者询问AI)具体的git要求详见[git工作流](#git工作流)，链接为[https://github.com/amatke31/polarcraft](https://github.com/amatke31/polarcraft)，然后再在该目录下运行[终端指令](#快速命令)，接着你就可以在自己的本地仓库进行下面的修改流程，具体到步骤是：

### 第一步：运行项目，观察效果

- 按照  README\.md中的，尝试安装依赖并运行开发服务器。
- 浏览各个页面，看看是否有明显的错误。

### 第二步：阅读核心代码

- 从入口文件开始，了解应用的启动过程。
- 阅读核心类型定义和核心逻辑。
- 阅读状态管理（stores）和主要页面组件。

### 第三步：尝试修复简单问题

- 如果发现明显的语法错误或类型错误，先修复这些错误。
- 如果发现某个功能不工作，可以针对该功能进行调试。

### 第四步：增加新功能

- 在增加新功能前，确保对相关模块有足够的了解。
- 按照READEME\.md中的开发指南，例如添加新的Demo或新的Block Type，按照指导步骤进行。
- 不论是开发过程还是最后提交PR时,所有人都应遵循[git工作流](#git工作流)中的格式规范

### 第五步：测试与集成

- 为新增功能编写测试，同时考虑为现有核心功能补充测试。
- 如果项目没有CI/CD，考虑设置，以确保每次修改都能通过测试。

## 主要功能

### 主页面入口

- head: 标题"偏振光下新世界"
- body: 六个module入口
- bottom: 随机的**光学发展历史**和**偏振知识点**

### 模块入口

- 第一部分: **基础知识**--- 按单元分类放课程ppt以及课程大纲
- 第二部分: (器材设备?-器材分类??)
- 第三部分: **理论模拟**--- 理论是什么，公式和**交互实验演示**
- 第四部分: (闯关性游戏？MineCraft体素游戏?)
- 第五部分: **成果展示**--- 已完成的作品， 实验报告，新发现
- 第六部分: **虚拟课题**--- 未完成的一些小课题（seperated & piverite用户组私有）

> 实验模拟？（3D的偏振片和2D的彩色胶带?）和 探索性问题（假如把泡泡放进偏振片里?）

## 技术栈

- **前端**：React 19 + TypeScript（严格模式）
- **状态管理**：Zustand（附带 subscribeWithSelector 中间件）
- **路由**：React Router v7
- **样式**：Tailwind CSS v4
- **构建工具**：Vite
- **3D渲染**：Three.js + @react-three/fiber + @react-three/drei
- **实时协作**：Yjs + y-websocket
- **数学/物理**：自研数学库（复数、矩阵、向量）+ 光学计算库（Jones矢阵、几何光学、波动光学）
- **动画**：Framer Motion
- **公式渲染**：KaTeX
- **文档**：react-markdown + remark-gfm
- **国际化**：i18next + react-i18next
- **后端**：Express + TypeScript + MySQL + WebSocket + JWT

## 快速命令

```bash
# 前端
npm install          # 安装依赖
npm run dev          # 启动开发服务器（热重载）
npm run build        # 生产环境构建 (tsc && vite build)
npm run preview      # 预览生产环境构建
npm run test         # 使用 vitest 运行测试
npm run test:run     # 运行一次测试
npm run test:coverage # 运行测试并生成覆盖率报告

# 后端（在 /server 目录中）
cd server
npm install
npm run start:dev    # 以监视模式启动 Express 服务器
npm run build        # 为生产环境构建
```

## Git工作流

**分支策略：**

- 所有开发工作完成后应合并到 `main` 分支
- 从 `main` 分支创建功能分支以开发新功能或修复
- 代码审查/测试后，将功能分支直接合并到 `main`
- 始终保持 `main` 分支为可部署状态

**提交规范：**

- 使用约定式提交格式：`feat:`、`fix:`、`chore:`、`docs:` 等
- 用英文撰写清晰、简洁的提交信息
- 如适用，请引用问题编号

## 文件架构

### 根目录

```txt
polarcraft/
|--public/       # 公共静态资源
|--server/       # 后端服务器
|--src/          # 前端源码
|--docs/         # 项目文档
|--README.md
|--components.json
|--eslint.config.js
|--index.html
|--package-lock.json
|--package.json
|--pnpm-lock.yaml
|--pnpm-workspace.yaml
|--postcss.config.js
|--tailwind.config.js
|--tsconfig.json
|--tsconfig.node.json
|--tsconfig.app.json
|--vercel.json
|--vite.config.ts
`--vitest.config.ts
```

### 前端源码目录 (src/)

```txt
src/
|--__test__/           # 测试配置
|--assets/             # 静态资源（字体、图标等）
|--components/         # 通用可复用组件
|   |--icons/         # 自定义 SVG 图标
|   |--shared/        # 跨模块共享的 UI 组件
|   |   |--Footer.tsx              # 页脚组件
|   |   |--MathRenderer.tsx        # 数学公式渲染器
|   |   |--MathText.tsx            # 数学文本组件
|   |   |--PersistentHeader.tsx    # 持久化头部
|   |   |--SearchFilter.tsx        # 搜索过滤器
|   |   |--SecureVideoPlayer.tsx   # 安全视频播放器
|   |   `--SEO.tsx                 # SEO 优化组件
|   `--ui/            # 基础 UI 组件
|--contexts/           # React Context
|   |--AuthContext.tsx     # 认证状态管理
|   |--SystemContext.tsx   # 系统状态管理
|   `--ThemeContext.tsx    # 主题切换
|--data/               # 静态数据文件
|   |--courses.ts                  # 课程结构数据
|   |--gallery.ts                  # 画廊作品数据
|   |--scientist-network.ts        # 科学家网络数据
|   |--timeline-events.ts          # 时间线数据
|   |--chronicles-constants.ts     # 编年史常量数据
|   |--concept-network.ts          # 概念网络数据
|   |--course-event-mapping.ts     # 课程事件映射
|   |--cultural-creations.ts       # 文化创意数据
|   |--psrt-curriculum.ts          # 课程大纲数据
|   |--resource-gallery.ts         # 资源画廊数据
|   `--researchExampleProjects.ts  # 研究示例项目
|--feature/            # 功能模块（按业务模块组织）
|   |--course/        # 课程学习模块
|   |   |--chronicles/   # 光学史时间线组件
|   |   |--CourseViewer.tsx  # 课程查看器
|   |   `--PdfViewer.tsx     # PDF查看器
|   |--demos/         # 理论模拟模块
|   |   |--components/ # 演示控件和UI
|   |   |--DemoControls.tsx # 演示控制面板
|   |   |--unit0/     # 第0单元演示实现
|   |   |   |--BrewsterAngleDemo.tsx       # 布鲁斯特角演示
|   |   |   |--ElectromagneticWaveDemo.tsx # 电磁波演示
|   |   |   `--PolarizationTypesDemo.tsx   # 偏振类型演示
|   |   |--unit1/     # 第1单元演示实现
|   |   |   `--ColorStateDemo.tsx          # 色偏振演示
|   |   |--unit2/     # 第2单元演示实现
|   |   `--unit3/     # 第3单元演示实现
|   |--devices/       # 光学器件模块
|   |--gallery/       # 成果展示模块
|   |   |--card/      # 作品卡片
|   |   |--detail/    # 作品详情页
|   |   |--media/     # 媒体画廊
|   |   |--record/    # 成就记录
|   |   |--WorksGrid.tsx       # 作品网格
|   |   `--CulturalShowcase.tsx # 文化创意展示
|   |--games/         # 游戏挑战模块
|   |   |--EscapePage.tsx    # 密室逃脱
|   |   `--Minecraft/        # 体素游戏模块
|   |       |--block-helpers/      # 方块辅助函数
|   |       |--block-renderers/    # 方块渲染器
|   |       |--GameCanvas.tsx      # 游戏画布
|   |       |--LightBeams.tsx      # 光束效果
|   |       |--MinecraftPage.tsx   # 体素游戏主页
|   |       |--Scene.tsx           # 场景管理
|   |       |--SelectionBox.tsx    # 选择框
|   |       |--block-registry.ts   # 方块注册表
|   |       |--Blocks.tsx          # 方块定义
|   |       `--index.ts            # 模块导出
|   |--lab/           # 虚拟实验室模块（待完善）
|   |--profile/       # 用户资料模块
|   |   `--components/  # 资料相关组件
|   `--research/      # 虚拟课题组模块
|       |--components/
|       |   |--canvas/    # 研究画布（React Flow）
|       |   |--edges/     # 自定义边组件
|       |   |--nodes/     # 节点类型（6种）
|       |   |--panels/    # 详情面板
|       |   |--project/   # 项目管理
|       |   `--shared/    # Markdown编辑器
|       |--stores/        # 画布状态管理
|       |   `--canvasStore.ts   # 研究画布状态
|       |--pages/         # 研究页面
|       `--types/         # TypeScript 类型定义
|--hooks/              # 自定义 React Hooks
|   |--useHapticAudio.ts           # 触觉音频 Hook
|   |--useIsMobile.ts              # 移动端检测 Hook
|   `--usePolarizationSimulation.ts # 偏振模拟 Hook
|--i18n/               # 国际化配置
|--lib/                # 核心工具库
|   |--math/          # 数学库
|   |   |--Complex.ts              # 复数运算（已测试）
|   |   |--Complex.test.ts         # 复数单元测试
|   |   |--Matrix2x2.ts            # 2x2矩阵（已测试）
|   |   |--Matrix2x2.test.ts       # 矩阵单元测试
|   |   |--Vector3.ts              # 3D向量（已测试）
|   |   |--Vector3.test.ts         # 向量单元测试
|   |   |--index.ts                # 数学库导出
|   |   `--TESTING_ENHANCEMENT_PLAN.md # 测试计划
|   |--physics/       # 物理计算库
|   |   |--GeometricOptics.ts      # 几何光学
|   |   |--JonesCalculus.ts        # Jones矢阵计算
|   |   |--LightPhysics.ts         # 光学物理（主模块）
|   |   |--WaveOptics.ts           # 波动光学
|   |   |--Saccharimetry.ts        # 旋光计算
|   |   |--OpticsConstants.ts      # 光学常数
|   |   `--unified/                # 统一物理接口
|   |--api.ts                      # API 客户端
|   |--auth.service.ts             # 认证工具
|   |--profile.service.ts          # 用户资料服务
|   |--research.service.ts         # 研究相关服务
|   |--logger.ts                   # 日志工具
|   |--storage.ts                  # 本地存储
|   |--password.util.ts            # 密码工具函数
|   |--types.ts                    # 共享类型定义
|   |--World.ts                    # 3D 世界管理
|   `--README.md                   # 工具库文档
|--pages/              # 主页面组件（路由层）
|   |--index.ts          # 页面导出
|   |--HomePage.tsx       # 首页（六个模块入口）
|   |--CoursesPage.tsx    # 模块一：课程历史
|   |--DevicesPage.tsx    # 模块二：光学器件
|   |--DemosPage.tsx      # 模块三：理论模拟
|   |--GamesPage.tsx      # 模块四：游戏挑战
|   |--GalleryPage.tsx    # 模块五：成果展示
|   |--LabPage.tsx        # 模块六：虚拟实验室
|   |--ProfilePage.tsx    # 用户资料页
|   |--AboutPage.tsx      # 关于页面
|   |--LoginPage.tsx      # 登录页面
|   `--RegisterPage.tsx   # 注册页面
|--stores/             # Zustand 状态管理
|   |--authDialogStore.ts  # 认证对话框状态
|   |--profileStore.ts     # 用户资料状态
|   `--game/              # 游戏状态存储
|       |--gameAction.ts  # 游戏动作
|       `--gameStore.ts   # 游戏状态
|--test/               # 测试文件
|--types/              # TypeScript 类型定义
|   |--i18n.d.ts
|   `--research.ts    # 研究画布类型
|--utils/              # 工具函数
|   `--classNames.ts  # 类名工具
|--App.tsx             # 应用入口（路由配置）
|--App.css             # 应用样式
|--index.css           # 全局样式
|--main.tsx            # React 入口
`--vite-env.d.ts       # Vite 环境类型
```

### 后端目录 (server/)

```txt
server/
|--src/
|   |--config/          # 配置文件
|   |   `--index.ts     # 数据库和服务配置
|   |--controllers/     # 路由控制器
|   |   |--auth.controller.ts        # 认证控制器
|   |   |--user.controller.ts        # 用户控制器
|   |   |--profile.controller.ts     # 资料控制器
|   |   `--research.controller.ts    # 研究控制器
|   |--database/        # 数据库设置和迁移
|   |--middleware/      # Express 中间件
|   |--models/          # 数据模型
|   |--routes/          # API 路由
|   |   |--auth.routes.ts           # 认证路由
|   |   |--user.routes.ts           # 用户路由
|   |   |--profile.routes.ts        # 资料路由
|   |   |--research.routes.ts       # 研究路由
|   |   `--index.ts                 # 路由汇总
|   |--services/        # 业务逻辑
|   |   |--auth.service.ts          # 认证服务
|   |   |--user.service.ts          # 用户服务
|   |   |--token.service.ts         # 令牌服务（JWT）
|   |   |--email.service.ts         # 邮件服务
|   |   `--captcha.service.ts       # 验证码服务
|   |--types/           # TypeScript 类型定义
|   |--utils/           # 工具函数
|   `--index.ts         # 服务器入口
|--package.json
`--tsconfig.json
```

### 静态资源目录 (public/)

```txt
public/
|--courses/                # 课程资源
|   |--unit1/             # 单元1：偏振光的基本概念
|   |--unit2/             # 单元2：光的偏振
|   |--unit3/             # 单元3：偏振光的应用
|   `--unit4/             # 单元4：高级应用
|--gallery/                # 学员作品展示
|   `--bubble/            # 气泡相关作品
|--images/                 # 通用图片资源
|   |--brewster/          # 布鲁斯特角相关图片
|   |--calcite/           # 方解石相关图片
|   |--chromatic-polarization/  # 色散偏振图片
|   |--optical-rotation/  # 旋光现象图片
|   |--scattering/        # 散射相关图片
|   |--combined-logo.png        # 彩色组合 Logo
|   `--combined-logo-white.png  # 白色组合 Logo
`--videos/                 # 视频文件
    `--chromatic-polarization/  # 色散偏振视频
```
