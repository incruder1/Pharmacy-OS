import dayjs from 'dayjs';
import { mockRequest } from './network';
import { notificationsSeed } from './notifications.data';

let store = structuredClone(notificationsSeed);

function applyFilters(params = {}) {
  const { type, dateRange } = params;
  return store.filter((n) => {
    if (type && n.type !== type) return false;
    if (dateRange) {
      const created = dayjs(n.createdAt);
      const [start, end] = dateRange;
      if (start && created.isBefore(dayjs(start), 'day')) return false;
      if (end && created.isAfter(dayjs(end), 'day')) return false;
    }
    return true;
  });
}

export function listNotifications(params = {}) {
  const filtered = applyFilters(params).sort(
    (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
  );
  return mockRequest(filtered);
}

export function getUnreadCount() {
  const count = store.filter((n) => !n.read).length;
  return mockRequest({ count });
}

export function markNotificationRead(id) {
  store = store.map((n) => (n.id === id ? { ...n, read: true } : n));
  return mockRequest({ ok: true });
}

export function markAllNotificationsRead() {
  store = store.map((n) => ({ ...n, read: true }));
  return mockRequest({ ok: true });
}
