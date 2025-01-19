import type { PageProps } from '.next/types/app/layout';

import ResultsPage from '@/components/Results/Results';
import { getQueryClient } from '@/get-query-client';
import { DEFAULT_STATE } from '@/hooks';
import { githubApiMiddleware } from '@/services/github';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ResultPage({ searchParams }: PageProps) {
  const { owner, repo, state = DEFAULT_STATE } = await searchParams;

  if (!owner || !repo) {
    throw new Error('Incorrect params');
  }

  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: [owner, repo, state, 'gh-issues'],
    queryFn: () => githubApiMiddleware({ owner, repo, state }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResultsPage />
    </HydrationBoundary>
  );
};
