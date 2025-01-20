import type { IGithubApiParams } from '@/internal/services/github';
import type { FilterType } from '@/internal/store/issues';
import { githubApiMiddleware } from '@/internal/services/github';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { getQueryClient } from '../utils';
import { GITHUB_ISSUES_QUERY_KEY } from './constants';

export const useIssueListMutation = ({ owner, repo, state }: IGithubApiParams) => useMutation({
  mutationKey: [owner, repo, state, GITHUB_ISSUES_QUERY_KEY],
  mutationFn: (filter: FilterType) => githubApiMiddleware({ owner, repo, state: filter }),
});

export const useIssueListSuspenseQuery = ({ owner, repo, state }: IGithubApiParams) => useSuspenseQuery({
  queryKey: [owner, repo, state, GITHUB_ISSUES_QUERY_KEY],
  queryFn: () => githubApiMiddleware({ owner, repo, state }),
});

export const prefetchIssues = ({ owner, repo, state }: IGithubApiParams) => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: [owner, repo, state, GITHUB_ISSUES_QUERY_KEY],
    queryFn: () => githubApiMiddleware({ owner, repo, state }),
  });

  return queryClient;
};
