'use client';
import type { ChangeEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { parseGithubUrl } from '@/lib/url/url';
import { useGithubStore } from '@/store/repo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchPage() {
  const { resetFormError, error, setFormError } = useGithubStore(['resetFormError', 'setFormError', 'error']);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = parseGithubUrl(inputValue);
    if (!parsed) {
      setFormError('Invalid GitHub URL.');
      return;
    }

    const url = `result/?owner=${parsed.owner}&repo=${parsed.repo}`;

    router.push(url);
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
