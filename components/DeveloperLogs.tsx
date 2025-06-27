'use client';

import { useState, useEffect } from 'react';

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  html_url: string;
}

export default function DeveloperLogs() {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //
  const GITHUB_USERNAME = 'UCYenyen'; 
  const REPO_NAME = 'Hackonomics-website'; 

  useEffect(() => {
    fetchCommits();
  }, []);

  const fetchCommits = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/commits?per_page=20`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      setCommits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch commits');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateMessage = (message: string, maxLength: number = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2D2D2D] mb-8 font-mono">Developer Logs</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B85450]"></div>
            <span className="ml-3 text-[#2D2D2D] font-mono">Loading commits...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2D2D2D] mb-8 font-mono">Developer Logs</h1>
          <div className="bg-white rounded-lg p-6 border border-[#B85450] shadow-sm">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">⚠️</span>
              <h2 className="text-xl font-bold text-[#B85450] font-mono">Error Loading Commits</h2>
            </div>
            <p className="text-[#2D2D2D] mb-4">{error}</p>
            <button
              onClick={fetchCommits}
              className="bg-[#B85450] text-white px-4 py-2 rounded font-mono hover:bg-opacity-90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D2D2D] mb-4 font-mono">Developer Logs</h1>
          <p className="text-[#4A4A4A] font-mono">
            Follow the development progress of Financial Tycoon 8-Bit through our GitHub commits
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#B85450] rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">📝</span>
              </div>
              <div>
                <h2 className="text-[#2D2D2D] font-bold font-mono">Repository Activity</h2>
                <p className="text-[#4A4A4A] text-sm font-mono">
                  {GITHUB_USERNAME}/{REPO_NAME}
                </p>
              </div>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}/${REPO_NAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4A4A4A] text-white px-4 py-2 rounded font-mono text-sm hover:bg-[#B85450] transition-colors"
            >
              View on GitHub →
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {commits.map((commit) => (
            <div
              key={commit.sha}
              className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#B85450] rounded-full flex items-center justify-center mr-4">
                    {commit.author?.avatar_url ? (
                      <img
                        src={commit.author.avatar_url}
                        alt={commit.author.login}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-white text-lg">👨‍💻</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[#2D2D2D] font-bold font-mono text-sm">
                      {commit.author?.login || commit.commit.author.name}
                    </p>
                    <p className="text-[#4A4A4A] text-xs font-mono">
                      {formatDate(commit.commit.author.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#B85450] font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {commit.sha.substring(0, 7)}
                  </span>
                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B85450] hover:text-[#2D2D2D] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="ml-14">
                <p className="text-[#2D2D2D] font-mono text-sm leading-relaxed">
                  {truncateMessage(commit.commit.message)}
                </p>
                {commit.commit.message.length > 100 && (
                  <button
                    onClick={() => {
                      const element = document.getElementById(`commit-${commit.sha}`);
                      if (element) {
                        element.classList.toggle('hidden');
                      }
                    }}
                    className="text-[#B85450] text-xs font-mono mt-2 hover:text-[#2D2D2D] transition-colors"
                  >
                    Show more...
                  </button>
                )}
                <div id={`commit-${commit.sha}`} className="hidden mt-2">
                  <p className="text-[#2D2D2D] font-mono text-sm leading-relaxed">
                    {commit.commit.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {commits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
              <span className="text-[#4A4A4A] text-2xl">📝</span>
            </div>
            <p className="text-[#2D2D2D] font-mono">No commits found</p>
          </div>
        )}
      </div>
    </div>
  );
}