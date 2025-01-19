'use client';
import type { FilterType } from '@/store/repo';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryParams } from '@/hooks';
import { useRepoListMutation } from '@/queries/repo';
import { useGithubStore } from '@/store/repo';
import { usePathname, useRouter } from 'next/navigation';
import { memo } from 'react';

export const Filter = memo(() => {
  const { setLoading } = useGithubStore(['setLoading']);

  const router = useRouter();
  const pathname = usePathname();
  const { owner, repo, state, searchParams } = useQueryParams();

  const mutation = useRepoListMutation({ owner, repo, state });

  const handleChangeFilter = (newFilter: FilterType) => {
    setLoading(true);
    mutation.mutate(newFilter);

    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set('state', newFilter);

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.replace(`${pathname}${query}`);
  };

  return (
    <div className="mb-4 flex gap-2">

      <Select onValueChange={handleChangeFilter} defaultValue={state}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
          <SelectItem value="pr">Pull Requests</SelectItem>
        </SelectContent>
      </Select>

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filters</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Issue type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={!!filter.open}
            onCheckedChange={() => handleChangeFilter('open')}
          >
            Open
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={!!filter.closed}
            onCheckedChange={() => handleChangeFilter('closed')}
          >
            Closed
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={!!filter.pr}
            onCheckedChange={() => handleChangeFilter('pr')}
          >
            Pull Requests
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

    </div>
  );
});
