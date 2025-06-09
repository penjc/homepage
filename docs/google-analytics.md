# Google Analytics 集成指南

个人主页现已支持Google Analytics 4 (GA4)，可以帮助您追踪网站访问量、用户行为和其他重要指标。

## 快速开始

### 1. 获取 Google Analytics ID

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的GA4属性或使用现有属性
3. 在"管理" > "数据流"中找到您的测量ID (格式为 `G-XXXXXXXXXX`)

### 2. 配置网站

在 `site.config.ts` 文件中，将您的Google Analytics ID添加到analytics配置中：

```typescript
// 分析工具
analytics: {
  googleAnalyticsId: "G-XXXXXXXXXX", // 替换为您的Google Analytics ID
},
```

### 3. 验证配置

1. 启动开发服务器：`npm run dev`
2. 在浏览器开发者工具的网络面板中，确认您能看到对 `googletagmanager.com` 的请求
3. 在GA4实时报告中查看是否有数据

## 功能特性

### 自动追踪

网站会自动追踪以下数据：

- **页面浏览量**: 自动追踪所有页面访问
- **页面路径变化**: 使用Next.js App Router的路由变化追踪
- **导航点击**: 追踪主导航菜单的点击行为
- **搜索使用**: 追踪搜索功能的使用情况

### 博客相关追踪

- **文章浏览**: 当用户访问博客文章时自动追踪
- **阅读时间**: 追踪用户在文章上的停留时间（仅当阅读时间超过10秒时）
- **文章互动**: 追踪用户与文章的交互行为

### 自定义事件

您可以在代码中使用以下函数来追踪自定义事件：

```typescript
import { trackEvent } from '@/components/GoogleAnalytics';

// 追踪自定义事件
trackEvent('button_click', 'engagement', 'header_cta');

// 参数说明：
// - action: 事件动作名称
// - category: 事件分类
// - label: 可选的事件标签
// - value: 可选的数值
```

## 已集成的追踪事件

### 导航相关
- `click_navigation`: 主导航菜单点击
- `open_search`: 搜索框打开

### 博客相关
- `view_article`: 博客文章浏览
- `read_article`: 博客文章阅读时间（>10秒）

### 页面浏览
- 自动页面浏览追踪（通过gtag配置）

## 隐私和合规

### 数据收集说明

网站收集的数据包括：
- 页面访问记录
- 用户设备和浏览器信息
- 页面停留时间
- 点击行为和交互数据

### 隐私建议

1. **添加隐私政策**: 在网站上添加隐私政策页面，说明数据收集和使用方式
2. **Cookie同意**: 根据适用法律，考虑添加cookie同意机制
3. **IP匿名化**: GA4默认已启用IP匿名化

### GDPR合规

如果您的网站面向欧盟用户，建议：

1. 添加cookie同意横幅
2. 提供数据删除选项
3. 在隐私政策中详细说明数据处理方式

## 高级配置

### 禁用开发环境追踪

如果您不希望在开发环境中收集数据，可以修改 `components/GoogleAnalytics.tsx`：

```typescript
export default function GoogleAnalytics() {
  const { googleAnalyticsId } = siteConfig.analytics;

  // 在开发环境中禁用
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  // ... 其余代码
}
```

### 自定义维度

您可以在GA4中设置自定义维度来追踪特定数据：

```typescript
// 发送带有自定义参数的事件
window.gtag('event', 'custom_event', {
  custom_parameter_1: 'value1',
  custom_parameter_2: 'value2',
});
```

### 电子商务追踪

如果您的网站有电子商务功能，可以添加购买追踪：

```typescript
import { trackEvent } from '@/components/GoogleAnalytics';

// 追踪购买事件
const trackPurchase = (transactionId: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'CNY'
    });
  }
};
```

## 常见问题

### Q: 为什么在开发环境中看不到数据？
A: GA4数据通常有1-2小时的延迟。开发环境的数据也会被收集，但建议使用不同的GA属性用于开发和生产环境。

### Q: 如何验证追踪是否正常工作？
A: 
1. 查看浏览器开发者工具的网络面板，确认有对GA的请求
2. 使用GA4的实时报告查看实时数据
3. 使用Google Tag Assistant等工具进行验证

### Q: 可以追踪单页应用的路由变化吗？
A: 是的，网站已经集成了`useAnalytics` Hook来自动追踪Next.js的路由变化。

### Q: 如何排除内部流量？
A: 在GA4中设置IP过滤器，排除您的办公室或个人IP地址。

## 技术实现

### 核心组件

1. **GoogleAnalytics.tsx**: 主要的GA组件，负责加载gtag脚本
2. **AnalyticsProvider.tsx**: 提供自动页面追踪功能
3. **useAnalytics.ts**: React Hook，监听路由变化并发送页面浏览事件

### 集成方式

- 使用Next.js的`Script`组件优化脚本加载
- 采用`afterInteractive`策略确保不影响页面加载性能
- 通过React Context和Hook实现组件间的数据共享

## 性能影响

- GA脚本采用异步加载，不会阻塞页面渲染
- 使用Next.js Script组件的优化加载策略
- 事件追踪采用防抖机制，避免过度发送请求

## 支持和维护

如需帮助或发现问题，请：

1. 查看Google Analytics帮助中心
2. 检查浏览器控制台是否有错误
3. 确认网络连接和防火墙设置
4. 验证GA配置ID是否正确

---

通过集成Google Analytics，您可以更好地了解网站访客行为，优化内容策略，提升用户体验。 