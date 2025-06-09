#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function showHelp() {
  console.log(`
Homepage CLI 工具

用法:
  npx @penjc/homepage <项目名称>     创建新项目
  npx @penjc/homepage create <项目名称>  创建新项目  
  npx @penjc/homepage update        更新框架文件

示例:
  npx @penjc/homepage my-blog       # 创建博客项目
  npx @penjc/homepage create my-site # 创建网站项目
  npx @penjc/homepage update        # 更新框架文件（保护用户内容）

说明:
  update 命令只更新框架核心文件，保护您的内容和配置
  如需更新依赖，请手动运行: npm update

选项:
  -h, --help    显示帮助信息
  -v, --version 显示版本信息
  `);
}

function showVersion() {
  const packagePath = path.join(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log(pkg.version);
}

function createProject(projectName) {
  if (!projectName) {
    console.error('错误: 请提供项目名称');
    console.log('用法: npx @penjc/homepage create <project-name>');
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), projectName);
  
  if (fs.existsSync(targetDir)) {
    console.error(`错误: 目录 "${projectName}" 已存在`);
    process.exit(1);
  }

  console.log(`正在创建项目 "${projectName}"...`);

  try {
    // 创建项目目录
    fs.mkdirSync(targetDir, { recursive: true });

    // 复制模板文件
    const templateDir = path.join(__dirname, '..');
    copyTemplate(templateDir, targetDir);

    // 进入项目目录并安装依赖
    process.chdir(targetDir);
    
    // 安装依赖
    console.log('正在安装依赖...');
    execSync('npm install', { stdio: 'inherit' });

    // 安装CLI包本身，以便后续更新
    console.log('正在安装更新工具...');
    execSync('npm install @penjc/homepage', { stdio: 'inherit' });

    console.log(`\n✅ 项目创建成功！

接下来的步骤:
  1. cd ${projectName}
  2. 编辑 site.config.ts 配置你的网站信息
  3. 在 content/blog/ 目录添加你的博客文章
  4. 在 content/thoughts/ 目录添加你的随笔
  5. npm run dev 启动开发服务器

更多信息请查看 README.md 文件
    `);

  } catch (error) {
    console.error('创建项目时出错:', error.message);
    process.exit(1);
  }
}

function copyTemplate(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    // 跳过不需要的目录
    const basename = path.basename(src);
    if (['.git', 'node_modules', '.next', '.DS_Store', '.idea'].includes(basename) || basename.startsWith('backup-')) {
      return;
    }

    // 防止复制目标目录本身造成递归
    const srcAbs = path.resolve(src);
    const destAbs = path.resolve(dest);
    if (srcAbs.startsWith(destAbs) || destAbs.startsWith(srcAbs)) {
      return;
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);
    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      copyTemplate(srcPath, destPath);
    });
  } else {
    // 跳过不需要的文件
    const basename = path.basename(src);
    if (['.DS_Store', 'package-lock.json', '.gitignore'].includes(basename)) {
      return;
    }

    // 复制文件，但重命名示例配置文件
    if (basename === 'site.config.example.ts') {
      const newDest = path.join(path.dirname(dest), 'site.config.ts');
      fs.copyFileSync(src, newDest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

function updateProject() {
  // 检查是否在项目根目录
  if (!fs.existsSync('package.json') || !fs.existsSync('site.config.ts')) {
    console.error(`错误: 请在项目根目录运行此命令

正确的更新方法:
  npx @penjc/homepage update

如果您在项目目录中，请确保：
  1. 存在 package.json 文件
  2. 存在 site.config.ts 文件`);
    process.exit(1);
  }

  console.log('正在更新项目框架文件...');
  
  try {
    // 创建简单备份
    const backupDir = `backup-${Date.now()}`;
    console.log(`创建备份到 ${backupDir}/`);
    
    // 备份用户内容
    fs.mkdirSync(backupDir);
    if (fs.existsSync('site.config.ts')) {
      execSync(`cp site.config.ts ${backupDir}/`);
    }
    if (fs.existsSync('content')) {
      execSync(`cp -r content/ ${backupDir}/`);
    }
    if (fs.existsSync('public/images')) {
      execSync(`cp -r public/images/ ${backupDir}/`);
    }

    // 从当前运行的包中获取最新文件（而不是重新下载）
    const packagePath = path.join(__dirname, '..');
    const filesToUpdate = ['app/', 'components/', 'lib/', 'styles/', 'next.config.js', 'tailwind.config.js', 'postcss.config.js', 'tsconfig.json'];

    filesToUpdate.forEach(file => {
      const srcPath = path.join(packagePath, file);
      if (fs.existsSync(srcPath)) {
        console.log(`更新 ${file}`);
        if (fs.existsSync(file)) {
          execSync(`rm -rf "${file}"`);
        }
        
        // 区分文件和目录的复制方式
        if (file.endsWith('/')) {
          // 目录：创建目标目录后复制内容
          const dirName = file.slice(0, -1);
          fs.mkdirSync(dirName, { recursive: true });
          execSync(`cp -r "${srcPath}"* "${dirName}/"`);
        } else {
          // 文件：直接复制
          execSync(`cp "${srcPath}" ./`);
        }
      }
    });

    console.log(`\n✅ 框架更新完成！

备份文件保存在: ${backupDir}/

下一步:
  npm run dev    # 启动开发服务器
  npm run build  # 构建生产版本

注意: 
  - 您的内容文件（content/）和配置（site.config.ts）已被保护
  - 如果需要更新依赖，请手动运行: npm update
    `);

  } catch (error) {
    console.error('更新项目时出错:', error.message);
    process.exit(1);
  }
}

// 主程序
const args = process.argv.slice(2);
const command = args[0];

// 如果第一个参数不是命令，则当作项目名称，默认执行create
if (command && !['create', 'update', '-v', '--version', '-h', '--help'].includes(command)) {
  // 当通过 npx @penjc/homepage project-name 调用时
  createProject(command);
} else if (!command) {
  // 如果没有参数，显示帮助
  showHelp();
} else {
  switch (command) {
    case 'create':
      createProject(args[1]);
      break;
    case 'update':
      updateProject();
      break;
    case '-v':
    case '--version':
      showVersion();
      break;
    case '-h':
    case '--help':
    default:
      showHelp();
      break;
  }
} 