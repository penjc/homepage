---
title: "项目教程"
date: "2025-06-20"
category: "个人主页"
tags: ["Next.js", "个人主页", "安装教程"]
excerpt: "详细介绍如何从零开始安装、配置和启动这个基于 Next.js 的个人主页项目，包括环境要求、安装步骤和配置说明。"
---

# 如何安装和启动个人主页项目

这篇文章将详细介绍如何从零开始安装、配置和启动个人主页模版项目。

## 📋 前置要求

在开始之前，请确保你的开发环境满足以下要求：

### 系统要求
- **操作系统**：Windows 10+、macOS 10.15+、或 Linux
- **Node.js**：版本 18.0.0 或更高
- **npm**：版本 8.0.0 或更高（通常随 Node.js 一起安装）
- **Git**：用于克隆项目和版本控制

### 检查环境
打开终端或命令提示符，运行以下命令检查版本：

```bash
node --version    # 应该显示 v18.0.0 或更高
npm --version     # 应该显示 8.0.0 或更高
git --version     # 确认 Git 已安装
```

如果 Node.js 版本过低，请访问 [Node.js 官网](https://nodejs.org/) 下载最新的 LTS 版本。

## 🚀 快速开始

### 方法一：使用 npx 快速创建（推荐）

这是最简单的方式，一条命令即可创建项目：

```bash
npx @penjc/homepage my-homepage
cd my-homepage
npm run dev
```

### 方法二：从 GitHub 克隆

如果你想要最新的开发版本或想要贡献代码：

```bash
# 克隆项目
git clone https://github.com/penjc/homepage.git
cd homepage

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🔧 详细安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/penjc/homepage.git
cd homepage
```

### 2. 安装依赖

项目使用 npm 作为包管理器，运行以下命令安装所有依赖：

```bash
npm install
```

安装过程可能需要几分钟，取决于网络速度。如果遇到网络问题，可以尝试使用国内镜像：

```bash
npm install --registry=https://registry.npmmirror.com
```

### 3. 配置项目

复制配置文件并进行个性化设置：

```bash
# 复制配置文件
cp site.config.example.ts site.config.ts
```

编辑 `site.config.ts` 文件，修改为你的个人信息：

```typescript
export const siteConfig = {
  // 基本信息
  name: "你的名字",
  title: "你的网站标题", 
  description: "你的网站描述",
  url: "https://your-domain.com",
  
  // 个人信息
  profile: {
    avatar: "/images/avatar.jpg",  // 替换为你的头像
    bio: "你的个人简介",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    // ... 更多配置
  }
}
```

### 4. 添加个人内容

#### 替换头像
将你的头像图片放到 `public/images/` 目录下，命名为 `avatar.jpg`，或者修改配置文件中的路径。

#### 创建第一篇博客
在 `content/blog/` 目录下创建你的第一篇文章：

```bash
# 创建新文章
touch content/blog/my-first-post.md
```

编辑文章内容：

```markdown
---
title: "我的第一篇博客"
date: "2025-01-27"
category: "生活"
tags: ["个人主页", "博客"]
excerpt: "欢迎来到我的个人主页！"
readTime: "2分钟"
---

# 欢迎来到我的个人主页

这是我的第一篇博客文章...
```

### 5. 启动开发服务器

```bash
npm run dev
```

成功启动后，你会看到类似的输出：

```
✓ Ready in 2.1s
✓ Local:    http://localhost:4000
```

打开浏览器访问 `http://localhost:4000` 即可查看你的个人主页。

## 🛠️ 可用脚本

项目提供了多个有用的脚本命令：

```bash
# 开发模式（热重载）
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 预览构建结果
npm run preview

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 📁 项目结构

了解项目结构有助于更好地定制你的主页：

```bash
homepage/
├── app/                    # Next.js 13+ App Router
│   ├── about/             # 关于页面
│   ├── blog/              # 博客相关页面
│   ├── thoughts/          # 随笔页面
│   ├── books/             # 书籍页面
│   ├── friends/           # 友链页面
│   └── projects/          # 项目展示页面
├── components/            # React 组件
├── content/               # Markdown 内容
│   ├── blog/             # 博客文章
│   └── thoughts/         # 随笔文章
├── lib/                   # 工具函数
├── public/                # 静态资源
│   └── images/           # 图片资源
├── styles/                # 样式文件
├── site.config.ts         # 网站配置
└── package.json          # 项目依赖
```

## 🎨 个性化配置

### 修改主题色
编辑 `tailwind.config.js` 文件来自定义主题色：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### 添加项目展示
在 `site.config.ts` 中配置你的项目：

```typescript
projects: {
  enabled: true,
  items: [
    {
      id: "my-project",
      title: "我的项目",
      description: "项目描述",
      image: "/images/projects/my-project.jpg",
      tags: ["React", "TypeScript"],
      github: "https://github.com/username/project",
      demo: "https://project-demo.com",
      status: "active",
      featured: true
    }
  ]
}
```

### 配置评论系统
项目支持多种评论系统，推荐使用 Giscus：

```typescript
comments: {
  enabled: true,
  provider: "giscus",
  giscus: {
    repo: "your-username/your-repo",
    repoId: "your-repo-id",
    category: "General",
    categoryId: "your-category-id",
    mapping: "pathname",
    theme: "preferred_color_scheme",
    lang: "zh-CN"
  }
}
```

## 🚀 部署上线

### Vercel 部署（推荐）
1. 将代码推送到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入你的 GitHub 仓库
4. 自动部署完成

### GitHub Pages 部署
1. 在仓库设置中启用 GitHub Pages
2. 选择 GitHub Actions 作为部署源
3. 推送代码，自动触发部署

### 其他平台
项目也支持部署到 Netlify、AWS、阿里云等平台。

## ❗ 常见问题

### Q: 安装依赖时出现权限错误
**A:** 尝试使用 `sudo` 或配置 npm 权限：
```bash
npm config set prefix ~/.npm-global
```

### Q: 开发服务器启动失败
**A:** 检查端口是否被占用，或使用其他端口：
```bash
npm run dev -- --port 3001
```

### Q: 图片不显示
**A:** 确保图片放在 `public/images/` 目录下，并检查配置文件中的路径。

### Q: 构建失败
**A:** 运行类型检查找出问题：
```bash
npm run type-check
```

## 📚 更多资源

- [项目文档](https://github.com/penjc/homepage/blob/main/README.md)
- [Next.js 官方文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
