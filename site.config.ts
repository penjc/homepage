export const siteConfig = {
  // 基本信息
  name: "penjc",
  title: "無限進步",
  description: "个人主页",
  url: "https://pengjiancheng.com",
  
  // 个人信息
  profile: {
    avatar: "/images/avatar.jpg",
    bio: "無限進步",
    location: "上海, 中国",
    email: "penjc204@gmail.com",
    github: "https://github.com/penjc",
    // 社交媒体链接（可选配置）
    social: {
      // linkedin: "https://linkedin.com/in/username",
      // twitter: "https://twitter.com/username",
      // bilibili: "https://space.bilibili.com/12345678",
      // youtube: "https://youtube.com/c/username",
      // telegram: "https://t.me/username",
      // instagram: "https://instagram.com/username",
    },
    // RSS 订阅配置
    rss: {
      enabled: true,
      title: "RSS 订阅",
    },
    // 旧版主页链接
    oldSite: {
      enabled: true,
      url: "https://old.pengjiancheng.com",
      title: "旧版主页",
    },
  },

  // 关于我页面配置
  about: {
    // 个人简介
    intro: {
      title: "个人简介",
      paragraphs: [
        "后端开发工程师。熟练掌握后端技术栈。喜欢学习新技术，关注行业发展趋势。",
        "在工作之余，我喜欢分享技术文章，参与开源项目，以及探索新的技术领域。相信技术可以改变世界，希望通过自己的努力为这个目标贡献一份力量。"
      ]
    },
    
    // 教育背景
    education: {
      title: "教育背景",
      items: [
        {
          year: "2020 - 2024",
          // degree: "计算机科学与技术 硕士",
          school: "香港城市大学大学",
          description: "主修计算机科学与技术，专业课程包括数据结构、算法设计、数据库系统、软件工程等。",
          // gpa: "3.8/4.0"
        },
        {
          year: "2018 - 2022",
          // degree: "计算机科学与技术 学士",
          school: "上海大学",
          description: "主修计算机科学与技术，专业课程包括数据结构、算法设计、数据库系统、软件工程等。",
          // gpa: "3.8/4.0"
        }
      ]
    },
    
    // 工作经历
    experience: {
      title: "工作经历",
      items: [
        {
          year: "2025 - 现在",
          title: "后端开发", // 可选字段
          company: "哔哩哔哩", // 可选字段
          description: "平台系统的开发与维护。", // 可选字段
          highlights: [ // 可选字段，可以设为空数组
            "设计并实现分布式事务解决方案，保障资金流程一致性，日处理交易笔数超千万",
            "基于Spring Cloud + Sentinel构建服务容错体系，故障响应时延降低80%",
            "参与RocketMQ消息队列的业务接入，优化订单异步通知链路，保证消息可靠送达",
            "完成冷存系统接入改造，实现历史交易数据冷热分离，降低线上Redis使用率40%"
          ]
        },
        {
          year: "2023 - 2024",
          title: "应用开发",
          company: "心动网络",
          description: "负责 AI 绘画平台开发与维护。",
          // highlights可以省略
        }
      ]
    },
    
    // 技能专长
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
          name: "数据库",
          skills: [
            { name: "MySQL", level: 90 },
            { name: "Redis", level: 85 },
            { name: "MongoDB", level: 80 },
            { name: "PostgreSQL", level: 75 }
          ]
        },
        {
          name: "云服务与运维",
          skills: [
            { name: "Docker/Kubernetes", level: 85 },
            { name: "AWS/阿里云", level: 80 },
            { name: "Linux运维", level: 85 },
            { name: "CI/CD", level: 75 }
          ]
        },
        {
          name: "前端技术",
          skills: [
            { name: "JavaScript/TypeScript", level: 85 },
            { name: "React/Next.js", level: 80 },
            { name: "Vue.js", level: 75 },
            { name: "HTML/CSS", level: 80 }
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
      { name: "项目", href: "/projects" },
      { name: "书籍", href: "/books" },
      { name: "友链", href: "/friends" },
      { name: "关于", href: "/about" },
    ],
  },

  // 项目配置
  projects: {
    enabled: true, // 是否启用项目页面
    title: "项目",
    description: "探索技术作品与创新项目",
    items: [
      {
        id: "homepage",
        title: "个人主页",
        description: "基于 Next.js 的个人主页模版，支持博客、随笔等功能",
        image: "/images/projects/homepage.jpg",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/penjc/homepage",
        demo: "https://pengjiancheng.com",
        status: "active", // active | completed | archived
        featured: true
      },
      {
        id: "api-gateway",
        title: "Spring",
        description: "Spring Framework 的核心框架，提供全面的企业级应用开发支持",
        image: "/images/projects/spring.jpg",
        tags: ["Java", "FrameWork", "Spring FrameWork"],
        github: "https://github.com/spring-projects/spring-framework",
        status: "active",
        featured: true
      },
      {
        id: "apache-nifi",
        title: "Apache NiFi 数据流处理",
        description: "可视化数据流编排平台，支持大规模数据采集、转换与路由，适用批量数据处理场景",
        image: "/images/projects/apache-nifi.jpg",
        tags: ["Java", "Apache NiFi", "Kafka"],
        github: "https://github.com/apache/nifi",
        status: "completed",
        featured: false
      },
      {
        id: "redis",
        title: "Redis 内存数据存储",
        description: "高性能的内存数据存储系统，广泛应用于缓存、消息队列、分布式锁等高并发场景",
        tags: ["Redis", "Cache", "Pub/Sub"],
        github: "https://github.com/redis/redis",
        status: "completed",
        featured: false
      }

    ]
  },

  // 书籍推荐配置
  books: {
    enabled: true, // 是否启用书籍页面
    title: "书籍",
    description: "分享值得阅读的好书，记录阅读心得",
    categories: [
      {
        id: "tech",
        name: "技术类",
        description: "提升技术能力的专业书籍"
      },
      {
        id: "philosophy",
        name: "哲学思辨",
        description: "启发思维的哲学著作"
      },
      {
        id: "psychology",
        name: "心理学",
        description: "探索内心世界的心理学作品"
      },
      {
        id: "history",
        name: "历史人文",
        description: "了解过去，洞察未来"
      },
      {
        id: "novel",
        name: "文学小说",
        description: "陶冶情操的文学作品"
      }
    ],
    items: [
      {
        id: "clean-code",
        title: "代码整洁之道",
        author: "Robert C. Martin",
        category: "tech",
        rating: 5,
        status: "read", // reading | read | want_to_read
        cover: "/images/books/clean-code.jpg",
        description: "代码质量与其整洁度成正比。干净的代码，既在质量上可靠，也为后期维护奠定基础。",
        review: "这本书彻底改变了我对编程的认知，让我明白了什么是真正优秀的代码。",
        tags: ["编程", "软件工程", "最佳实践"],
        readDate: "2024-01-15",
        featured: true,
        purchaseLinks: {
          amazon: "https://amazon.com/clean-code",
          douban: "https://book.douban.com/subject/4199741/",
        }
      },
      {
        id: "thinking-fast-slow",
        title: "思考，快与慢",
        author: "丹尼尔·卡尼曼",
        category: "psychology",
        rating: 5,
        status: "read",
        cover: "/images/books/thinking-fast-slow.jpg",
        description: "诺贝尔经济学奖得主丹尼尔·卡尼曼的经典著作，揭示人类思维的双重系统。",
        review: "深度解析了人类决策过程，让我重新审视自己的思维模式。",
        tags: ["心理学", "认知科学", "决策"],
        readDate: "2023-12-20",
        featured: true,
        purchaseLinks: {
          douban: "https://book.douban.com/subject/10785583/"
        }
      },
      {
        id: "sapiens",
        title: "人类简史",
        author: "尤瓦尔·赫拉利",
        category: "history",
        rating: 5,
        status: "read",
        cover: "/images/books/sapiens.jpg",
        description: "从认知革命、农业革命到科学革命，梳理影响人类发展的重大脉络。",
        review: "宏观视角下的人类历史，思维开阔，见解独特。",
        tags: ["历史", "人类学", "社会"],
        readDate: "2023-11-10",
        featured: true,
        purchaseLinks: {
          douban: "https://book.douban.com/subject/25985021/"
        }
      },
      {
        id: "design-patterns",
        title: "设计模式：可复用面向对象软件的基础",
        author: "Gang of Four",
        category: "tech",
        rating: 4,
        status: "reading",
        cover: "/images/books/design-patterns.jpg",
        description: "软件工程领域的经典著作，介绍23种设计模式。",
        review: "正在阅读中，对理解软件架构很有帮助。",
        tags: ["设计模式", "软件架构", "面向对象"],
        featured: false,
        purchaseLinks: {
          douban: "https://book.douban.com/subject/1052241/"
        }
      },
      {
        id: "the-pragmatic-programmer",
        title: "程序员修炼之道",
        author: "David Thomas & Andrew Hunt",
        category: "tech",
        rating: 5,
        status: "want_to_read",
        cover: "/images/books/pragmatic-programmer.jpg",
        description: "程序员的必读经典，涵盖软件开发的方方面面。",
        tags: ["编程哲学", "软件开发", "职业发展"],
        featured: false,
        purchaseLinks: {
          douban: "https://book.douban.com/subject/1417047/"
        }
      },
    ]
  },

  // 友链配置
  friends: {
    enabled: true, // 是否启用友链页面
    title: "友链",
    description: "志同道合的朋友们",
    items: [
      {
        id: "example-friend-1",
        name: "示例朋友",
        description: "这是一个示例朋友的描述",
        avatar: "https://avatars.githubusercontent.com/u/1?v=4",
        url: "https://example.com",
        featured: true,
        status: "active", // active | inactive
        tags: ["技术", "博客", "前端"]
      },
      {
        id: "example-friend-2", 
        name: "另一个朋友",
        description: "另一个朋友的网站，专注于后端技术分享",
        avatar: "https://avatars.githubusercontent.com/u/2?v=4",
        url: "https://example2.com",
        featured: false,
        status: "active",
        tags: ["后端", "Java", "Spring"]
      },
      {
        id: "example-friend-3",
        name: "设计师朋友",
        description: "专业UI/UX设计师，分享设计心得与作品",
        avatar: "https://avatars.githubusercontent.com/u/3?v=4",
        url: "https://example3.com",
        featured: true,
        status: "active",
        tags: ["设计", "UI/UX", "创意"]
      }
    ]
  },

  // 首页配置
  hero: {
    backgroundImage: "/images/hero-bg.jpg",
    quickLinks: [
      { name: "博客", href: "/blog", icon: "BookOpen" },
      { name: "随笔", href: "/thoughts", icon: "PenTool" },
      { name: "项目", href: "/projects", icon: "Code" },
      { name: "关于", href: "/about", icon: "User" },
    ],
  },

  // 博客配置
  blog: {
    // 分页配置
    pagination: {
      postsPerPage: 6, // 每页显示的博客文章数量
      maxVisiblePages: 5, // 分页组件中最多显示的页码数量
    },
    
    // 首页配置
    homepage: {
      recentPostsCount: 5, // 首页显示的最新文章数量
    },
    
    // 其他博客相关配置
    display: {
      showExcerpt: true, // 是否显示文章摘要
      excerptLength: 150, // 文章摘要长度
      showReadTime: true, // 是否显示阅读时间
      showTags: true, // 是否显示标签
      maxTagsToShow: 3, // 最多显示的标签数量
    },
  },

  // SEO配置
  seo: {
    keywords: [
        "个人主页",
        "后端开发",
        "React",
        "Next.js",
        "TypeScript",
    ],
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "个人主页",
    },
  },

  // 分析工具
  analytics: {
    googleAnalyticsId: "G-XZ75JQC00S", // Google Analytics ID
  },

  // 底部栏配置
  footer: {
    copyright: {
      owner: "penjc", // 版权所有者
      startYear: "2025", // 开始年份
      showCurrentYear: true, // 是否显示当前年份
    },
    beian: { // 没有可不填
      police: "沪公网安备31011502403067号", // 公安备案号
      icp: "沪ICP备2025112622号", // ICP备案号
    },
  },

  // 部署配置
  deployment: {
    baseUrl: "/homepage",
    // 基础路径配置 - 总是填写你的仓库路径
    // GitHub Pages 部署时通过 GITHUB_PAGES=true 环境变量启用此配置
    // 自定义域名部署时不设置 GITHUB_PAGES 环境变量，会忽略此配置
  },
}; 