<div align="center">

# Homepage

</div>

<div align="center">
<img src="https://github.com/penjc/homepage/blob/main/assets/homepage.svg?raw=true" width="200">

[![npm version](https://img.shields.io/npm/v/@penjc/homepage?style=flat-square)](https://www.npmjs.com/package/@penjc/homepage)
[![npm downloads](https://img.shields.io/npm/dm/@penjc/homepage?style=flat-square)](https://www.npmjs.com/package/@penjc/homepage)


**一个现代化、响应式的个人主页模板，支持博客、随笔等功能**

[🚀 快速开始](#-快速开始) • [📖 文档](#-文档) • [🎨 特性](#-特性) • [🌟 演示](https://pengjiancheng.com) • [🤝 贡献](#-贡献)

</div>

---

## ✨ 特性

- 🎨 **现代化设计** - 简约美观的界面设计
- 📱 **完全响应式** - 完美适配桌面端和移动端
- ⚡ **极速性能** - 基于 Next.js 13+ 构建，性能卓越
- 🎯 **SEO 优化** - 内置 SEO 最佳实践
- 📝 **Markdown 支持** - 支持 Markdown 写作，语法高亮
- 🏷️ **标签分类** - 支持文章标签和分类管理
- 🔍 **搜索功能** - 内置文章搜索功能
- 📊 **数据分析** - 集成 Google Analytics
- 🌙 **深色模式** - 支持明暗主题切换
- 🚀 **一键部署** - 支持 Vercel、Netlify 等平台部署
- 📱 **PWA 支持** - 支持离线访问
- 🎭 **动画效果** - 流畅的页面过渡动画

## 🚀 快速开始

### 方式一：使用 npx

```bash
# 创建新项目
npx @penjc/homepage my-website

# 进入项目目录
cd my-website

# 启动开发服务器
npm run dev
```

### 方式二：克隆仓库

```bash
# 克隆仓库
git clone https://github.com/penjc/homepage.git my-website

# 进入项目目录
cd my-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:4000](http://localhost:4000) 查看你的网站。

## 📖 文档

### 🛠️ 开发命令

```bash
npm run dev      # 启动开发服务器 (http://localhost:4000)
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 代码检查
```

### ⚙️ 配置网站

修改 `site.config.example.ts` 为`ste.config.ts`。
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
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    social: {
      linkedin: "https://linkedin.com/in/username",
      twitter: "https://twitter.com/username",
      // ... 更多社交媒体链接
    }
  },
  
  // 导航配置
  navigation: {
    main: [
      { name: "首页", href: "/" },
      { name: "博客", href: "/blog" },
      { name: "随笔", href: "/thoughts" },
      { name: "关于", href: "/about" },
    ],
  }
}
```

### 📝 添加内容

#### 博客文章

在 `content/blog/` 目录下创建 `.md` 文件：

```markdown
---
title: 标题
date: "2025-06-04"
category: "生活"
tags: ["个人主页", "Next.js"]
excerpt: "这是我的第一篇博客文章，欢迎来到我的个人主页！"
readTime: "3分钟"
---

# 文章内容

这里是文章的正文内容...
```

#### 随笔

在 `content/thoughts/` 目录下创建 `.md` 文件：

```markdown
---
date: "2025-06-04"
mood: "🌧️"
tags: ["感悟"]
---

# 随笔内容

这里是随笔的内容...
```

#### 图片资源

将图片文件放在 `public/images/` 目录下，然后在文章中引用：

```markdown
![图片描述](/images/your-image.jpg)
```

## 🚀 部署

### Vercel 部署（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/penjc/homepage)

1. 点击上方按钮
2. 连接你的 GitHub 账户
3. 自动部署完成

### Netlify 部署

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/penjc/homepage)

1. 点击上方按钮
2. 连接你的 GitHub 账户
3. 设置构建命令：`npm run build`
4. 设置发布目录：`.next`

### GitHub Pages 部署

项目内置了 GitHub Actions 工作流，推送到 `main` 分支时会自动部署到 GitHub Pages。

1. 在仓库设置中启用 GitHub Pages
2. 选择 GitHub Actions 作为部署源
3. 推送代码到 `main` 分支即可自动部署

## 🛠️ 技术栈

- **框架**: [Next.js 13+](https://nextjs.org/) - React 全栈框架
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- **图标**: [Heroicons](https://heroicons.com/) + [Lucide React](https://lucide.dev/)
- **动画**: [Framer Motion](https://www.framer.com/motion/) - 生产就绪的动画库
- **内容**: [Markdown](https://www.markdownguide.org/) + [Gray Matter](https://github.com/jonschlinkert/gray-matter)
- **代码高亮**: [Prism.js](https://prismjs.com/)
- **分析**: [Vercel Analytics](https://vercel.com/analytics)

## 📁 项目结构

```
homepage/
├── app/                    # Next.js 13+ App Router
│   ├── about/             # 关于页面
│   ├── blog/              # 博客相关页面
│   ├── thoughts/          # 随笔相关页面
│   └── api/               # API 路由
├── components/            # React 组件
├── content/               # Markdown 内容
│   ├── blog/             # 博客文章
│   └── thoughts/         # 随笔文章
├── lib/                   # 工具函数
├── public/                # 静态资源
├── styles/                # 样式文件
├── site.config.ts         # 网站配置
└── package.json
```

## 🤝 贡献

我们欢迎所有形式的贡献！可参考[贡献指南](CONTRIBUTING.md)指南。

### 如何贡献

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 贡献指南

- 请确保你的代码符合项目的代码规范
- 添加适当的测试
- 更新相关文档
- 确保所有测试通过

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️支持**

Made with ❤️ by [penjc](https://pengjiancheng.com)

</div> 