import { createListStore } from '@/store/createListStore';
import { DEFAULT_PAGE_SIZE } from '../constants';

/**
 * Products list UI state: search + category/manufacturer filters + pagination.
 * Drawer (create/edit) open-state is handled per-page via useDisclosure.
 */
export const useProductsStore = createListStore(
  { category: undefined, manufacturer: undefined },
  DEFAULT_PAGE_SIZE,
);

export default useProductsStore;
