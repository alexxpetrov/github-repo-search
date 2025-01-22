'use client';
import type { FilterType } from '../types';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_ISSUE_STATE } from '../lib/constants';

export const QUERY_STATE_NAME = 'state';
const QUERY_OWNER_NAME = 'owner';
const QUERY_REPO_NAME = 'repo';

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const owner = searchParams.get(QUERY_OWNER_NAME) ?? '';
  const repo = searchParams.get(QUERY_REPO_NAME) ?? '';
  const state = (searchParams.get(QUERY_STATE_NAME) ?? DEFAULT_ISSUE_STATE) as FilterType;

  return { owner, repo, state, searchParams };
};
