import { useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { I18nProvider } from './lib/i18n';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SupportedTools } from './components/SupportedTools';
import { MakerStory } from './components/MakerStory';
import { Pricing } from './components/Pricing';
import { PricingPage } from './pages/PricingPage';
import { EmailSignup } from './components/EmailSignup';
import { ReferralStatus } from './components/ReferralStatus';
import { Footer } from './components/Footer';
import { StarfieldBackground } from './components/StarfieldBackground';

// 路由切换时滚动到顶部
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  const signupRef = useRef<HTMLDivElement>(null);

  const scrollToSignup = () => {
    signupRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onCtaClick={scrollToSignup} />
      <SupportedTools />
      <Features />
      <Pricing />
      <MakerStory />
      <div ref={signupRef} id="signup">
        <EmailSignup />
      </div>
      <div className="border-t border-white/5">
        <ReferralStatus />
      </div>
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
