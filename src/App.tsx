import { useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { I18nProvider } from './lib/i18n';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SupportedTools } from './components/SupportedTools';
import { MakerStory } from './components/MakerStory';
import { EmailSignup } from './components/EmailSignup';
import { ReferralStatus } from './components/ReferralStatus';
import { BeyondSection } from './components/BeyondSection';
import { Pricing } from './components/Pricing';
import { PricingPage } from './pages/PricingPage';
import { DownloadPage } from './pages/DownloadPage';
import { Footer } from './components/Footer';
import { StarfieldBackground } from './components/StarfieldBackground';

// 路由切换时滚动到顶部 + 更新 canonical 标签
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const canonicalUrl = `https://mantra.gonewx.com${pathname === '/' ? '/' : pathname}`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) {
      link.href = canonicalUrl;
    } else {
      link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }
  }, [pathname]);

  return null;
}

function HomePage() {
  const signupRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Hero />
      <SupportedTools />
      <Features />
      <BeyondSection />
      <Pricing />
      <div ref={signupRef}>
        <EmailSignup />
      </div>
      <div className="border-t border-white/5">
        <ReferralStatus />
      </div>
      <MakerStory />
    </>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-dark-600 relative">
      <StarfieldBackground />
      <div className="relative z-10">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </BrowserRouter>
  );
}

export default App;
