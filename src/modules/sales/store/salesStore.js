import { createListStore } from '@/store/createListStore';
import { DEFAULT_PAGE_SIZE } from '../constants';

/** Sales list UI state: search + mode + date-range filters + pagination. */
export const useSalesStore = createListStore(
  { mode: undefined, from: undefined, to: undefined },
  DEFAULT_PAGE_SIZE,
);

export default useSalesStore;
