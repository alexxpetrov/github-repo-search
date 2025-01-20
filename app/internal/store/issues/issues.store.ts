import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';
import { createStoreHook } from '../config';

type IssuesStore = {
  error: string | null;
  resetFormError: () => void;
  setFormError: (error: string) => void;
};

export const issuesStore = create(immer<IssuesStore>(set => ({
  error: null,

  setFormError: (error: string) => {
    set({ error });
  },
  resetFormError: () => set({ error: null }),
})));

export const useIssuesStore = createStoreHook<IssuesStore>({ store: issuesStore, useShallow });
