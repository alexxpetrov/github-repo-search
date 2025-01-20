export type GitHubIssue = {
  id: number;
  title: string;
  number: number;
  state: 'open' | 'closed';
  pull_request?: {
    url: string;
  };
  user: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
};

export type GitHubRepoData = {
  owner: string;
  repo: string;
};
