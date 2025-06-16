const fs = require('fs');
const path = require('path');

// 检查是否为 GitHub Pages 构建
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/homepage' : '';

// 读取 manifest.json
const manifestPath = path.join(__dirname, '../public/manifest.json');
const backupPath = path.join(__dirname, '../public/manifest.json.backup');

// 创建备份
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(manifestPath, backupPath);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// 更新图标路径
if (manifest.icons) {
  manifest.icons = manifest.icons.map(icon => ({
    ...icon,
    src: `${basePath}${icon.src}`
  }));
}

// 写回文件
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`Manifest updated for ${isGithubPages ? 'GitHub Pages' : 'local'} deployment`);

// 如果不是 GitHub Pages 构建，设置一个 cleanup 钩子
if (!isGithubPages) {
  // 立即恢复，因为本地开发不需要修改
  fs.copyFileSync(backupPath, manifestPath);
  console.log('Manifest restored for local development');
} 