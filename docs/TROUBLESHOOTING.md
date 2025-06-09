# 故障排除指南

## 🔧 常见问题解决方案

### 问题 1：Node.js 版本警告

**错误信息：**
```
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@penjc/homepage@1.0.x',
npm WARN EBADENGINE   required: { node: '>=16.0.0', npm: '>=8.0.0' },
npm WARN EBADENGINE   current: { node: 'v16.20.1', npm: '8.19.4' }
}
```

**解决方案：**

现在的版本（0.1.0+）已经修复了这个问题，支持 Node.js 16+：

```bash
# 检查版本
node --version
npm --version

# 更新 Node.js 到最新 LTS 版本
npm install @penjc/homepage@latest
```

如果仍有问题，强制忽略版本警告：
```bash
npx @penjc/homepage create my-homepage
```

### 问题 2：模块路径解析错误

**错误信息：**
```
Module not found: Can't resolve '@/styles/prism-theme.css'
```

**解决方案：**

这个问题已在 v0.1.0 中修复。如果使用旧版本，请：

```bash
# 更新到最新版本
npx @penjc/homepage update

# 或手动修复 app/layout.tsx
# 将 import '@/styles/prism-theme.css'
# 改为 import '../styles/prism-theme.css'
```

### 问题 3：Feed 依赖版本冲突

**错误信息：**
```
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'feed@5.1.0',
npm WARN EBADENGINE   required: { node: '>=20', pnpm: '>=10' },
```

**解决方案：**

已降级 feed 包到兼容版本（v4.2.2）。安装最新版本即可解决：

```bash
npm install @penjc/homepage@latest
```

### 问题 4：TypeScript 配置错误

**错误信息：**
```
Cannot find module '@/...' or its corresponding type declarations
```

**解决方案：**

检查 `tsconfig.json` 中的路径别名配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

或使用相对路径：
```typescript
// 替换 '@/components/...'
import Component from '../components/Component'
```

### 问题 5：依赖安装失败

**错误信息：**
```
npm ERR! peer dep missing
```

**解决方案：**

```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 6：开发服务器无法启动

**错误信息：**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**解决方案：**

```bash
# 查找占用端口的进程
lsof -ti:3000

# 杀死进程
kill -9 $(lsof -ti:3000)

# 或使用不同端口
npm run dev -- -p 3001
```

### 问题 7：构建失败

**错误信息：**
```
Build failed with errors
```

**解决方案：**

1. **检查语法错误**
   ```bash
   npm run lint
   npm run type-check
   ```

2. **清理构建缓存**
   ```bash
   rm -rf .next
   npm run build
   ```

3. **检查环境变量**
   ```bash
   # 确保 .env.local 配置正确
   cat .env.local
   ```

### 问题 8：图片无法加载

**错误信息：**
```
Failed to load image
```

**解决方案：**

1. **检查图片路径**
   ```typescript
   // 确保图片在 public/ 目录下
   <img src="/images/avatar.jpg" alt="Avatar" />
   ```

2. **使用 Next.js Image 组件**
   ```typescript
   import Image from 'next/image'
   
   <Image 
     src="/images/avatar.jpg" 
     alt="Avatar"
     width={100}
     height={100}
   />
   ```

### 问题 9：RSS/Sitemap 生成失败

**错误信息：**
```
Error generating RSS feed
```

**解决方案：**

检查 `site.config.ts` 中的 URL 配置：

```typescript
export const siteConfig = {
  url: "https://yourdomain.com", // 必须是完整的 URL
  // ...
}
```

### 问题 10：CLI 命令无法识别

**错误信息：**
```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/create-homepage
```

**解决方案：**

使用正确的命令格式：

```bash
# ❌ 错误
npx create-homepage my-project

# ✅ 正确
npx @penjc/homepage create my-project
```

## 🆘 获取帮助

如果以上解决方案都无法解决您的问题：

1. **查看详细文档**
   - [README.md](../README.md)
   - [CLI 使用指南](./CLI_USAGE.md)
   - [NPM 包管理指南](./NPM_GUIDE.md)

2. **提交 Issue**
   - [GitHub Issues](https://github.com/penjc/homepage/issues)
   - 请提供完整的错误信息和环境详情

3. **环境信息模板**
   ```bash
   # 收集环境信息
   node --version
   npm --version
   npm list @penjc/homepage
   cat package.json | grep "next"
   ```

## 🔄 版本更新记录

- **v0.1.0**: 初始发布版本，包含完整功能和修复 