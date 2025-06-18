# 评论系统配置指南

本项目支持多种评论系统，你可以在 `site.config.ts` 配置文件中选择其中一种进行配置。评论功能将自动出现在以下页面：

- 博客详情页
- 随笔页
- 项目页
- 书籍页
- 友链页
- 关于页

## 配置方式

**新版本 (推荐)**：在 `site.config.ts` 配置文件中统一配置
**旧版本 (仍支持)**：通过环境变量配置，但建议迁移到配置文件方式

## 支持的评论系统

### 1. Giscus (推荐)

基于 GitHub Discussions 的评论系统，完全免费且功能强大。

**优点：**
- 完全免费
- 基于 GitHub，无需额外服务
- 支持表情回应
- 支持深色模式
- 数据完全由你掌控

**配置步骤：**

1. 确保你的 GitHub 仓库是公开的
2. 在仓库中启用 Discussions 功能
3. 访问 [Giscus 官网](https://giscus.app/)
4. 填写你的仓库信息，获取配置参数
5. 在 `site.config.ts` 文件中配置：

```typescript
export const siteConfig = {
  // ... 其他配置
  
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
      lang: "zh-CN",
      loading: "lazy",
      reactionsEnabled: true,
      emitMetadata: false,
      inputPosition: "bottom",
    },
    
    // 其他评论系统配置保持空白即可
    gitalk: { /* ... */ },
    valine: { /* ... */ },
    waline: { /* ... */ },
  },
  
  // ... 其他配置
};
```

### 2. Gitalk

基于 GitHub Issues 的评论系统。

**优点：**
- 基于 GitHub Issues
- 轻量级
- 支持 Markdown

**缺点：**
- 需要访客登录 GitHub
- 每个页面会创建一个 Issue

**配置步骤：**

1. 在 GitHub 创建一个 OAuth App：
   - 访问 GitHub Settings > Developer settings > OAuth Apps
   - 点击 "New OAuth App"
   - 填写应用信息，注意 Authorization callback URL 填写你的网站域名
2. 获取 Client ID 和 Client Secret
3. 在 `site.config.ts` 文件中配置：

```typescript
comments: {
  enabled: true,
  provider: "gitalk",
  
  gitalk: {
    clientID: "your-client-id",
    clientSecret: "your-client-secret",
    repo: "your-repo",
    owner: "your-username",
    admin: ["admin1", "admin2"],
    language: "zh-CN",
    perPage: 10,
    distractionFreeMode: false,
    pagerDirection: "last",
    createIssueManually: false,
    enableHotKey: true,
  },
  
  // 其他配置...
}
```

### 3. Valine

基于 LeanCloud 的评论系统。

**优点：**
- 无需登录即可评论
- 支持邮件通知
- 支持头像显示

**缺点：**
- 需要注册 LeanCloud 账号
- 国际版可能访问较慢

**配置步骤：**

1. 注册 [LeanCloud 账号](https://console.leancloud.app/)
2. 创建新应用
3. 在应用设置中获取 App ID 和 App Key
4. 在 `site.config.ts` 文件中配置：

```typescript
comments: {
  enabled: true,
  provider: "valine",
  
  valine: {
    appId: "your-app-id",
    appKey: "your-app-key",
    placeholder: "请输入评论内容...",
    avatar: "mp",
    meta: ["nick", "mail", "link"],
    pageSize: 10,
    lang: "zh-CN",
    visitor: true,
    highlight: true,
    recordIP: false,
    enableQQ: true,
    requiredFields: ["nick", "mail"],
  },
  
  // 其他配置...
}
```

### 4. Waline

Valine 的增强版，功能更加丰富。

**优点：**
- 支持多种部署方式
- 功能丰富（点赞、回复、管理后台等）
- 性能更好

**配置步骤：**

1. 部署 Waline 服务端（推荐使用 Vercel）
2. 参考 [Waline 官方文档](https://waline.js.org/)
3. 获取服务器地址后，在 `site.config.ts` 文件中配置：

```typescript
comments: {
  enabled: true,
  provider: "waline",
  
  waline: {
    serverURL: "https://your-waline-server.vercel.app",
    placeholder: "请输入评论内容...",
    avatar: "mp",
    meta: ["nick", "mail", "link"],
    pageSize: 10,
    lang: "zh-CN",
    visitor: true,
    highlight: true,
    recordIP: false,
    enableQQ: true,
    requiredFields: ["nick", "mail"],
  },
  
  // 其他配置...
}
```

## 配置行为说明

评论系统根据 `site.config.ts` 中的配置有以下几种行为：

### 1. 完全禁用评论
```typescript
comments: {
  enabled: false,  // 不显示任何评论相关内容
  // 其他配置会被忽略
}
```

### 2. 启用但配置不完整
```typescript  
comments: {
  enabled: true,
  provider: "giscus",
  giscus: {
    repo: "", // 配置不完整
    // ...
  }
}
```
会显示"评论功能配置不完整"的提示信息。

### 3. 正确配置
```typescript
comments: {
  enabled: true,
  provider: "giscus", 
  giscus: {
    repo: "owner/repo",
    repoId: "repo_id",
    // ... 完整配置
  }
}
```
正常显示评论系统。

### 支持的评论系统
- `"giscus"` - 使用 Giscus 评论系统
- `"gitalk"` - 使用 Gitalk 评论系统  
- `"valine"` - 使用 Valine 评论系统
- `"waline"` - 使用 Waline 评论系统

### 配置优先级
1. **配置文件优先**：优先使用 `site.config.ts` 中的配置
2. **环境变量兜底**：如果配置文件中没有正确配置，会回退检查环境变量

## 自定义样式

评论组件已经适配了网站的深色模式和整体设计风格。如果需要进一步自定义，可以：

1. 修改 `components/Comments.tsx` 中的样式类名
2. 在 `globals.css` 中添加自定义 CSS
3. 针对特定评论系统的样式进行覆盖

## 注意事项

1. **Giscus 推荐**：对于大多数个人博客，推荐使用 Giscus，因为它完全免费且功能强大
2. **配置方式**：现在推荐在 `site.config.ts` 中配置，但仍支持环境变量方式（配置文件优先级更高）
3. **敏感信息**：如使用环境变量，记得将 `.env.local` 文件添加到 `.gitignore` 中，避免泄露敏感信息
4. **测试**：在生产环境部署前，先在本地测试评论功能是否正常
5. **备份**：建议定期备份评论数据

## 常见问题

**Q: 评论不显示怎么办？**
A: 检查 `site.config.ts` 中的评论配置是否正确，确保 `enabled: true` 且提供商配置完整，查看浏览器控制台是否有错误信息。

**Q: 可以切换评论系统吗？**
A: 可以，但注意不同系统的数据不互通，需要考虑数据迁移问题。

**Q: 评论数据在哪里？**
A: 
- Giscus/Gitalk: GitHub 
- Valine: LeanCloud
- Waline: 你的服务器或托管平台

**Q: 如何管理评论？**
A: 
- Giscus: 在 GitHub Discussions 中管理
- Gitalk: 在 GitHub Issues 中管理  
- Valine: 在 LeanCloud 控制台管理
- Waline: 使用 Waline 管理后台

有其他问题，请查看对应评论系统的官方文档。 