import { useState } from 'react';
import { AutoComplete, Input, Typography } from 'antd';
import { BarcodeOutlined } from '@ant-design/icons';
import { colors } from '@/app/theme';
import { formatCurrency } from '@/utils';
import { useMedicineSearch } from '../hooks';
import { useBillingStore } from '../store/billingStore';

const { Text } = Typography;

/**
 * Keyboard-friendly medicine search. Type to search; Enter adds the top match
 * (or the exact barcode match) to the cart. Barcode-scanner ready.
 */
export function PosSearchBar() {
  const [term, setTerm] = useState('');
  const { data: results = [] } = useMedicineSearch(term);
  const addItem = useBillingStore((s) => s.addItem);

  const add = (product) => {
    addItem(product);
    setTerm('');
  };

  const onEnter = () => {
    if (!results.length) return;
    const exact = results.find((p) => p.barcode === term.trim());
    add(exact ?? results[0]);
  };

  const options = results.map((p) => ({
    value: p.id,
    label: (
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <span>
          <Text strong>{p.name}</Text>
          <Text style={{ color: colors.textTertiary, fontSize: 12 }}> · {p.manufacturer}</Text>
        </span>
        <Text strong>{formatCurrency(p.mrp)}</Text>
      </div>
    ),
    product: p,
  }));

  return (
    <AutoComplete
      value={term}
      options={options}
      onChange={setTerm}
      onSelect={(_, opt) => add(opt.product)}
      style={{ width: '100%' }}
    >
      <Input
        size="large"
        autoFocus
        prefix={<BarcodeOutlined style={{ color: colors.textTertiary }} />}
        placeholder="Search medicine or scan barcode — press Enter to add"
        onPressEnter={onEnter}
        allowClear
      />
    </AutoComplete>
  );
}

export default PosSearchBar;
