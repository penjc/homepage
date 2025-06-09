# 安装使用指南

## 快速开始

### 创建项目

```bash
# 创建新项目
npx @penjc/homepage my-homepage

# 进入项目
cd my-homepage

# 启动开发服务器
npm run dev
```

### 配置网站

编辑 `site.config.ts` 配置你的网站信息。

### 更新项目

```bash
# 在项目目录运行
npx @penjc/homepage update
```

## 常见问题

### 网络问题

如果下载慢，可以使用国内镜像：

```bash
npm config set registry https://registry.npmmirror.com
```

### 清理缓存

如果遇到问题，清理缓存重试：

```bash
npm cache clean --force
npx @penjc/homepage my-homepage
```

## 包信息

- **包名**: `@penjc/homepage`
- **NPM**: https://www.npmjs.com/package/@penjc/homepage
- **GitHub**: https://github.com/penjc/homepage 