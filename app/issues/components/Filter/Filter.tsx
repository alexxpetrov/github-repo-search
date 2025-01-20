'use client';

import type { FilterType } from '@/internal/store/issues';
import { useQueryParams } from '@/internal/hooks/useQueryParams';
import { generateUrlQuery } from '@/internal/lib/url/url';
import { useRepoListMutation } from '@/internal/queries/issues';
import { useIssuesStore } from '@/internal/store/issues';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared-components/ui/select';
import { usePathname, useRouter } from 'next/navigation';
import { memo } from 'react';

const FILTER_OPTIONS = {
  all: { id: 1, title: 'All', value: 'all' },
  open: { id: 2, title: 'Open', value: 'open' },
  closed: { id: 3, title: 'Closed', value: 'closed' },
  pr: { id: 4, title: 'Pull requests', value: 'pr' },
};

const FILTER_LIST = Object.values(FILTER_OPTIONS);

export const Filter = memo(() => {
  const { setLoading } = useIssuesStore(['setLoading']);

  const router = useRouter();
  const pathname = usePathname();
  const { owner, repo, state, searchParams } = useQueryParams();

  const mutation = useRepoListMutation({ owner, repo, state });

  const handleChangeFilter = (newFilter: FilterType) => {
    setLoading(true);
    mutation.mutate(newFilter);

    const query = generateUrlQuery(searchParams, newFilter);

    router.replace(`${pathname}${query}`);
  };

  const selectDefaultValue = FILTER_OPTIONS[state]?.value ?? '';

  return (
    <div className="mb-4 flex gap-2">
      <Select onValueChange={handleChangeFilter} defaultValue={selectDefaultValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent>
          {FILTER_LIST.map(({ id, value, title }) => (
            <SelectItem
              key={id}
              value={value}
            >
              {title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
