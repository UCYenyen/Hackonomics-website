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
        throw new Error(`Error GitHub API: ${response.status}`);
      }

      const data = await response.json();
      setCommits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengambil commits');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
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
      <div className="min-h-screen bg-[#d1d1d1] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#F5F0F6] mb-8 font-mono">Log Developer</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AC5654]"></div>
            <span className="ml-3 text-[#F5F0F6] font-mono">Memuat commits...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#221C1C] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#F5F0F6] mb-8 font-mono">Log Developer</h1>
          <div className="bg-[#464141] rounded-lg p-6 border border-[#AC5654]">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">⚠️</span>
              <h2 className="text-xl font-bold text-[#AC5654] font-mono">Error Memuat Commits</h2>
            </div>
            <p className="text-[#F5F0F6] mb-4">{error}</p>
            <button
              onClick={fetchCommits}
              className="bg-[#AC5654] text-[#F5F0F6] px-4 py-2 rounded font-mono hover:bg-opacity-80 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d1d1d1] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-[#221C1C] p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#F5F0F6] mb-4 font-mono">Developer Logs</h1>
          <p className="text-[#F5F0F6] opacity-80 font-mono">
            Follow the development progress of Fundation through our GitHub commits
          </p>
        </div>

        <div className="bg-[#464141] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#AC5654] rounded-full flex items-center justify-center mr-3">
                <span className="text-[#F5F0F6] text-sm">📝</span>
              </div>
              <div>
                <h2 className="text-[#F5F0F6] font-bold font-mono">Aktivitas Repository</h2>
                <p className="text-[#F5F0F6] opacity-60 text-sm font-mono">
                  {GITHUB_USERNAME}/{REPO_NAME}
                </p>
              </div>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}/${REPO_NAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#221C1C] text-[#F5F0F6] px-4 py-2 rounded font-mono text-sm hover:bg-[#AC5654] transition-colors"
            >
              View on GitHub →
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {commits.map((commit) => (
            <div
              key={commit.sha}
              className="bg-[#464141] rounded-lg p-6 hover:bg-opacity-80 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#AC5654] rounded-full flex items-center justify-center mr-4">
                    {commit.author?.avatar_url ? (
                      <img
                        src={commit.author.avatar_url}
                        alt={commit.author.login}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-[#F5F0F6] text-lg">👨‍💻</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[#F5F0F6] font-bold font-mono text-sm">
                      {commit.author?.login || commit.commit.author.name}
                    </p>
                    <p className="text-[#F5F0F6] opacity-60 text-xs font-mono">
                      {formatDate(commit.commit.author.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#AC5654] font-mono text-xs bg-[#221C1C] px-2 py-1 rounded">
                    {commit.sha.substring(0, 7)}
                  </span>
                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#AC5654] hover:text-[#F5F0F6] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="ml-14">
                <div id={`commit-${commit.sha}-truncated`}>
                  <p className="text-[#F5F0F6] font-mono text-sm leading-relaxed">
                    {truncateMessage(commit.commit.message)}
                  </p>
                  {commit.commit.message.length > 100 && (
                    <button
                      onClick={() => {
                        const truncatedElement = document.getElementById(`commit-${commit.sha}-truncated`);
                        const fullElement = document.getElementById(`commit-${commit.sha}-full`);
                        if (truncatedElement && fullElement) {
                          truncatedElement.classList.add('hidden');
                          fullElement.classList.remove('hidden');
                        }
                      }}
                      className="text-[#AC5654] text-xs font-mono mt-2 hover:text-[#F5F0F6] transition-colors"
                    >
                      Show more...
                    </button>
                  )}
                </div>
                
                <div id={`commit-${commit.sha}-full`} className="hidden">
                  <p className="text-[#F5F0F6] font-mono text-sm leading-relaxed">
                    {commit.commit.message}
                  </p>
                  {commit.commit.message.length > 100 && (
                    <button
                      onClick={() => {
                        const truncatedElement = document.getElementById(`commit-${commit.sha}-truncated`);
                        const fullElement = document.getElementById(`commit-${commit.sha}-full`);
                        if (truncatedElement && fullElement) {
                          truncatedElement.classList.remove('hidden');
                          fullElement.classList.add('hidden');
                        }
                      }}
                      className="text-[#AC5654] text-xs font-mono mt-2 hover:text-[#F5F0F6] transition-colors"
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {commits.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#464141] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#F5F0F6] text-2xl">📝</span>
            </div>
            <p className="text-[#F5F0F6] font-mono">No commits found</p>
          </div>
        )}
      </div>
    </div>
  );
}