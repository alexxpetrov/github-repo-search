'use client';

import { useQueryParams } from '@/hooks';
import { useRepoListSuspenseQuery } from '@/queries/repo';
import { useGithubStore } from '@/store/repo';
import { memo, useEffect } from 'react';
import { Issue } from '../Issue/Issue';
import { SkeletonDemo } from '../Skeleton/Skeleton';

export const IssueList = memo(() => {
  const { loading, setLoading } = useGithubStore(['setLoading', 'loading']);
  const { owner, repo, state } = useQueryParams();

  const { data } = useRepoListSuspenseQuery({ owner, repo, state });

  useEffect(() => {
    setLoading(false);
  }, [data, setLoading]);

  if (loading) {
    return <SkeletonDemo />;
  }

  if (!data.length) {
    return <div>No results</div>;
  }

  return (
    <ul className="mb-4 space-y-2">
      {data.map(issue => (
        <Issue issue={issue} key={issue.id} />
      ))}
    </ul>
  );
});
