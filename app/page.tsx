'use client';

import type { ChangeEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { parseGithubUrl } from './internal/lib/url/url';
import { Button } from './shared-components/ui/button';
import { Input } from './shared-components/ui/input';

export default function Home() {
  const [formError, setFormError] = useState('');
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

  const resetFormError = () => {
    setFormError('');
  };

  const handleUserInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    if (formError) {
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
        {formError && <p className="text-red-500">Incorrect url. Please fix it</p>}
      </form>
    </div>
  );
}
