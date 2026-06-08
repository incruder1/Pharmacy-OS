import * as mock from '@/api/mock/notifications.mock';

export const notificationsApi = {
  list: (params) => mock.listNotifications(params),
  unreadCount: () => mock.getUnreadCount(),
  markRead: (id) => mock.markNotificationRead(id),
  markAllRead: () => mock.markAllNotificationsRead(),
};

export default notificationsApi;
