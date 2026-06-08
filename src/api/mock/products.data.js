/**
 * Realistic Indian-pharmacy product catalog. Source of truth for products and
 * the basis for inventory batches, billing search, and sales line items.
 * `mrp` / `costPrice` are per-unit (strip/bottle) in INR; gst is the slab %.
 */
export const productsSeed = [
  { id: 'PRD-DOLO6', name: 'Dolo 650 Tablet', genericName: 'Paracetamol 650mg', manufacturer: 'Micro Labs', category: 'Tablet', gstRate: 12, hsn: '30049099', barcode: '8901234500017', mrp: 31, costPrice: 22 },
  { id: 'PRD-PAND', name: 'Pan-D Capsule', genericName: 'Pantoprazole + Domperidone', manufacturer: 'Alkem Labs', category: 'Capsule', gstRate: 12, hsn: '30049011', barcode: '8901234500024', mrp: 198, costPrice: 142 },
  { id: 'PRD-AZIT5', name: 'Azithral 500 Tablet', genericName: 'Azithromycin 500mg', manufacturer: 'Alembic', category: 'Tablet', gstRate: 12, hsn: '30042099', barcode: '8901234500031', mrp: 132, costPrice: 95 },
  { id: 'PRD-CROAD', name: 'Crocin Advance Tablet', genericName: 'Paracetamol 500mg', manufacturer: 'GSK', category: 'Tablet', gstRate: 12, hsn: '30049099', barcode: '8901234500048', mrp: 28, costPrice: 19 },
  { id: 'PRD-ALLE1', name: 'Allegra 120mg Tablet', genericName: 'Fexofenadine 120mg', manufacturer: 'Sanofi', category: 'Tablet', gstRate: 12, hsn: '30049099', barcode: '8901234500055', mrp: 218, costPrice: 158 },
  { id: 'PRD-LIV52', name: 'Liv 52 DS Syrup', genericName: 'Himsra + Kasani', manufacturer: 'Himalaya', category: 'Syrup', gstRate: 12, hsn: '30049099', barcode: '8901234500062', mrp: 165, costPrice: 118 },
  { id: 'PRD-VOLIN', name: 'Volini Gel 30g', genericName: 'Diclofenac Diethylamine', manufacturer: 'Sun Pharma', category: 'Topical', gstRate: 12, hsn: '30049099', barcode: '8901234500079', mrp: 138, costPrice: 96 },
  { id: 'PRD-TELM4', name: 'Telma 40 Tablet', genericName: 'Telmisartan 40mg', manufacturer: 'Glenmark', category: 'Tablet', gstRate: 5, hsn: '30049099', barcode: '8901234500086', mrp: 152, costPrice: 108 },
  { id: 'PRD-GLYC2', name: 'Glycomet GP2 Tablet', genericName: 'Metformin + Glimepiride', manufacturer: 'USV', category: 'Tablet', gstRate: 5, hsn: '30049099', barcode: '8901234500093', mrp: 142, costPrice: 101 },
  { id: 'PRD-THYRO', name: 'Thyronorm 50mcg Tablet', genericName: 'Thyroxine Sodium 50mcg', manufacturer: 'Abbott', category: 'Tablet', gstRate: 5, hsn: '30049099', barcode: '8901234500109', mrp: 128, costPrice: 92 },
  { id: 'PRD-ECOS7', name: 'Ecosprin 75 Tablet', genericName: 'Aspirin 75mg', manufacturer: 'USV', category: 'Tablet', gstRate: 5, hsn: '30049099', barcode: '8901234500116', mrp: 11, costPrice: 7 },
  { id: 'PRD-PANT4', name: 'Pantop 40 Tablet', genericName: 'Pantoprazole 40mg', manufacturer: 'Aristo', category: 'Tablet', gstRate: 12, hsn: '30049011', barcode: '8901234500123', mrp: 112, costPrice: 78 },
  { id: 'PRD-AUGM6', name: 'Augmentin 625 Duo Tablet', genericName: 'Amoxicillin + Clavulanic Acid', manufacturer: 'GSK', category: 'Tablet', gstRate: 12, hsn: '30042099', barcode: '8901234500130', mrp: 198, costPrice: 146 },
  { id: 'PRD-MONT1', name: 'Montair LC Tablet', genericName: 'Montelukast + Levocetirizine', manufacturer: 'Cipla', category: 'Tablet', gstRate: 12, hsn: '30049099', barcode: '8901234500147', mrp: 185, costPrice: 132 },
  { id: 'PRD-ZIFI2', name: 'Zifi 200 Tablet', genericName: 'Cefixime 200mg', manufacturer: 'FDC', category: 'Tablet', gstRate: 12, hsn: '30042099', barcode: '8901234500154', mrp: 168, costPrice: 121 },
  { id: 'PRD-BECOS', name: 'Becosules Capsule', genericName: 'B-Complex + Vitamin C', manufacturer: 'Pfizer', category: 'Capsule', gstRate: 12, hsn: '30045090', barcode: '8901234500161', mrp: 48, costPrice: 33 },
  { id: 'PRD-SHEL5', name: 'Shelcal 500 Tablet', genericName: 'Calcium + Vitamin D3', manufacturer: 'Torrent', category: 'Tablet', gstRate: 12, hsn: '30045090', barcode: '8901234500178', mrp: 122, costPrice: 86 },
  { id: 'PRD-AMOX5', name: 'Mox 500 Capsule', genericName: 'Amoxicillin 500mg', manufacturer: 'Sun Pharma', category: 'Capsule', gstRate: 12, hsn: '30042099', barcode: '8901234500185', mrp: 78, costPrice: 54 },
  { id: 'PRD-BENAD', name: 'Benadryl Cough Syrup 100ml', genericName: 'Diphenhydramine + Ammonium Cl', manufacturer: 'J&J', category: 'Syrup', gstRate: 12, hsn: '30049099', barcode: '8901234500192', mrp: 132, costPrice: 94 },
  { id: 'PRD-OTRIV', name: 'Otrivin Nasal Drops 10ml', genericName: 'Xylometazoline', manufacturer: 'Novartis', category: 'Drops', gstRate: 12, hsn: '30049099', barcode: '8901234500208', mrp: 92, costPrice: 64 },
  { id: 'PRD-INSUL', name: 'Huminsulin 30/70 Injection', genericName: 'Human Insulin', manufacturer: 'Eli Lilly', category: 'Injection', gstRate: 5, hsn: '30043110', barcode: '8901234500215', mrp: 425, costPrice: 332 },
  { id: 'PRD-ORS', name: 'Electral Powder 21.8g', genericName: 'Oral Rehydration Salts', manufacturer: 'FDC', category: 'Others', gstRate: 12, hsn: '30049099', barcode: '8901234500222', mrp: 22, costPrice: 15 },
  { id: 'PRD-DETTL', name: 'Dettol Antiseptic 100ml', genericName: 'Chloroxylenol', manufacturer: 'Reckitt', category: 'Others', gstRate: 18, hsn: '34022090', barcode: '8901234500239', mrp: 65, costPrice: 47 },
  { id: 'PRD-NEBUL', name: 'Asthalin Respules 2.5mg', genericName: 'Salbutamol', manufacturer: 'Cipla', category: 'Injection', gstRate: 12, hsn: '30049099', barcode: '8901234500246', mrp: 88, costPrice: 61 },
];

/** Distinct manufacturers (for filters). */
export const manufacturersSeed = [...new Set(productsSeed.map((p) => p.manufacturer))].sort();
