'use client'; // Error boundaries must be Client Components

import { ROOT_ROUTE } from '@/internal/routes';
import { Button } from '@/shared-components/ui/button';
import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  return (
    <div className="container mx-auto mt-10">
      <h2>Failed to fetch data.</h2>
      <Button onClick={() => router.replace(ROOT_ROUTE)} variant="secondary" className="my-4">
        Go to search
      </Button>
    </div>
  );
}
