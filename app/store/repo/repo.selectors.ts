import { useGithubStore } from './repo.store';

export function useLoading() {
  return useGithubStore(state => state.loading);
}
