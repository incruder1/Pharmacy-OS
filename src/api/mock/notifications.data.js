import dayjs from 'dayjs';

const now = dayjs();

export const notificationsSeed = [
  { id: 'N-001', type: 'expiry', title: 'Augmentin 625 expiring in 8 days', body: 'Batch AG2231 · 40 units · ₹5,680 at risk', read: false, createdAt: now.subtract(12, 'minute').toISOString() },
  { id: 'N-002', type: 'low_stock', title: 'Telma 40 is critically low', body: '8 units left · avg 4/day · reorder suggested', read: false, createdAt: now.subtract(28, 'minute').toISOString() },
  { id: 'N-003', type: 'purchase', title: 'PO-3391 received from Sun Pharma', body: '38 items · ₹1,42,500 · invoice pending match', read: false, createdAt: now.subtract(1, 'hour').toISOString() },
  { id: 'N-004', type: 'payment', title: '₹98,750 due to Mankind Pharma', body: 'Outstanding payment · due in 3 days', read: true, createdAt: now.subtract(2, 'hour').toISOString() },
  { id: 'N-005', type: 'system', title: 'GST filing reminder', body: 'GSTR-1 for May due on 11th', read: false, createdAt: now.subtract(3, 'hour').toISOString() },
  { id: 'N-006', type: 'expiry', title: 'Dolo 650 batch expired', body: 'Batch DL6502 · 320 units · write-off ₹5,760', read: false, createdAt: now.subtract(4, 'hour').toISOString() },
  { id: 'N-007', type: 'low_stock', title: 'Glycomet GP2 out of stock', body: '0 units · 6 sales/day last week', read: true, createdAt: now.subtract(5, 'hour').toISOString() },
  { id: 'N-008', type: 'purchase', title: 'Cipla Wholesale delivery scheduled', body: 'PO-3390 · ETA tomorrow 10 AM', read: true, createdAt: now.subtract(6, 'hour').toISOString() },
  { id: 'N-009', type: 'expiry', title: 'Montair LC — 21 days to expiry', body: '65 units · consider discount sale', read: false, createdAt: now.subtract(8, 'hour').toISOString() },
  { id: 'N-010', type: 'payment', title: 'Payment received from MedPlus Dist', body: '₹54,300 cleared via NEFT', read: true, createdAt: now.subtract(1, 'day').toISOString() },
  { id: 'N-011', type: 'low_stock', title: 'Thyronorm 50mcg below reorder', body: '12 units · reorder level 60', read: false, createdAt: now.subtract(1, 'day').toISOString() },
  { id: 'N-012', type: 'system', title: 'New feature: Owner Insights', body: 'Track revenue, profit & dead stock in one view', read: true, createdAt: now.subtract(2, 'day').toISOString() },
  { id: 'N-013', type: 'expiry', title: 'Shelcal 500 expiring in 42 days', body: '88 units · ₹5,456 inventory value', read: true, createdAt: now.subtract(2, 'day').toISOString() },
  { id: 'N-014', type: 'purchase', title: 'Purchase entry draft saved', body: 'PO draft with 5 line items', read: true, createdAt: now.subtract(3, 'day').toISOString() },
  { id: 'N-015', type: 'low_stock', title: 'Ecosprin 75 critically low', body: '5 units · fast mover', read: false, createdAt: now.subtract(3, 'day').toISOString() },
  { id: 'N-016', type: 'payment', title: 'Alkem Distribution outstanding', body: '₹31,200 payable', read: true, createdAt: now.subtract(4, 'day').toISOString() },
  { id: 'N-017', type: 'system', title: 'Backup completed', body: 'Cloud sync successful at 2:00 AM', read: true, createdAt: now.subtract(5, 'day').toISOString() },
  { id: 'N-018', type: 'expiry', title: 'Liv 52 DS expiring in 6 days', body: '18 bottles · urgent action needed', read: false, createdAt: now.subtract(6, 'day').toISOString() },
  { id: 'N-019', type: 'low_stock', title: 'Pantop 40 out of stock', body: '0 units · 3 sales/day', read: false, createdAt: now.subtract(7, 'day').toISOString() },
  { id: 'N-020', type: 'purchase', title: 'Apollo Supply order confirmed', body: 'PO-3388 · 17 items', read: true, createdAt: now.subtract(8, 'day').toISOString() },
];
