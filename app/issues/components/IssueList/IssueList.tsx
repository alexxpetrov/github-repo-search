'use client';

import { useQueryParams } from '@/internal/hooks/useQueryParams';
import { useIssueListSuspenseQuery } from '@/internal/queries/issues';
import { useIssuesStore } from '@/internal/store/issues';
import { memo, useEffect } from 'react';
import { Issue } from '../Issue/Issue';
import { SkeletonDemo } from '../Skeleton/Skeleton';

export const IssueList = memo(() => {
  const { loading, setLoading } = useIssuesStore(['setLoading', 'loading']);
  const { owner, repo, state } = useQueryParams();

  const { data } = useIssueListSuspenseQuery({ owner, repo, state });

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
