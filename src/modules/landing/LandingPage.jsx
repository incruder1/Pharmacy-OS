import {
  LandingNav,
  Hero,
  Features,
  Comparison,
  Screenshots,
  Pricing,
  Testimonials,
  FAQSection,
  Footer,
} from './components/LandingSections';
import styles from './landing.module.scss';

export function LandingPage() {
  return (
    <div className={styles.page}>
      <LandingNav />
      <Hero />
      <Features />
      <Screenshots />
      <Comparison />
      <Pricing />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
