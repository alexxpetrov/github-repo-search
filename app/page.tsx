'use client';

import type { ChangeEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { parseGithubUrl } from './internal/lib/url/url';
import { useIssuesStore } from './internal/store/issues';
import { Button } from './shared-components/ui/button';
import { Input } from './shared-components/ui/input';

export default function Home() {
  const { resetFormError, error, setFormError } = useIssuesStore(['resetFormError', 'setFormError', 'error']);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUrl = parseGithubUrl(inputValue);

    if (!newUrl) {
      setFormError('Invalid GitHub URL.');
      return;
    }

    router.push(newUrl);
  };

  const handleUserInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    if (error) {
      resetFormError();
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-xl">
      <h1 className="mb-4 text-2xl font-bold">GitHub Issue Search</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="https://github.com/vercel/next.js"
          value={inputValue}
          onChange={handleUserInput}
        />
        <Button type="submit">
          Search
        </Button>
        {error && <p className="text-red-500">Incorrect url. Please fix it</p>}
      </form>
    </div>
  );
}
