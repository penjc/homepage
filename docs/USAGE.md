# Homepage 使用指南

## 快速开始

### 1. 创建项目

使用 npm create 命令创建新项目（推荐）：

```bash
npm create homepage my-website
```

或者使用 npx：

```bash
npx create-homepage my-website
```

### 2. 进入项目目录

```bash
cd my-website
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:4000 查看你的网站。

## 配置网站

### 基本配置

编辑 `site.config.ts` 文件来配置你的网站：

```typescript
export const siteConfig = {
  // 基本信息
  name: "你的名字",
  title: "你的网站标题",
  description: "你的网站描述",
  url: "https://yourdomain.com",
  
  // 个人信息
  profile: {
    avatar: "/images/avatar.jpg",
    bio: "你的个人简介",
    location: "你的位置",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    social: {
      linkedin: "https://linkedin.com/in/username",
      twitter: "https://twitter.com/username",
      // ... 更多社交媒体链接
    }
  }
}
```

### 导航配置

```typescript
navigation: {
  main: [
    { name: "首页", href: "/" },
    { name: "博客", href: "/blog" },
    { name: "随笔", href: "/thoughts" },
    { name: "关于", href: "/about" },
  ],
}
```

## 添加内容

### 博客文章

在 `content/blog/` 目录下创建 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2024-01-15"
description: "文章描述"
tags: ["标签1", "标签2"]
category: "分类"
---

# 文章内容

这里是文章的正文内容...
```

### 随笔

在 `content/thoughts/` 目录下创建 `.md` 文件：

```markdown
---
title: "随笔标题"
date: "2024-01-15"
description: "随笔描述"
---

# 随笔内容

这里是随笔的内容...
```

### 图片资源

将图片文件放在 `public/images/` 目录下，然后在文章中引用：

```markdown
![图片描述](/images/your-image.jpg)
```

## 开发命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 代码检查
```

## 部署

### 构建项目

```bash
npm run build
```

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 部署到 Netlify

1. 将代码推送到 GitHub
2. 在 Netlify 中连接 GitHub 仓库
3. 设置构建命令：`npm run build`
4. 设置发布目录：`.next`

## 自定义样式

项目使用 Tailwind CSS，你可以：

1. 修改 `tailwind.config.js` 来自定义主题
2. 在 `styles/globals.css` 中添加全局样式
3. 在组件中使用 Tailwind 类名

## 常见问题

### Q: 如何修改端口号？

A: 修改 `package.json` 中的 dev 脚本：

```json
"dev": "next dev --port 3000"
```

### Q: 如何添加新页面？

A: 在 `app/` 目录下创建新的文件夹和 `page.tsx` 文件。

### Q: 如何自定义主题颜色？

A: 修改 `tailwind.config.js` 中的颜色配置。

## 技术栈

- **框架**: Next.js 13+
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **图标**: Heroicons + Lucide React
- **动画**: Framer Motion
- **内容**: Markdown + Gray Matter 