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

- head: 标题“偏振光下新世界”
- body: 六个module入口
- bottom: 随机的**光学发展历史**和**偏振知识点**

### 模块入口

- 第一部分: **基础知识**--- 按单元分类放课程ppt以及课程大纲
- 第二部分: (器材设备?-器材分类??)
- 第三部分: **理论计算**--- 理论是什么，公式和**交互实验演示**
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
npm run start:dev    # 以监视模式启动 NestJS 服务器
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

```txt

```
