import type { StoreApi, UseBoundStore } from 'zustand';
import type { useShallow } from 'zustand/react/shallow';

// Types for the function arguments.
export type CreateStoreHookArgs<StoreState> = {
  store: UseBoundStore<StoreApi<StoreState>>;
  useShallow: typeof useShallow;
};

/**
 * Create a usable hook form of a store, that works both with a selector (function)
 * and an array of keys. The hook applies shallow equality checks if provided.
 *
 * @param store The zustand store to create a hook for.
 * @param useShallow The shallow comparison function from 'zustand/react' or 'zustand/shallow'.
 * @returns A typed hook that can select from the store via a function or an array of keys.
 *
 * @example
 * const useAuthStore = createStoreHook<AuthState & AuthActions>({
 *   store: myZustandStore,
 *   useShallow,
 * });
 *
 * // Selecting one or more properties by key:
 * const { selectUser } = useAuthStore(['selectUser']);
 *
 * // Selecting using a function:
 * const selectUser = useAuthStore(state => state.selectUser);
 */
type SelectorFunction<T> = (state: T) => any;
type Selector<T> = SelectorFunction<T> | (keyof T)[];

export function createStoreHook<StoreState>({
  store,
  useShallow,
}: CreateStoreHookArgs<StoreState>): {
    <U>(selector: (state: StoreState) => U): U;
    <T extends keyof StoreState>(selector: T[]): Pick<StoreState, T>;
  } {
  function useSelector(selector: Selector<StoreState>): ReturnType<SelectorFunction<StoreState>> {
    return store(
      useShallow(
        typeof selector === 'function'
          ? selector
          : (state: StoreState) => selector.reduce((acc, key) => ({ ...acc, [key]: state[key] }), {}),
      ),
    );
  }

  return useSelector;
}
