import dayjs from 'dayjs';
import { suppliersSeed } from './suppliers.data';

/**
 * Realistic expiry-focused batch data for Indian pharmacies.
 * Each row is a purchasable batch with supplier, cost, and expiry window.
 */
export const expiryBatchesSeed = [
  { id: 'EXP-001', productName: 'Augmentin 625 Duo', genericName: 'Amoxicillin + Clavulanate', category: 'Tablet', batchNumber: 'AG2231', supplierId: 'SUP-SUN01', supplierName: 'Sun Pharma Distributors', quantity: 40, mrp: 198, costPrice: 142, expiryDays: -12 },
  { id: 'EXP-002', productName: 'Montair LC Tablet', genericName: 'Montelukast + Levocetirizine', category: 'Tablet', batchNumber: 'ML0098', supplierId: 'SUP-CIP01', supplierName: 'Cipla Wholesale', quantity: 65, mrp: 285, costPrice: 198, expiryDays: 8 },
  { id: 'EXP-003', productName: 'Zifi 200 Tablet', genericName: 'Cefixime', category: 'Tablet', batchNumber: 'ZF4410', supplierId: 'SUP-FDC01', supplierName: 'FDC Pharma Agency', quantity: 30, mrp: 165, costPrice: 112, expiryDays: 18 },
  { id: 'EXP-004', productName: 'Becosules Capsule', genericName: 'B-Complex + Vitamin C', category: 'Capsule', batchNumber: 'BC7782', supplierId: 'SUP-PFI01', supplierName: 'Pfizer India Supply', quantity: 120, mrp: 42, costPrice: 28, expiryDays: 25 },
  { id: 'EXP-005', productName: 'Shelcal 500', genericName: 'Calcium + Vitamin D3', category: 'Tablet', batchNumber: 'SC1190', supplierId: 'SUP-TOR01', supplierName: 'Torrent Pharma Dist', quantity: 88, mrp: 95, costPrice: 62, expiryDays: 42 },
  { id: 'EXP-006', productName: 'Dolo 650 Tablet', genericName: 'Paracetamol', category: 'Tablet', batchNumber: 'DL6502', supplierId: 'SUP-MIC01', supplierName: 'Micro Labs Wholesale', quantity: 320, mrp: 32, costPrice: 18, expiryDays: -5 },
  { id: 'EXP-007', productName: 'Pan-D Capsule', genericName: 'Pantoprazole + Domperidone', category: 'Capsule', batchNumber: 'PD3311', supplierId: 'SUP-ALK01', supplierName: 'Alkem Distribution', quantity: 95, mrp: 118, costPrice: 78, expiryDays: 14 },
  { id: 'EXP-008', productName: 'Azithral 500 Tablet', genericName: 'Azithromycin', category: 'Tablet', batchNumber: 'AZ5009', supplierId: 'SUP-ALE01', supplierName: 'Alembic Pharma Agency', quantity: 55, mrp: 210, costPrice: 145, expiryDays: 55 },
  { id: 'EXP-009', productName: 'Telma 40 Tablet', genericName: 'Telmisartan', category: 'Tablet', batchNumber: 'TL4012', supplierId: 'SUP-GLN01', supplierName: 'Glenmark Trade Links', quantity: 48, mrp: 165, costPrice: 108, expiryDays: 72 },
  { id: 'EXP-010', productName: 'Glycomet GP2', genericName: 'Metformin + Glimepiride', category: 'Tablet', batchNumber: 'GM2201', supplierId: 'SUP-USV01', supplierName: 'USV Limited Dist', quantity: 36, mrp: 142, costPrice: 95, expiryDays: 85 },
  { id: 'EXP-011', productName: 'Thyronorm 50mcg', genericName: 'Levothyroxine', category: 'Tablet', batchNumber: 'TH5018', supplierId: 'SUP-ABB01', supplierName: 'Abbott India Supply', quantity: 72, mrp: 128, costPrice: 88, expiryDays: 22 },
  { id: 'EXP-012', productName: 'Ecosprin 75', genericName: 'Aspirin', category: 'Tablet', batchNumber: 'EC7503', supplierId: 'SUP-USV01', supplierName: 'USV Limited Dist', quantity: 140, mrp: 18, costPrice: 9, expiryDays: -28 },
  { id: 'EXP-013', productName: 'Volini Gel 30g', genericName: 'Diclofenac Diethylamine', category: 'Topical', batchNumber: 'VL3007', supplierId: 'SUP-SUN01', supplierName: 'Sun Pharma Distributors', quantity: 24, mrp: 145, costPrice: 98, expiryDays: 33 },
  { id: 'EXP-014', productName: 'Allegra 120mg', genericName: 'Fexofenadine', category: 'Tablet', batchNumber: 'AL1204', supplierId: 'SUP-SAN01', supplierName: 'Sanofi India Dist', quantity: 60, mrp: 198, costPrice: 132, expiryDays: 48 },
  { id: 'EXP-015', productName: 'Liv 52 DS Syrup', genericName: 'Herbal Hepatoprotective', category: 'Syrup', batchNumber: 'LV5206', supplierId: 'SUP-HIM01', supplierName: 'Himalaya Wholesale', quantity: 18, mrp: 185, costPrice: 125, expiryDays: 6 },
  { id: 'EXP-016', productName: 'Crocin Advance', genericName: 'Paracetamol', category: 'Tablet', batchNumber: 'CR8801', supplierId: 'SUP-GSK01', supplierName: 'GSK Consumer Supply', quantity: 200, mrp: 38, costPrice: 22, expiryDays: -3 },
  { id: 'EXP-017', productName: 'Combiflam Tablet', genericName: 'Ibuprofen + Paracetamol', category: 'Tablet', batchNumber: 'CB4409', supplierId: 'SUP-SAN01', supplierName: 'Sanofi India Dist', quantity: 110, mrp: 52, costPrice: 32, expiryDays: 27 },
  { id: 'EXP-018', productName: 'Pantop 40 Tablet', genericName: 'Pantoprazole', category: 'Tablet', batchNumber: 'PT4015', supplierId: 'SUP-ALK01', supplierName: 'Alkem Distribution', quantity: 44, mrp: 98, costPrice: 64, expiryDays: 63 },
  { id: 'EXP-019', productName: 'Metrogyl 400', genericName: 'Metronidazole', category: 'Tablet', batchNumber: 'MT4002', supplierId: 'SUP-JBC01', supplierName: 'J B Chemicals Agency', quantity: 80, mrp: 28, costPrice: 15, expiryDays: 78 },
  { id: 'EXP-020', productName: 'Calpol 650', genericName: 'Paracetamol', category: 'Tablet', batchNumber: 'CP6508', supplierId: 'SUP-GSK01', supplierName: 'GSK Consumer Supply', quantity: 150, mrp: 35, costPrice: 20, expiryDays: 12 },
  { id: 'EXP-021', productName: 'Rantac 150', genericName: 'Ranitidine', category: 'Tablet', batchNumber: 'RN1503', supplierId: 'SUP-JBC01', supplierName: 'J B Chemicals Agency', quantity: 65, mrp: 42, costPrice: 24, expiryDays: -45 },
  { id: 'EXP-022', productName: 'Deriphyllin Retard', genericName: 'Etophylline + Theophylline', category: 'Tablet', batchNumber: 'DP3001', supplierId: 'SUP-ZYD01', supplierName: 'Zydus Healthcare Agency', quantity: 28, mrp: 88, costPrice: 58, expiryDays: 38 },
  { id: 'EXP-023', productName: 'Sinarest Tablet', genericName: 'Paracetamol + Phenylephrine', category: 'Tablet', batchNumber: 'SN2207', supplierId: 'SUP-CIP01', supplierName: 'Cipla Wholesale', quantity: 92, mrp: 58, costPrice: 36, expiryDays: 19 },
  { id: 'EXP-024', productName: 'Omez 20 Capsule', genericName: 'Omeprazole', category: 'Capsule', batchNumber: 'OM2005', supplierId: 'SUP-DRR01', supplierName: 'Dr Reddy\'s Dist', quantity: 75, mrp: 72, costPrice: 48, expiryDays: 88 },
  { id: 'EXP-025', productName: 'Taxim-O 200', genericName: 'Cefixime', category: 'Tablet', batchNumber: 'TX2004', supplierId: 'SUP-ALK01', supplierName: 'Alkem Distribution', quantity: 42, mrp: 175, costPrice: 118, expiryDays: 52 },
  { id: 'EXP-026', productName: 'Benadryl Syrup', genericName: 'Diphenhydramine', category: 'Syrup', batchNumber: 'BD1006', supplierId: 'SUP-PFI01', supplierName: 'Pfizer India Supply', quantity: 14, mrp: 125, costPrice: 82, expiryDays: 4 },
  { id: 'EXP-027', productName: 'Voveran SR 75', genericName: 'Diclofenac Sodium', category: 'Tablet', batchNumber: 'VV7502', supplierId: 'SUP-NOV01', supplierName: 'Novartis India Supply', quantity: 38, mrp: 112, costPrice: 74, expiryDays: 67 },
  { id: 'EXP-028', productName: 'Asthalin Inhaler', genericName: 'Salbutamol', category: 'Inhaler', batchNumber: 'AS1009', supplierId: 'SUP-GLN01', supplierName: 'Glenmark Trade Links', quantity: 12, mrp: 185, costPrice: 128, expiryDays: 29 },
  { id: 'EXP-029', productName: 'Candid Cream 20g', genericName: 'Clotrimazole', category: 'Topical', batchNumber: 'CD2003', supplierId: 'SUP-GSK01', supplierName: 'GSK Consumer Supply', quantity: 22, mrp: 95, costPrice: 62, expiryDays: 74 },
  { id: 'EXP-030', productName: 'Neurobion Forte', genericName: 'Vitamin B Complex', category: 'Tablet', batchNumber: 'NB4401', supplierId: 'SUP-MER01', supplierName: 'Merck India Dist', quantity: 105, mrp: 68, costPrice: 42, expiryDays: 16 },
];

/** Map days-to-expiry into a human-readable risk tier. */
export function getRiskLevel(daysToExpiry) {
  if (daysToExpiry < 0) return 'Expired';
  if (daysToExpiry <= 14) return 'Critical';
  if (daysToExpiry <= 30) return 'High';
  if (daysToExpiry <= 60) return 'Medium';
  return 'Low';
}

/** Enrich seed rows with computed expiry dates, days, value, and status. */
export function buildExpiryRows() {
  const now = dayjs();
  const supplierMap = Object.fromEntries(suppliersSeed.map((s) => [s.id, s.name]));

  return expiryBatchesSeed.map((row) => {
    const expiryDate = now.add(row.expiryDays, 'day').toISOString();
    const daysToExpiry = row.expiryDays;
    const inventoryValue = row.quantity * row.costPrice;
    const status =
      daysToExpiry < 0
        ? 'expired'
        : daysToExpiry <= 30
          ? 'critical'
          : daysToExpiry <= 60
            ? 'warning'
            : 'watch';

    return {
      ...row,
      supplierName: supplierMap[row.supplierId] ?? row.supplierName,
      expiryDate,
      daysToExpiry,
      inventoryValue,
      status,
      riskLevel: getRiskLevel(daysToExpiry),
      window: getExpiryWindow(daysToExpiry),
    };
  });
}

/** @param {number} days */
export function getExpiryWindow(days) {
  if (days < 0) return 'expired';
  if (days <= 30) return '30d';
  if (days <= 60) return '60d';
  if (days <= 90) return '90d';
  return 'beyond';
}
