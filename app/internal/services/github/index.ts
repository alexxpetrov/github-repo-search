import type { Endpoints } from '@octokit/types';

import { Octokit } from 'octokit';
import { config } from '../config';
import { DEFAULT_ISSUE_STATE } from '@/internal/lib/constants';
import { FilterType } from '@/internal/types';

const octo = new Octokit({ auth: config.OCTO_API_KEY });

export type IIssueState = 'all' | 'open' | 'closed' | undefined;
export type IGithubPullsApiParams = { owner: string; repo: string };
export type IGithubIssuesApiParams = IGithubPullsApiParams & { state: IIssueState };
export type IRepoIssues = Endpoints['GET /repos/{owner}/{repo}/issues']['response'];
export type IRepoPulls = Endpoints['GET /repos/{owner}/{repo}/pulls']['response'];

const ITEMS_PER_PAGE_LIMIT = 100;

export const githubApi = {
  fetchGithubIssues: async ({ owner, repo, state }: IGithubIssuesApiParams): Promise<IRepoIssues['data'] | []> => {
    try {
      const { data } = await octo.request('GET /repos/{owner}/{repo}/issues', {
        owner,
        repo,
        state,
        per_page: ITEMS_PER_PAGE_LIMIT,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      return data;
    } catch {
      throw new Error('Source not found. Please retry search');
    }
  },
  fetchGithubPRs: async ({ owner, repo }: IGithubPullsApiParams): Promise<IRepoPulls['data'] | []> => {
    try {
      const { data } = await octo.request('GET /repos/{owner}/{repo}/pulls', {
        owner,
        repo,
        state: DEFAULT_ISSUE_STATE,
        per_page: ITEMS_PER_PAGE_LIMIT,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return data;
    } catch {
      throw new Error('Source not found. Please retry search');
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
      return Promise.resolve([]);
  }
};
