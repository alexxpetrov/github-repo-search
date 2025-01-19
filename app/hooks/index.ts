'use client';
import type { FilterType } from '@/store/repo';
import { useSearchParams } from 'next/navigation';

export const DEFAULT_STATE = 'all';
export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const owner = searchParams.get('owner') ?? '';
  const repo = searchParams.get('repo') ?? '';
  const state = (searchParams.get('state') ?? DEFAULT_STATE) as FilterType;

  return { owner, repo, state, searchParams };
};
