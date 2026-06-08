import { createListStore } from '@/store/createListStore';
import { DEFAULT_PAGE_SIZE } from '../constants';

/** Suppliers list UI state: search + dues filter + pagination. */
export const useSuppliersStore = createListStore({ hasDues: undefined }, DEFAULT_PAGE_SIZE);

export default useSuppliersStore;
