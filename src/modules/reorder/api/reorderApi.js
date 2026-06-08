import * as mock from '@/api/mock/reorder.mock';

export const reorderApi = {
  getMetrics: () => mock.getReorderMetrics(),
  list: (params) => mock.listReorderSuggestions(params),
  getRecommendations: () => mock.getTopRecommendations(),
};

export default reorderApi;
