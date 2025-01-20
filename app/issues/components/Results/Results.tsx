'use client';

import { ROOT_ROUTE } from '@/internal/routes';
import { IssueList } from '@/issues/components/IssueList/IssueList';
import { Button } from '@/shared-components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { Filter } from '../Filter/Filter';
import { SkeletonDemo } from '../Skeleton/Skeleton';

export default function Results() {
  return (
    <div className="container mx-auto mt-10 max-w-xl">
      <Link href={ROOT_ROUTE}>
        <Button variant="secondary" className="my-4">
          Go Back
        </Button>
      </Link>
      <Filter />
      <Suspense fallback={<SkeletonDemo />}>
        <IssueList />
      </Suspense>
    </div>
  );
}
