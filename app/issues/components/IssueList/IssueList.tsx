'use client';

import { useQueryParams } from '@/internal/hooks/useQueryParams';
import { useSuspenseIssueListQuery } from '@/internal/queries/issues';
import { Issue } from '../Issue/Issue';
import { SkeletonDemo } from '../Skeleton/Skeleton';

export default function IssueList() {
  const { owner, repo, state } = useQueryParams();

  const { data, isFetching } = useSuspenseIssueListQuery({ owner, repo, state });

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
}
