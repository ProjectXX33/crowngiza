import React, { useState, useCallback, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from './components/Hero.jsx';
import Nav from './components/Nav.jsx';
import WhySection from './components/WhySection.jsx';
import InvestSection from './components/InvestSection.jsx';
import UnitsSection from './components/UnitsSection.jsx';
import AmenitiesSection from './components/AmenitiesSection.jsx';
import RendersSection from './components/RendersSection.jsx';
import PaymentBanner from './components/PaymentBanner.jsx';
import DeveloperSection from './components/DeveloperSection.jsx';
import BrochureSection from './components/BrochureSection.jsx';
import LocationSection from './components/LocationSection.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import Toast from './components/Toast.jsx';
import ThankYou from './components/ThankYou.jsx';
import { LANGUAGES } from './i18n.js';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [toast, setToast] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = LANGUAGES[lang];

  const handleSent = useCallback(() => {
    setToast(true);
    setSubmitted(true);
    setTimeout(() => setToast(false), 2400);
    // jump to the top so the thank-you screen is fully visible
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleBack = useCallback(() => {
    setSubmitted(false);
  }, []);

  useEffect(() => {
    document.documentElement.lang = t.code;
    document.documentElement.dir = t.dir;
    document.title = t.title;
  }, [t]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
      offset: 50,
    });
  }, []);

  if (submitted) {
    return (
      <div className="app app--thanks" dir={t.dir} lang={t.code}>
        <Nav lang={lang} t={t} onLanguageChange={setLang} />
        <ThankYou t={t} onBack={handleBack} />
        <Footer t={t} />
        <Toast show={toast} text={t.toast} />
      </div>
    );
  }

  return (
    <div className="app" dir={t.dir} lang={t.code}>
      <Nav lang={lang} t={t} onLanguageChange={setLang} />
      <div data-aos="fade-in" data-aos-duration="1000">
        <Hero t={t} onSent={handleSent} />
      </div>
      <div data-aos="fade-up">
        <WhySection t={t} />
      </div>
      <div data-aos="fade-up">
        <InvestSection t={t} />
      </div>
      <div data-aos="fade-up">
        <UnitsSection t={t} />
      </div>
      <div data-aos="fade-up">
        <PaymentBanner t={t} />
      </div>
      <div data-aos="fade-up">
        <AmenitiesSection t={t} />
      </div>
      <div data-aos="fade-up">
        <RendersSection t={t} />
      </div>
      <div data-aos="fade-up">
        <DeveloperSection t={t} />
      </div>
      <div data-aos="fade-up">
        <BrochureSection t={t} />
      </div>
      <div data-aos="fade-up">
        <LocationSection t={t} />
      </div>
      <Footer t={t} />
      <FloatingWhatsApp t={t} />
      <Toast show={toast} text={t.toast} />
    </div>
  );
}
