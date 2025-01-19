import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';
import { createStoreHook } from '../config';

type GithubStore = {
  error: string | null;
  loading: boolean;
  resetFormError: () => void;
  setLoading: (loading: boolean) => Promise<void>;
  setFormError: (error: string) => void;
};

export const githubStore = create(immer<GithubStore>(set => ({
  error: null,
  loading: false,

  setLoading: async (loading: boolean) => set({ loading }),
  setFormError: (error: string) => {
    set({ error });
  },
  resetFormError: () => set({ error: null }),
})));

export const useGithubStore = createStoreHook<GithubStore>({ store: githubStore, useShallow });
