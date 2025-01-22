'use client';
import type { FilterType } from '@/internal/store/issues';
import { DEFAULT_STATE } from '@/internal/store/issues/constants';
import { useSearchParams } from 'next/navigation';

export const QUERY_STATE_NAME = 'state';
const QUERY_OWNER_NAME = 'owner';
const QUERY_REPO_NAME = 'repo';

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const owner = searchParams.get(QUERY_OWNER_NAME) ?? '';
  const repo = searchParams.get(QUERY_REPO_NAME) ?? '';
  const state = (searchParams.get(QUERY_STATE_NAME) ?? DEFAULT_STATE) as FilterType;

  return { owner, repo, state, searchParams };
};
