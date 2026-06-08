import { createListStore } from '@/store/createListStore';
import { DEFAULT_PAGE_SIZE } from '../constants';

/** Purchases list UI state: search + supplier/status filters + pagination. */
export const usePurchasesStore = createListStore(
  { supplierId: undefined, status: undefined },
  DEFAULT_PAGE_SIZE,
);

export default usePurchasesStore;
