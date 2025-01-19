import type { IGithubApiParams } from '@/services/github';
import type { FilterType } from '@/store/repo';
import { githubApiMiddleware } from '@/services/github';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

export const useRepoListMutation = ({ owner, repo, state }: IGithubApiParams) => useMutation({
  mutationKey: [owner, repo, state, 'gh-issues'],
  mutationFn: (filter: FilterType) => githubApiMiddleware({ owner, repo, state: filter }),
});

export const useRepoListSuspenseQuery = ({ owner, repo, state }: IGithubApiParams) => useSuspenseQuery({
  queryKey: [owner, repo, state, 'gh-issues'],
  queryFn: () => githubApiMiddleware({ owner, repo, state }),
});
