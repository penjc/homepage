# CLI 使用说明

## 重要提示

⚠️ **必须使用完整的包名** `@penjc/homepage`，不能省略作用域。

## 基本用法

### 创建项目

```bash
# 创建新项目
npx @penjc/homepage my-homepage

# 进入项目
cd my-homepage

# 启动开发服务器
npm run dev
```

### 更新项目

```bash
# 在项目根目录运行（只更新框架文件，保护用户内容）
npx @penjc/homepage update

# 如需更新依赖包，单独运行
npm update
```

**更新说明：**
- `npx @penjc/homepage update` 只更新框架核心文件（app/、components/等）
- 自动保护用户内容（content/、site.config.ts、public/images/）
- 不会强制更新依赖包，避免版本冲突
- 如需更新依赖，可以单独运行 `npm update`
- 创建项目时已自动安装更新工具，无需额外步骤

### 其他命令

```bash
# 显示帮助
npx @penjc/homepage --help

# 显示版本
npx @penjc/homepage --version
```

## 常见错误

### ❌ 错误用法
```bash
# 这些命令会失败
npx homepage update          # ❌ 缺少作用域
homepage update              # ❌ 需要安装全局包
```

### ✅ 正确用法
```bash
# 正确的更新命令
npx @penjc/homepage update   # ✅ 使用完整包名
```

## 快速开始

```bash
# 一行命令创建并启动项目
npx @penjc/homepage my-blog && cd my-blog && npm run dev
```

就这么简单！ 