#!/usr/bin/env node

/**
 * 项目状态检查器
 * 检查项目的完整性和配置
 */

const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 检查必需文件
const requiredFiles = [
  'package.json',
  'README.md',
  'LICENSE',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  'CHANGELOG.md',
  'next.config.js',
  'tailwind.config.js',
  'tsconfig.json',
  'site.config.example.ts',
  '.github/workflows/ci.yml',
  '.github/workflows/deploy.yml',
  '.github/dependabot.yml',
  '.github/FUNDING.yml',
  '.github/ISSUE_TEMPLATE/bug_report.md',
  '.github/ISSUE_TEMPLATE/feature_request.md',
  '.github/ISSUE_TEMPLATE/question.md',
  '.github/pull_request_template.md',
  'bin/create-homepage.js'
];

// 检查目录结构
const requiredDirs = [
  'app',
  'components',
  'lib',
  'styles',
  'public',
  'content',
  'docs',
  'bin',
  '.github',
  'scripts'
];

function checkFiles() {
  log('\n📁 检查必需文件...', 'blue');
  let missingFiles = 0;
  
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      log(`✅ ${file}`, 'green');
    } else {
      log(`❌ ${file} (缺失)`, 'red');
      missingFiles++;
    }
  });
  
  return missingFiles;
}

function checkDirectories() {
  log('\n📂 检查目录结构...', 'blue');
  let missingDirs = 0;
  
  requiredDirs.forEach(dir => {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      log(`✅ ${dir}/`, 'green');
    } else {
      log(`❌ ${dir}/ (缺失)`, 'red');
      missingDirs++;
    }
  });
  
  return missingDirs;
}

function checkPackageJson() {
  log('\n📦 检查 package.json...', 'blue');
  let issues = 0;
  
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // 检查必需字段
    const requiredFields = ['name', 'version', 'description', 'bin', 'scripts', 'dependencies'];
    requiredFields.forEach(field => {
      if (pkg[field]) {
        log(`✅ ${field}`, 'green');
      } else {
        log(`❌ ${field} (缺失)`, 'red');
        issues++;
      }
    });
    
    // 检查bin配置
    if (pkg.bin && pkg.bin['create-homepage']) {
      log(`✅ bin.create-homepage`, 'green');
    } else {
      log(`❌ bin.create-homepage (缺失)`, 'red');
      issues++;
    }
    
    // 检查scripts
    const requiredScripts = ['dev', 'build', 'start', 'lint', 'type-check'];
    requiredScripts.forEach(script => {
      if (pkg.scripts && pkg.scripts[script]) {
        log(`✅ scripts.${script}`, 'green');
      } else {
        log(`❌ scripts.${script} (缺失)`, 'red');
        issues++;
      }
    });
    
  } catch (error) {
    log(`❌ package.json 解析错误: ${error.message}`, 'red');
    issues++;
  }
  
  return issues;
}

function checkGitHubActions() {
  log('\n🔄 检查 GitHub Actions...', 'blue');
  let issues = 0;
  
  const workflows = [
    '.github/workflows/ci.yml',
    '.github/workflows/deploy.yml'
  ];
  
  workflows.forEach(workflow => {
    if (fs.existsSync(workflow)) {
      try {
        const content = fs.readFileSync(workflow, 'utf8');
        if (content.includes('name:') && content.includes('on:')) {
          log(`✅ ${workflow}`, 'green');
        } else {
          log(`⚠️  ${workflow} (格式可能有问题)`, 'yellow');
          issues++;
        }
      } catch (error) {
        log(`❌ ${workflow} (读取错误)`, 'red');
        issues++;
      }
    } else {
      log(`❌ ${workflow} (缺失)`, 'red');
      issues++;
    }
  });
  
  return issues;
}

function checkBinScripts() {
  log('\n🔧 检查 bin 脚本...', 'blue');
  let issues = 0;
  
  const binScripts = ['bin/create-homepage.js'];
  
  binScripts.forEach(script => {
    if (fs.existsSync(script)) {
      try {
        const content = fs.readFileSync(script, 'utf8');
        if (content.startsWith('#!/usr/bin/env node')) {
          log(`✅ ${script}`, 'green');
        } else {
          log(`⚠️  ${script} (缺少 shebang)`, 'yellow');
          issues++;
        }
      } catch (error) {
        log(`❌ ${script} (读取错误)`, 'red');
        issues++;
      }
    } else {
      log(`❌ ${script} (缺失)`, 'red');
      issues++;
    }
  });
  
  return issues;
}

function generateReport(missingFiles, missingDirs, pkgIssues, actionIssues, binIssues) {
  const totalIssues = missingFiles + missingDirs + pkgIssues + actionIssues + binIssues;
  
  log('\n📊 检查报告', 'blue');
  log('='.repeat(50), 'blue');
  
  if (totalIssues === 0) {
    log('🎉 项目配置完整！所有检查都通过了。', 'green');
  } else {
    log(`⚠️  发现 ${totalIssues} 个问题需要修复：`, 'yellow');
    if (missingFiles > 0) log(`   - ${missingFiles} 个缺失文件`, 'red');
    if (missingDirs > 0) log(`   - ${missingDirs} 个缺失目录`, 'red');
    if (pkgIssues > 0) log(`   - ${pkgIssues} 个 package.json 问题`, 'red');
    if (actionIssues > 0) log(`   - ${actionIssues} 个 GitHub Actions 问题`, 'red');
    if (binIssues > 0) log(`   - ${binIssues} 个 bin 脚本问题`, 'red');
  }
  
  log('\n💡 建议:', 'blue');
  log('   - 确保所有必需文件都存在', 'yellow');
  log('   - 检查 GitHub Actions 工作流配置', 'yellow');
  log('   - 验证 bin 脚本的可执行性', 'yellow');
  log('   - 运行 npm run lint 检查代码质量', 'yellow');
  
  return totalIssues;
}

// 主函数
function main() {
  log('🔍 开始项目状态检查...', 'blue');
  
  const missingFiles = checkFiles();
  const missingDirs = checkDirectories();
  const pkgIssues = checkPackageJson();
  const actionIssues = checkGitHubActions();
  const binIssues = checkBinScripts();
  
  const totalIssues = generateReport(missingFiles, missingDirs, pkgIssues, actionIssues, binIssues);
  
  process.exit(totalIssues > 0 ? 1 : 0);
}

// 运行检查
main(); 