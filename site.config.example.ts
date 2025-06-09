export const siteConfig = {
  // 基本信息
  name: "你的名字",
  title: "你的网站标题",
  description: "你的网站描述",
  url: "https://yourdomain.com",
  
  // 个人信息
  profile: {
    avatar: "/images/avatar.jpg",
    bio: "你的个人简介",
    location: "你的位置", // 可选，如果不想显示可以设为空字符串或删除此行
    email: "your.email@example.com", // 可选
    github: "https://github.com/yourusername", // 可选
    // 社交媒体链接（全部可选配置）
    social: {
      linkedin: "https://linkedin.com/in/username", // 可选
      twitter: "https://twitter.com/username", // 可选
      bilibili: "https://space.bilibili.com/12345678", // 可选
      youtube: "https://youtube.com/c/username", // 可选
      telegram: "https://t.me/username", // 可选
      instagram: "https://instagram.com/username", // 可选
    },
    // RSS 订阅配置
    rss: {
      enabled: true, // 设为false可禁用RSS订阅按钮
      title: "RSS 订阅",
    },
  },

  // 关于我页面配置
  about: {
    // 个人简介 - 可选整个部分
    intro: {
      title: "个人简介",
      paragraphs: [
        "你的个人简介第一段。",
        "你的个人简介第二段。"
      ]
    },
    
    // 教育背景 - 可选整个部分，如果不想显示可以删除或设为空数组
    education: {
      title: "教育背景",
      items: [
        {
          year: "2020 - 2024",
          degree: "计算机科学与技术 硕士", // 可选字段
          school: "你的大学",
          description: "专业描述信息。",
          gpa: "3.8/4.0" // 可选字段
        },
        {
          year: "2016 - 2020",
          degree: "计算机科学与技术 学士", // 可选字段
          school: "你的大学",
          description: "专业描述信息。",
          // gpa字段可以省略
        }
      ]
    },
    
    // 工作经历 - 可选整个部分，如果不想显示可以删除或设为空数组
    experience: {
      title: "工作经历",
      items: [
        {
          year: "2023 - 现在",
          title: "你的职位", // 可选字段
          company: "公司名称", // 可选字段
          description: "工作描述。", // 可选字段
          highlights: [ // 可选字段，可以设为空数组
            "工作亮点1",
            "工作亮点2",
            "工作亮点3"
          ]
        },
        {
          year: "2022 - 2023",
          title: "另一个职位",
          company: "另一家公司",
          description: "工作描述。",
          // highlights可以省略
        }
      ]
    },
    
    // 技能专长 - 可选整个部分，如果不想显示可以删除或设为空数组
    skills: {
      title: "技能专长",
      categories: [
        {
          name: "后端开发",
          skills: [
            { name: "Java/Spring Boot", level: 95 },
            { name: "Python/Django", level: 88 },
            { name: "Node.js/Express", level: 80 },
            { name: "Go", level: 75 }
          ]
        },
        {
          name: "前端技术",
          skills: [
            { name: "JavaScript/TypeScript", level: 85 },
            { name: "React/Next.js", level: 80 },
            { name: "Vue.js", level: 75 }
          ]
        }
      ]
    },
  },

  // 导航配置
  navigation: {
    main: [
      { name: "首页", href: "/" },
      { name: "博客", href: "/blog" },
      { name: "随笔", href: "/thoughts" },
      { name: "关于", href: "/about" },
    ],
  },

  // 首页配置
  hero: {
    backgroundImage: "/images/hero-bg.jpg",
    quickLinks: [
      { name: "博客", href: "/blog", icon: "BookOpen" },
      { name: "随笔", href: "/thoughts", icon: "PenTool" },
      { name: "关于", href: "/about", icon: "User" },
    ],
  },

  // 博客配置
  blog: {
    postsPerPage: 10,
    pagination: {
      postsPerPage: 6,
      maxVisiblePages: 5,
    },
    homepage: {
      recentPostsCount: 6,
    },
    display: {
      showExcerpt: true,
      excerptLength: 150,
      showReadTime: true,
      showTags: true,
      maxTagsToShow: 3,
    },
  },

  // SEO配置
  seo: {
    keywords: [
      "个人主页",
      "全栈开发",
      "React",
      "Next.js",
      "TypeScript",
      "前端开发",
      "后端开发",
    ],
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "你的个人主页",
    },
    icons: {
      favicon: "/favicon.ico",
      icon192: "/icon-192.png",
      icon512: "/icon-512.png",
      appleTouchIcon: "/apple-touch-icon.png",
    },
  },

  // 分析工具配置
  analytics: {
    googleAnalytics: "G-XXXXXXXXXX", // 可选
  },

  // 其他设置
  settings: {
    // 开发模式下的调试选项
    debug: false,
    // 主题设置
    theme: {
      // 默认主题颜色
      primaryColor: "#3b82f6",
    },
  },
};

/* 
使用说明：

1. 关于我页面的各个部分都是可选的：
   - intro: 个人简介部分
   - education: 教育背景部分
   - experience: 工作经历部分
   - skills: 技能专长部分

2. 如果不想显示某个部分，可以：
   - 删除整个配置项
   - 设置items为空数组 []
   - 设置paragraphs为空数组 []

3. 每个部分中的字段也是可选的：
   - education中的degree、gpa字段可以省略
   - experience中的title、company、description、highlights字段可以省略
   - 社交媒体链接都是可选的

4. 示例最小配置（只显示基本信息）：
   about: {
     intro: {
       title: "关于我",
       paragraphs: ["我是一个开发者。"]
     }
   }

5. 示例不显示任何关于我内容：
   about: {}
   
   或者删除about配置项
*/ 