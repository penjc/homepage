# 个人主页

一个简约风格的个人主页模板，支持博客、随笔等功能。

## 快速开始

### 创建项目

```bash
# 创建新项目
npx @penjc/homepage my-homepage

# 进入项目目录
cd my-homepage

# 启动开发服务器
npm run dev
```

### 配置网站

编辑 `site.config.ts` 文件：

```typescript
export const siteConfig = {
  name: "你的名字",
  title: "你的网站标题", 
  description: "网站描述",
  url: "https://your-site.com",
  
  profile: {
    avatar: "/images/avatar.jpg",
    bio: "个人简介",
    email: "your@email.com",
    github: "https://github.com/yourusername"
  }
}
```

### 添加内容

- **博客文章**: 在 `content/blog/` 目录添加 `.md` 文件
- **随笔**: 在 `content/thoughts/` 目录添加 `.md` 文件  
- **图片**: 放在 `public/images/` 目录

### 更新项目

```bash
# 安装依赖
npm i @penjc/homepage

# 在项目根目录运行（更新框架文件，保护用户内容）
npx @penjc/homepage update

# 如需更新依赖包，单独运行
npm update
```

**说明：** 创建项目时已自动安装更新工具，无需额外安装步骤。

## 部署

```bash
# 构建项目
npm run build

# 启动生产服务器  
npm start
```

支持部署到 Vercel、Netlify 等平台。

## 许可证

MIT License 