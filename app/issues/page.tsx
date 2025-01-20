import type { PageProps } from '.next/types/app/layout';
import { prefetchIssues } from '@/internal/queries/issues';

import { DEFAULT_STATE } from '@/internal/store/issues/constants';
import Results from '@/issues/components/Results/Results';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ResultPage({ searchParams }: PageProps) {
  const { owner, repo, state = DEFAULT_STATE } = await searchParams;

  if (!owner || !repo) {
    throw new Error('Incorrect params');
  }

  const queryClient = prefetchIssues({ owner, repo, state });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Results />
    </HydrationBoundary>
  );
};
