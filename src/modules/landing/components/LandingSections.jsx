import { Button, Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  BarChartOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import styles from '../landing.module.scss';

const FEATURES = [
  { icon: <DollarOutlined />, title: 'Lightning POS Billing', desc: 'Keyboard-first billing with GST, split payments, and barcode support.' },
  { icon: <ClockCircleOutlined />, title: 'Expiry Intelligence', desc: 'Know exactly what will expire — and how much money is at risk.' },
  { icon: <BarChartOutlined />, title: 'Owner Insights', desc: 'Revenue, profit, dead stock, and supplier spend in one premium dashboard.' },
  { icon: <ThunderboltOutlined />, title: 'Smart Reorder', desc: 'Never run out of fast movers. Reorder suggestions based on daily sales.' },
];

const PRICING = [
  { name: 'Starter', price: '₹999', period: '/mo', features: ['1 store', 'POS + Inventory', 'Expiry alerts'] },
  { name: 'Professional', price: '₹2,499', period: '/mo', features: ['3 stores', 'Owner Insights', 'Smart Reorder', 'Priority support'], featured: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited stores', 'API access', 'Dedicated manager', 'Custom reports'] },
];

const FAQ = [
  { q: 'Can I migrate from Marg ERP?', a: 'Yes. Import products, suppliers, and opening stock in under a day with our guided migration.' },
  { q: 'Does it work offline?', a: 'Billing works offline and syncs when you reconnect — built for unreliable store internet.' },
  { q: 'Is GST filing supported?', a: 'GSTR-ready reports with HSN-wise breakdowns. Filing integration coming soon.' },
];

export function LandingNav() {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>PharmacyOS</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => navigate('/dashboard')}>Sign in</Button>
        <Button type="primary" onClick={() => navigate('/dashboard')}>Start Free Trial</Button>
      </div>
    </nav>
  );
}

export function Hero() {
  const navigate = useNavigate();
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>Run Your Pharmacy, Not Your Inventory.</h1>
      <p className={styles.heroSub}>
        Modern cloud-based pharmacy management with expiry tracking, smart inventory insights, and lightning-fast billing.
      </p>
      <div className={styles.heroCtas}>
        <Button type="primary" size="large" onClick={() => navigate('/dashboard')}>Start Free Trial</Button>
        <Button size="large" onClick={() => navigate('/dashboard')}>Book Demo</Button>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Built for modern Indian pharmacies</h2>
      <div className={styles.grid3}>
        {FEATURES.map((f) => (
          <div key={f.title} className={styles.card}>
            <div style={{ fontSize: 24, color: '#4f46e5', marginBottom: 12 }}>{f.icon}</div>
            <div className={styles.cardTitle}>{f.title}</div>
            <div className={styles.cardDesc}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section className={styles.section} style={{ background: '#f8fafc', maxWidth: '100%' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 className={styles.sectionTitle}>Why switch from Marg ERP?</h2>
        <div className={styles.grid3}>
          <div className={styles.card}><div className={styles.cardTitle}>Cloud-first</div><div className={styles.cardDesc}>Access from anywhere. No local server headaches.</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Beautiful UX</div><div className={styles.cardDesc}>Feels like Stripe, not 1990s desktop software.</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Expiry-first</div><div className={styles.cardDesc}>Dedicated expiry center — not buried in a report.</div></div>
        </div>
      </div>
    </section>
  );
}

export function Screenshots() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>See it in action</h2>
      <div className={styles.screenshotGrid}>
        {['Owner Insights', 'Expiry Center', 'Billing POS', 'Smart Reorder'].map((label) => (
          <div key={label} className={styles.screenshot}>{label} preview</div>
        ))}
      </div>
    </section>
  );
}

export function Pricing() {
  const navigate = useNavigate();
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Simple, transparent pricing</h2>
      <div className={styles.grid3}>
        {PRICING.map((p) => (
          <div key={p.name} className={styles.card} style={p.featured ? { borderColor: '#4f46e5', boxShadow: '0 8px 24px -8px rgba(79,70,229,0.25)' } : undefined}>
            <div className={styles.pricingCard}>
              <div className={styles.cardTitle}>{p.name}</div>
              <div className={styles.price}>{p.price}<span style={{ fontSize: 16, color: '#64748b' }}>{p.period}</span></div>
              <ul style={{ textAlign: 'left', paddingLeft: 20, color: '#64748b', fontSize: 14 }}>
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <Button type={p.featured ? 'primary' : 'default'} block style={{ marginTop: 16 }} onClick={() => navigate('/dashboard')}>
                Get started
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className={styles.section} style={{ background: '#f8fafc', maxWidth: '100%' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 className={styles.sectionTitle}>Trusted by pharmacy owners</h2>
        <div className={styles.grid3}>
          {[
            { name: 'Rajesh K.', store: 'MediCare Pharmacy, Mumbai', quote: 'Expiry center alone saved us ₹80K in write-offs last quarter.' },
            { name: 'Priya S.', store: 'HealthFirst, Pune', quote: 'Billing is faster than Marg. My cashier learned it in one day.' },
            { name: 'Amit P.', store: 'Apollo Corner, Delhi', quote: 'Owner Insights tells me profit daily — I check it every morning.' },
          ].map((t) => (
            <div key={t.name} className={styles.card}>
              <div className={styles.cardDesc} style={{ fontStyle: 'italic', marginBottom: 12 }}>&ldquo;{t.quote}&rdquo;</div>
              <div className={styles.cardTitle}>{t.name}</div>
              <div className={styles.cardDesc}>{t.store}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>FAQ</h2>
      <Collapse items={FAQ.map((f, i) => ({ key: i, label: f.q, children: f.a }))} style={{ maxWidth: 720, margin: '0 auto' }} />
    </section>
  );
}

export function Footer() {
  return <footer className={styles.footer}>© 2026 PharmacyOS · Modern pharmacy management for India</footer>;
}
