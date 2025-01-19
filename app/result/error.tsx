'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  return (
    <div className="container mx-auto mt-10">
      <h2>Something went wrong! Try again</h2>
      <Button onClick={() => router.replace('/')} variant="secondary" className="my-4">
        Go to search
      </Button>
    </div>
  );
}
