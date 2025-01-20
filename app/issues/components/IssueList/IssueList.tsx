'use client';

import { useQueryParams } from '@/internal/hooks/useQueryParams';
import { useIssueListQuery } from '@/internal/queries/issues';
import { memo } from 'react';
import { Issue } from '../Issue/Issue';
import { SkeletonDemo } from '../Skeleton/Skeleton';

export const IssueList = memo(() => {
  const { owner, repo, state } = useQueryParams();

  const { data, isFetching } = useIssueListQuery({ owner, repo, state });

  if (isFetching) {
    return <SkeletonDemo />;
  }

  if (!data?.length) {
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
