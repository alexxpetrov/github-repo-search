'use client';

import { IssueList } from '@/issues/components/IssueList/IssueList';
import { Button } from '@/shared-components/ui/button';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Filter } from '../Filter/Filter';
import { SkeletonDemo } from '../Skeleton/Skeleton';

export default function Results() {
  const router = useRouter();

  return (
    <div className="container mx-auto mt-10 max-w-xl">
      <Button onClick={() => router.back()} variant="secondary" className="my-4">
        Go Back
      </Button>
      <Filter />
      <Suspense fallback={<SkeletonDemo />}>
        <IssueList />
      </Suspense>
    </div>
  );
}
