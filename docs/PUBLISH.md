# 发布检查清单

## 发布前检查

### 1. 代码质量检查

```bash
# 类型检查
npm run type-check

# 代码检查
npm run lint
```

### 2. 功能测试

```bash
# 测试创建项目功能
node bin/create-homepage.js --help
node bin/create-homepage.js --version

# 在临时目录测试完整流程
cd /tmp
node /path/to/homepage/bin/create-homepage.js test-project
cd test-project
npm run dev
```

### 3. 包内容检查

```bash
# 检查将要发布的文件
npm pack --dry-run

# 或者实际打包查看
npm pack
tar -tzf penjc-homepage-*.tgz
```

### 4. 版本更新

```bash
# 更新版本号
npm version patch  # 或 minor, major
```

### 5. 发布

```bash
# 发布到 npm
npm publish
```

## 发布后验证

### 1. 安装测试

```bash
# 全局安装测试
npm install -g @penjc/homepage

# 创建测试项目
npm create homepage test-after-publish
cd test-after-publish
npm run dev
```

### 2. 文档更新

- 更新 README.md 中的版本信息
- 更新 CHANGELOG.md（如果有）
- 更新 GitHub releases

## 常用命令

```bash
# 查看当前版本
npm version

# 查看已发布的版本
npm view @penjc/homepage versions --json

# 撤销发布（24小时内）
npm unpublish @penjc/homepage@version

# 废弃某个版本
npm deprecate @penjc/homepage@version "reason"
``` 