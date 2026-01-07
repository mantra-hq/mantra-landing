import { useRef } from 'react';
import { I18nProvider } from './lib/i18n';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SupportedTools } from './components/SupportedTools';
import { MakerStory } from './components/MakerStory';
import { EmailSignup } from './components/EmailSignup';
import { Footer } from './components/Footer';
import { LanguageToggle } from './components/LanguageToggle';

function AppContent() {
  const signupRef = useRef<HTMLDivElement>(null);

  const scrollToSignup = () => {
    signupRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-600">
      <LanguageToggle />
      <Hero onCtaClick={scrollToSignup} />
      <SupportedTools />
      <Features />
      <MakerStory />
      <div ref={signupRef}>
        <EmailSignup />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
