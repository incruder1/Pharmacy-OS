import { createListStore } from '@/store/createListStore';
import { DEFAULT_PAGE_SIZE } from '../constants';

/** Inventory list UI state: search + status/expiry filters + pagination. */
export const useInventoryStore = createListStore(
  { status: undefined, expiryWindow: undefined },
  DEFAULT_PAGE_SIZE,
);

export default useInventoryStore;
