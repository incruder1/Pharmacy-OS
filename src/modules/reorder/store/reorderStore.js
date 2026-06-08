import { createListStore } from '@/store/createListStore';

export const useReorderStore = createListStore({ health: undefined, category: undefined }, 10);

export default useReorderStore;
