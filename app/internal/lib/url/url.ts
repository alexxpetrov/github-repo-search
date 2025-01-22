import type { FilterType } from '@/internal/types';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { QUERY_STATE_NAME } from '@/internal/hooks/useQueryParams';
import { ISSUE_ROUTE } from '@/internal/routes';

export function parseGithubUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') {
      return null;
    }
    const [owner, repo] = parsed.pathname.replace(/^\/+/, '').split('/');
    if (!owner || !repo) {
      return null;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('owner', owner);
    searchParams.set('repo', repo);
    return `${ISSUE_ROUTE}?${searchParams.toString()}`;
  } catch {
    return null;
  }
}

export const generateUrlQuery = (searchParams: ReadonlyURLSearchParams, newFilter: FilterType) => {
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  current.set(QUERY_STATE_NAME, newFilter);

  const search = current.toString();
  const query = search ? `?${search}` : '';

  return query;
};
