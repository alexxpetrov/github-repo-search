'use client';

import { Filter } from '@/components/Filter/Filter';
import { IssueList } from '@/components/IssueList/IssueList';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { SkeletonDemo } from '../Skeleton/Skeleton';

export default function ResultsPage() {
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
