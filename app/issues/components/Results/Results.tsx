import { ROOT_ROUTE } from '@/internal/routes';
import { Button } from '@/shared-components/ui/button';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';
import { Filter } from '../Filter/Filter';
import { SkeletonDemo } from '../Skeleton/Skeleton';

const DynamicIssueList = dynamic(() => import('@/issues/components/IssueList/IssueList'));

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
        <DynamicIssueList />
      </Suspense>
    </div>
  );
}
