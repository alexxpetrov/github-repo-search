import type { Endpoints } from '@octokit/types';

import { DEFAULT_STATE } from '@/hooks';
import { FilterType } from '@/store/repo';
import { Octokit } from 'octokit';
import { config } from '../config';

const octo = new Octokit({ auth: config.OCTO_API_KEY });

export type IIssueState = 'all' | 'open' | 'closed' | undefined;
export type IGithubPullsApiParams = { owner: string; repo: string };
export type IGithubIssuesApiParams = IGithubPullsApiParams & { state: IIssueState };
export type IRepoIssues = Endpoints['GET /repos/{owner}/{repo}/issues']['response'];
export type IRepoPulls = Endpoints['GET /repos/{owner}/{repo}/pulls']['response'];

export const githubApi = {
  fetchGithubIssues: async ({ owner, repo, state }: IGithubIssuesApiParams): Promise<IRepoIssues['data'] | []> => {
    try {
      const { data } = await octo.request('GET /repos/{owner}/{repo}/issues', {
        owner,
        repo,
        state,
        per_page: 100,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return data || [];
    } catch {
      throw new Error('Failed');
    }
  },
  fetchGithubPRs: async ({ owner, repo }: IGithubPullsApiParams): Promise<IRepoPulls['data'] | []> => {
    try {
      const { data } = await octo.request('GET /repos/{owner}/{repo}/pulls', {
        owner,
        repo,
        state: DEFAULT_STATE,
        per_page: 100,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return data || [];
    } catch {
      throw new Error('Failed');
    }
  },
};

export type IGithubApiParams = IGithubPullsApiParams & { state: FilterType };

export const githubApiMiddleware = async ({ owner, repo, state }: IGithubApiParams) => {
  switch (state) {
    case FilterType.ALL:
      return githubApi.fetchGithubIssues({ owner, repo, state });
    case FilterType.PR:
      return githubApi.fetchGithubPRs({ owner, repo });
    case FilterType.OPEN:
      return githubApi.fetchGithubIssues({ owner, repo, state });
    case FilterType.CLOSED:
      return githubApi.fetchGithubIssues({ owner, repo, state });
    default:
      return githubApi.fetchGithubIssues({ owner, repo, state: 'all' });
  }
};
