import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { repo: string } }
) {
  try {
    const repoPath = decodeURIComponent(params.repo);
    
    // 验证仓库路径格式
    if (!repoPath || !repoPath.includes('/')) {
      return NextResponse.json(
        { error: 'Invalid repository path' },
        { status: 400 }
      );
    }

    const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Personal-Website',
        // 如果有GitHub token，可以添加认证头以提高API限制
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
      // 缓存5分钟
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Repository not found' },
          { status: 404 }
        );
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // 只返回我们需要的数据
    const repoInfo = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      description: data.description,
      updated_at: data.updated_at,
      created_at: data.created_at,
      topics: data.topics || [],
      license: data.license?.name || null,
    };

    return NextResponse.json(repoInfo);
  } catch (error) {
    console.error('Error fetching GitHub repo info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repository information' },
      { status: 500 }
    );
  }
} 