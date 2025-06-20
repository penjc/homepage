<div align="center">

# Homepage

</div>

<div align="center">
<img src="https://github.com/penjc/homepage/blob/main/assets/homepage.svg?raw=true" width="200">

[![npm version](https://img.shields.io/npm/v/@penjc/homepage?style=flat-square)](https://www.npmjs.com/package/@penjc/homepage)
[![npm downloads](https://img.shields.io/npm/dm/@penjc/homepage?style=flat-square)](https://www.npmjs.com/package/@penjc/homepage)

[//]: # ([![GitHub stars]&#40;https://img.shields.io/github/stars/penjc/homepage?style=flat-square&#41;]&#40;https://github.com/penjc/homepage/stargazers&#41;)

[//]: # ([![GitHub forks]&#40;https://img.shields.io/github/forks/penjc/homepage?style=flat-square&#41;]&#40;https://github.com/penjc/homepage/network/members&#41;)

[//]: # ([![GitHub issues]&#40;https://img.shields.io/github/issues/penjc/homepage?style=flat-square&#41;]&#40;https://github.com/penjc/homepage/issues&#41;)

[//]: # ([![GitHub license]&#40;https://img.shields.io/github/license/penjc/homepage?style=flat-square&#41;]&#40;https://github.com/penjc/homepage/blob/main/LICENSE&#41;)

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18+-61dafb?style=flat-square&logo=react)](https://reactjs.org/)

[![Vercel](https://img.shields.io/badge/Deploy_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![Netlify](https://img.shields.io/badge/Deploy_on-Netlify-00c7b7?style=flat-square&logo=netlify)](https://netlify.com)
[![GitHub Pages](https://img.shields.io/badge/Deploy_on-GitHub_Pages-222?style=flat-square&logo=github)](https://pages.github.com/)

**A Modern, Responsive Personal Homepage Solution**

A full-featured personal homepage template built with Next.js 13+, integrating blog, project showcase, book management, friend links, and more.  
Built with TypeScript + Tailwind CSS stack, providing ultimate developer and user experience.

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🎨 Features](#-features) • [💻 Demo](https://pengjiancheng.com) • [🤝 Contributing](#-contributing)

[简体中文](./README.md) | English

</div>

---

## ✨ Features

### 📝 Content Management
- 📝 **Markdown Support** - Support for Markdown writing with code syntax highlighting
- 📚 **Blog System** - Complete blog functionality with pagination, categories, and tags
- ✍️ **Thoughts Feature** - Record life insights with mood tags and timeline
- 🏷️ **Tag Categories** - Intelligent content categorization and tag management
- 🔍 **Search Functionality** - Built-in full-text search for quick content discovery

### 🗂️ Showcase Modules
- 💼 **Project Showcase** - Display personal projects with category, status, and link management
- 📚 **Book Management** - Share reading lists, record book reviews, ratings, and purchase links
- 🤝 **Friend Links** - Manage friend links with avatars, descriptions, and status
- 👤 **About Page** - Complete personal introduction including skills, work experience, and education

### 🎯 Interactive Features
- 💬 **Comment System** - Support for multiple comment systems (Giscus, Gitalk, Valine, Waline)
- 📝 **Comment Configuration** - Flexible comment system configuration with page-level control
- 🔄 **Real-time Updates** - Dynamic content loading without page refresh
- 🎨 **Theme Adaptation** - Comment system automatically adapts to website theme

### 🚀 Deployment & Development
- 🚀 **One-Click Deploy** - Support for Vercel, Netlify, GitHub Pages, and other platforms
- ⚙️ **Configuration Driven** - Manage all features through configuration files without code modification
- 🔧 **Developer Friendly** - Hot reload, ESLint, Prettier out of the box
- 📦 **Modular Design** - Component-based architecture, easy to customize and extend

### ⚡ Performance & Technology
- ⚡ **Lightning Fast** - Built with Next.js 13+, static generation, excellent performance
- 🎯 **SEO Optimized** - Built-in SEO best practices, search engine friendly
- 📱 **PWA Support** - Support for offline access, installable to desktop
- 🔧 **TypeScript** - Complete type safety, better development experience
- 📊 **Analytics** - Google Analytics integration for understanding traffic

## 🚀 Quick Start

### Method 1: Using npx

```bash
# Create new project
npx @penjc/homepage my-website

# Enter project directory
cd my-website

# Start development server
npm run dev
```

### Method 2: Clone Repository

```bash
# Clone repository
git clone https://github.com/penjc/homepage.git my-website

# Enter project directory
cd my-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:4000](http://localhost:4000) to view your website.

## 📖 Documentation

### 🛠️ Development Commands

```bash
npm run dev      # Start development server (http://localhost:4000)
npm run build    # Build production version
npm run start    # Start production server
npm run lint     # Code linting
```

### ⚙️ Configure Website

Rename `site.config.example.ts` to `site.config.ts`.

Edit the `site.config.ts` file to configure your website:

```typescript
export const siteConfig = {
  // Basic information
  name: "Your Name",
  title: "Your Website Title",
  description: "Your website description",
  url: "https://yourdomain.com",
  
  // Personal information
  profile: {
    avatar: "/images/avatar.jpg",
    bio: "Your personal bio",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    social: {
      linkedin: "https://linkedin.com/in/username",
      twitter: "https://twitter.com/username",
      // ... more social media links
    }
  },
  
  // Navigation configuration
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "Blog", href: "/blog" },
      { name: "Thoughts", href: "/thoughts" },
      { name: "About", href: "/about" },
    ],
  }
}
```

### 📝 Adding Content

#### Blog Posts

Create `.md` files in the `content/blog/` directory:

```markdown
---
title: Title
date: "2025-06-04"
category: "Life"
tags: ["Personal Homepage", "Next.js"]
excerpt: "This is my first blog post, welcome to my personal homepage!"
readTime: "3 min read"
---

# Article Content

Here is the main content of the article...
```

#### Thoughts

Create `.md` files in the `content/thoughts/` directory:

```markdown
---
date: "2025-06-04"
mood: "🌧️"
tags: ["Reflection"]
---

# Thought Content

Here is the content of the thought...
```

#### Image Resources

Place image files in the `public/images/` directory, then reference them in articles:

```markdown
![Image Description](/images/your-image.jpg)
```

### 🗂️ Configure Showcase Modules

#### Project Showcase

Configure project information in `site.config.ts`:

```typescript
projects: {
  enabled: true,
  title: "Projects",
  description: "Explore technical works and innovative projects",
  items: [
    {
      id: "homepage",
      title: "Personal Homepage",
      description: "A personal homepage template based on Next.js",
      image: "/images/projects/homepage.jpg",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/username/homepage",
      demo: "https://your-site.com",
      status: "active", // active | completed | archived
      featured: true
    }
    // More projects...
  ]
}
```

#### Book Management

Configure your reading list:

```typescript
books: {
  enabled: true,
  title: "Books",
  description: "Share good books worth reading and record reading insights",
  categories: [
    { id: "tech", name: "Technical", description: "Professional books to improve technical skills" },
    { id: "philosophy", name: "Philosophy", description: "Philosophical works that inspire thinking" }
    // More categories...
  ],
  items: [
    {
      id: "clean-code",
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "tech",
      rating: 5,
      status: "read", // reading | read | want_to_read
      cover: "/images/books/clean-code.jpg",
      description: "Code quality is proportional to its cleanliness...",
      review: "This book completely changed my understanding of programming",
      tags: ["Programming", "Software Engineering", "Best Practices"],
      readDate: "2024-01-15",
      featured: true,
      purchaseLinks: {
        amazon: "https://amazon.com/clean-code",
        goodreads: "https://goodreads.com/book/show/3735293"
      }
    }
    // More books...
  ]
}
```

#### Friend Links

Configure friend links:

```typescript
friends: {
  enabled: true,
  title: "Friends",
  description: "Like-minded friends",
  items: [
    {
      id: "friend-1",
      name: "Friend Name",
      description: "Description of friend's website",
      avatar: "https://avatars.githubusercontent.com/u/1?v=4",
      url: "https://friend-site.com",
      featured: true,
      status: "active", // active | inactive
      tags: ["Tech", "Blog", "Frontend"]
    }
    // More friend links...
  ]
}
```

#### About Page

Configure personal information display:

```typescript
about: {
  // Personal introduction
  intro: {
    title: "About Me",
    paragraphs: [
      "Backend developer. Proficient in backend technology stack...",
      "In my spare time, I enjoy sharing technical articles..."
    ]
  },
  
  // Education background
  education: {
    title: "Education",
    items: [
      {
        year: "2020 - 2024",
        degree: "Master of Computer Science",
        school: "University Name",
        description: "Course description...",
        gpa: "3.8/4.0"
      }
    ]
  },
  
  // Work experience
  experience: {
    title: "Experience",
    items: [
      {
        year: "2023 - Present",
        title: "Software Engineer",
        company: "Company Name",
        description: "Job description...",
        highlights: ["Achievement 1", "Achievement 2"]
      }
    ]
  },
  
  // Skills
  skills: {
    title: "Skills",
    categories: [
      {
        name: "Backend Development",
        skills: [
          { name: "Java/Spring Boot", level: 95 },
          { name: "Python/Django", level: 88 }
        ]
      }
    ]
  }
}
```

### 💬 Configure Comment System

Support for multiple comment systems, choose one to configure. Comment functionality will automatically appear on blog detail pages, thoughts pages, project pages, book pages, friend link pages, and about page.

#### Supported Comment Systems

- **Giscus** (Recommended) - Based on GitHub Discussions, completely free
- **Gitalk** - Based on GitHub Issues
- **Valine** - Based on LeanCloud
- **Waline** - Enhanced version of Valine

#### Quick Configuration

Configure comment system in `site.config.ts`:

```typescript
export const siteConfig = {
  // ... other configurations
  
  comments: {
    enabled: true,               // Enable comment functionality
    provider: "giscus",          // Choose comment system: giscus | gitalk | valine | waline
    
    // Giscus configuration (recommended)
    giscus: {
      repo: "your-username/your-repo",
      repoId: "your-repo-id",
      category: "General",
      categoryId: "your-category-id",
      mapping: "pathname",
      theme: "preferred_color_scheme",
      lang: "en",
      // ... more configurations
    },
    
    // Other comment system configurations...
  },
  
  // ... other configurations
};
```

> **Tip**: Environment variable configuration is still supported, but configuration file approach is recommended.

For detailed configuration instructions, see [Comment System Configuration Guide](docs/COMMENTS.md).

## 🚀 Deployment

### Vercel Deployment (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/penjc/homepage)

1. Click the button above
2. Connect your GitHub account
3. Automatic deployment completed

### Netlify Deployment

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/penjc/homepage)

1. Click the button above
2. Connect your GitHub account
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### GitHub Pages Deployment

The project includes built-in GitHub Actions workflow that automatically deploys to GitHub Pages when pushed to the `main` branch.

#### Quick Deployment

1. Enable GitHub Pages in repository settings
2. Select GitHub Actions as deployment source
3. Push code to `main` branch for automatic deployment

#### Path Configuration

This project is specially optimized for GitHub Pages project pages, solving static resource path issues:

- **Local Development**: All resources use relative paths (e.g., `/favicon.svg`)
- **GitHub Pages**: Automatically adds project name prefix (e.g., `/homepage/favicon.svg`)

This is achieved through:

1. **Next.js Configuration** (`next.config.js`): Dynamically sets `basePath` and `assetPrefix` based on environment variables
2. **Build Script** (`scripts/update-manifest.js`): Automatically updates icon paths in `manifest.json`
3. **Utility Functions** (`lib/utils.ts`): `getAssetPath()` function handles static resource paths in code

#### Build Commands

```bash
npm run build:github    # GitHub Pages specific build
npm run preview:github  # Preview GitHub Pages build result
```

#### Environment Variables

The following environment variables are automatically set during deployment:
- `GITHUB_PAGES=true`: Enable GitHub Pages mode
- `NODE_ENV=production`: Production environment identifier

## 🛠️ Tech Stack

- **Framework**: [Next.js 13+](https://nextjs.org/) - React full-stack framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Icons**: [Heroicons](https://heroicons.com/) + [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- **Content**: [Markdown](https://www.markdownguide.org/) + [Gray Matter](https://github.com/jonschlinkert/gray-matter)
- **Code Highlighting**: [Prism.js](https://prismjs.com/)

## 📁 Project Structure

```
homepage/
├── app/                    # Next.js 13+ App Router
│   ├── about/             # About page
│   ├── blog/              # Blog related pages
│   ├── thoughts/          # Thoughts related pages
│   ├── books/             # Book pages
│   ├── friends/           # Friend links pages
│   └── projects/          # Project showcase pages
├── components/            # React components
├── content/               # Markdown content
│   ├── blog/             # Blog posts
│   └── thoughts/         # Thought posts
├── lib/                   # Utility functions
├── public/                # Static resources
├── styles/                # Style files
├── site.config.ts         # Website configuration
└── package.json
```

## 🤝 Contributing

We welcome all forms of contributions! Please refer to the [Contributing Guide](CONTRIBUTING.md).

### How to Contribute

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Thanks to all developers who have contributed to this project!

---

<div align="center">

**If this project helps you, please give it a ⭐️ for support**

Made with ❤️ by [penjc](https://pengjiancheng.com)

</div> 