import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ShieldCheck, Menu, X, Globe, ShoppingBag } from "lucide-react";
import Logo from "./components/Logo";
import MarqueeScroller from "./components/MarqueeScroller";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import SolutionsSection from "./components/SolutionsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import Chatbot from "./components/Chatbot";
import NetworkAdministrationPage from "./components/NetworkAdministrationPage";
import SecurityAdministrationPage from "./components/SecurityAdministrationPage";
import PentestingPage from "./components/PentestingPage";
import WebApplicationAuditPage from "./components/WebApplicationAuditPage";
import CloudComputingPage from "./components/CloudComputingPage";
import SecureHostingPage from "./components/SecureHostingPage";
import CybersecurityConsultingPage from "./components/CybersecurityConsultingPage";
import SecureWebDevelopmentPage from "./components/SecureWebDevelopmentPage";
import TypewriterHeroTitle from "./components/TypewriterHeroTitle";
import { useLanguage } from "./context/LanguageContext";
import StorePromoSection from "./store/components/StorePromoSection";
import StorePage from "./store/pages/StorePage";
import CategoryPage from "./store/pages/CategoryPage";
import ProductPage from "./store/pages/ProductPage";
import CartPage from "./store/pages/CartPage";
import CheckoutPage from "./store/pages/CheckoutPage";
import PaymentCallbackPage from "./store/pages/PaymentCallbackPage";
import OrdersPage from "./store/pages/OrdersPage";
import StoreAuthPage from "./store/pages/StoreAuthPage";
import RequireStoreAuth from "./store/components/RequireStoreAuth";
import RequireAdminAuth from "./store/components/RequireAdminAuth";
const AdminStoreDashboardPage = React.lazy(() => import('./store/pages/admin/AdminStoreDashboardPage'));
const AdminProductsPage = React.lazy(() => import('./store/pages/admin/AdminProductsPage'));
const AdminOrdersPage = React.lazy(() => import('./store/pages/admin/AdminOrdersPage'));
const AdminCategoriesPage = React.lazy(() => import('./store/pages/admin/AdminCategoriesPage'));
const AdminCustomersPage = React.lazy(() => import('./store/pages/admin/AdminCustomersPage'));
const AdminLoginPage = React.lazy(() => import('./store/pages/admin/AdminLoginPage'));

export default function App() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  const navigate = React.useCallback((path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(window.location.pathname);
  }, []);

  const navigateHome = React.useCallback(() => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [navigate]);

  const navigateToContact = React.useCallback((serviceId = "net-admin") => {
    window.history.pushState({}, "", "/#contact");
    setCurrentPath("/");

    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("select-service", { detail: serviceId }));
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, []);

  const navigateToPath = React.useCallback((path: string) => {
    if (path === "/#contact") {
      navigateToContact();
      return;
    }

    navigate(path);
    window.scrollTo({ top: 0, behavior: "auto" });
    setIsMobileMenuOpen(false);
  }, [navigate, navigateToContact]);

  const navigateToService = React.useCallback((id: string) => {
    if (id === "net-admin") {
      navigate("/services/administration-reseau");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (id === "sec-admin") {
      navigate("/services/administration-securite-it");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (id === "pentest") {
      navigate("/services/pentesting-test-intrusion");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (id === "web-test") {
      navigate("/services/audit-applications-web");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (id === "cloud-comp") {
      navigate("/services/cloud-computing");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (id === "sec-host") {
      navigate("/services/hebergement-securise");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (id === "cyber-cons") {
      navigate("/services/conseil-cybersecurite");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (id === "sec-dev") {
      navigate("/services/developpement-web-securise");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    window.dispatchEvent(new CustomEvent("select-service", { detail: id }));
    scrollToSection("contact");
  }, [navigate]);

  // Smooth scroll handler helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  React.useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (currentPath === "/services/administration-reseau") {
    return (
      <>
        <NetworkAdministrationPage onBack={navigateHome} onContact={navigateToContact} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/services/administration-securite-it") {
    return (
      <>
        <SecurityAdministrationPage onBack={navigateHome} onContact={() => navigateToContact("sec-admin")} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/services/pentesting-test-intrusion") {
    return (
      <>
        <PentestingPage onBack={navigateHome} onContact={() => navigateToContact("pentest")} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/services/audit-applications-web") {
    return (
      <>
        <WebApplicationAuditPage onBack={navigateHome} onContact={() => navigateToContact("web-test")} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/services/cloud-computing") {
    return (
      <>
        <CloudComputingPage onBack={navigateHome} onContact={() => navigateToContact("cloud-comp")} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/services/hebergement-securise") {
    return (
      <>
        <SecureHostingPage onBack={navigateHome} onContact={() => navigateToContact("sec-host")} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/services/conseil-cybersecurite") {
    return (
      <>
        <CybersecurityConsultingPage onBack={navigateHome} onContact={() => navigateToContact("cyber-cons")} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/services/developpement-web-securise") {
    return (
      <>
        <SecureWebDevelopmentPage onBack={navigateHome} onContact={() => navigateToContact("sec-dev")} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/admin/login") {
    return <React.Suspense fallback={null}><AdminLoginPage onNavigate={navigateToPath} /></React.Suspense>;
  }

  if (currentPath === "/admin/store") {
    return <RequireAdminAuth currentPath={currentPath} onNavigate={navigateToPath}><React.Suspense fallback={null}><AdminStoreDashboardPage onNavigate={navigateToPath} /></React.Suspense></RequireAdminAuth>;
  }

  if (currentPath === "/admin/store/products") {
    return <RequireAdminAuth currentPath={currentPath} onNavigate={navigateToPath}><React.Suspense fallback={null}><AdminProductsPage onNavigate={navigateToPath} /></React.Suspense></RequireAdminAuth>;
  }

  if (currentPath === "/admin/store/orders") {
    return <RequireAdminAuth currentPath={currentPath} onNavigate={navigateToPath}><React.Suspense fallback={null}><AdminOrdersPage onNavigate={navigateToPath} /></React.Suspense></RequireAdminAuth>;
  }

  if (currentPath === "/admin/store/categories") {
    return <RequireAdminAuth currentPath={currentPath} onNavigate={navigateToPath}><React.Suspense fallback={null}><AdminCategoriesPage onNavigate={navigateToPath} /></React.Suspense></RequireAdminAuth>;
  }
  if (currentPath === "/admin/store/customers") {
    return <RequireAdminAuth currentPath={currentPath} onNavigate={navigateToPath}><React.Suspense fallback={null}><AdminCustomersPage onNavigate={navigateToPath} /></React.Suspense></RequireAdminAuth>;
  }
  if (currentPath === "/store") {
    return (
      <>
        <StorePage onNavigate={navigateToPath} />
        <Chatbot />
      </>
    );
  }

  if (currentPath.startsWith("/store/category/")) {
    return (
      <>
        <CategoryPage slug={currentPath.replace("/store/category/", "")} onNavigate={navigateToPath} />
        <Chatbot />
      </>
    );
  }

  if (currentPath.startsWith("/store/product/")) {
    return (
      <>
        <ProductPage slug={currentPath.replace("/store/product/", "")} onNavigate={navigateToPath} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/store/cart") {
    return (
      <>
        <CartPage onNavigate={navigateToPath} />
        <Chatbot />
      </>
    );
  }

  if (currentPath === "/store/checkout") {
    return (
      <RequireStoreAuth currentPath={currentPath} onNavigate={navigateToPath}>
        <CheckoutPage onNavigate={navigateToPath} />
        <Chatbot />
      </RequireStoreAuth>
    );
  }

  if (currentPath === "/store/payment/callback") {
    return (
      <RequireStoreAuth currentPath={currentPath} onNavigate={navigateToPath}>
        <PaymentCallbackPage onNavigate={navigateToPath} />
        <Chatbot />
      </RequireStoreAuth>
    );
  }

  if (currentPath === "/account/orders") {
    return (
      <RequireStoreAuth currentPath={currentPath} onNavigate={navigateToPath}>
        <OrdersPage onNavigate={navigateToPath} />
        <Chatbot />
      </RequireStoreAuth>
    );
  }

  if (currentPath === "/account/login") {
    return (
      <>
        <StoreAuthPage onNavigate={navigateToPath} />
        <Chatbot />
      </>
    );
  }
  return (
    <div className="min-h-screen w-full bg-bg-global flex flex-col items-center overflow-x-hidden font-sans select-none">
      
      {/* Dynamic Fluid Liquid Floating Navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none transition-all duration-300"
        animate={{
          paddingTop: isScrolled ? "12px" : "20px",
          paddingBottom: isScrolled ? "12px" : "20px",
        }}
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
          className={`w-full flex flex-col select-none pointer-events-auto transition-all duration-300 ${
            isScrolled
              ? `${isMobileMenuOpen ? "rounded-[24px]" : "rounded-full"} max-w-[1100px] bg-white/90 backdrop-blur-2xl border border-slate-200/40 shadow-[0_20px_50px_rgba(10,27,51,0.06)] px-5 lg:px-6 py-2.5`
              : "max-w-[1400px] bg-white/70 backdrop-blur-md border border-slate-200/30 px-6 lg:px-8 py-3.5 rounded-[24px] lg:rounded-[32px] shadow-[0_4px_30px_rgba(0,0,0,0.01)]"
          }`}
        >
          {/* Top Row: brand logo, desktop menus, contact button & hamburger */}
          <div className="w-full flex items-center justify-between">
            {/* Brand Logo & Name */}
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
            >
              <Logo iconSize={32} theme="brand" />
            </div>

            {/* Liquid Middle Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-50/50 p-1 rounded-full border border-slate-100 shadow-inner">
              <button 
                onClick={() => scrollToSection("services")}
                className="px-3 md:px-4 py-1.5 rounded-full text-[12px] font-semibold text-slate-text hover:text-navy hover:bg-white tracking-wide transition-all cursor-pointer"
              >
                {t("nav.services")}
              </button>
              <button 
                onClick={() => scrollToSection("solutions")}
                className="px-3 md:px-4 py-1.5 rounded-full text-[12px] font-semibold text-slate-text hover:text-navy hover:bg-white tracking-wide transition-all cursor-pointer"
              >
                {t("nav.solutions")}
              </button>
              <button
                onClick={() => navigateToPath("/store")}
                className="inline-flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[12px] font-semibold text-slate-text hover:text-navy hover:bg-white tracking-wide transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#0b7c9e]" />
                Store
              </button>
              <button 
                onClick={() => scrollToSection("why-choose-us")}
                className="px-3 md:px-4 py-1.5 rounded-full text-[12px] font-semibold text-slate-text hover:text-navy hover:bg-white tracking-wide transition-all cursor-pointer"
              >
                {t("nav.whyUs")}
              </button>
              <button 
                onClick={() => scrollToSection("testimonials")}
                className="px-3 md:px-4 py-1.5 rounded-full text-[12px] font-semibold text-slate-text hover:text-navy hover:bg-white tracking-wide transition-all cursor-pointer"
              >
                {t("nav.clients")}
              </button>
            </nav>

            {/* Right Area Action (Desktop) or Toggle (Mobile) */}
            <div className="flex items-center gap-3">
              {/* Language Selector Pill */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-50 border border-slate-100 hover:border-[#0b7c9e]/40 font-display text-[11px] font-bold text-navy transition-all cursor-pointer active:scale-95 shadow-sm hover:bg-white select-none"
                aria-label="Toggle language / Modifier la langue"
              >
                <Globe className="w-3.5 h-3.5 text-[#0b7c9e]" />
                <span className="uppercase">{language === "en" ? "FR" : "EN"}</span>
              </button>

              {/* Desktop Contact Button */}
              <button
                onClick={() => scrollToSection("contact")}
                className="hidden lg:flex items-center gap-1 bg-navy text-white hover:bg-navy-dark px-4 lg:px-5 py-2.5 rounded-full text-[11.5px] font-semibold shadow-md active:scale-95 hover:shadow-lg transition-all cursor-pointer font-sans"
              >
                {t("nav.contactUs")}
                <ChevronRight className="w-3.5 h-3.5 text-white/80" />
              </button>

              {/* Hamburger Toggle Button for Mobile/Tablet */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex lg:hidden items-center justify-center p-2 rounded-full hover:bg-slate-100 text-navy transition-all focus:outline-none cursor-pointer"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#0b7c9e]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#0b7c9e]" />
                )}
              </button>
            </div>
          </div>

          {/* Underlay / Drawer Mobile Menu for Non-Desktop screens */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full overflow-hidden mt-3 pt-3 border-t border-slate-100 lg:hidden flex flex-col gap-1"
            >
              <button 
                onClick={() => {
                  scrollToSection("services");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-text hover:text-[#0b7c9e] hover:bg-slate-50 transition-all cursor-pointer"
              >
                {t("nav.services")}
              </button>
              <button 
                onClick={() => {
                  scrollToSection("solutions");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-text hover:text-[#0b7c9e] hover:bg-slate-50 transition-all cursor-pointer"
              >
                {t("nav.solutions")}
              </button>
              <button
                onClick={() => navigateToPath("/store")}
                className="w-full text-left px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-text hover:text-[#0b7c9e] hover:bg-slate-50 transition-all cursor-pointer"
              >
                Store
              </button>
              <button 
                onClick={() => {
                  scrollToSection("why-choose-us");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-text hover:text-[#0b7c9e] hover:bg-slate-50 transition-all cursor-pointer"
              >
                {t("nav.whyUs")}
              </button>
              <button 
                onClick={() => {
                  scrollToSection("testimonials");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-text hover:text-[#0b7c9e] hover:bg-slate-50 transition-all cursor-pointer"
               >
                {t("nav.clients")}
              </button>
              
              <div className="pt-2 pb-1 border-t border-slate-100/50 mt-2">
                <button
                  onClick={() => {
                    scrollToSection("contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1 bg-navy text-white hover:bg-navy-dark px-4 py-2.5 rounded-full text-[13px] font-semibold shadow-md active:scale-95 transition-all cursor-pointer font-sans"
                >
                  {t("nav.contactUs")}
                  <ChevronRight className="w-3.5 h-3.5 text-white/80" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.header>

      <main 
        id="main-content" 
        role="main" 
        className="w-full flex flex-col items-center justify-center pt-24 md:pt-28 pb-12 px-4 md:px-8 overflow-x-hidden font-sans"
      >
        <div className="w-full flex flex-col items-center justify-center">
              {/* 2. Main Hero Container & Video Background */}
              <section 
                id="hero-container"
                aria-labelledby="hero-title"
                className="relative w-full max-w-[1400px] mx-auto rounded-[40px] md:rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden h-[690px] sm:h-[640px] md:h-[600px] flex flex-col"
              >
                {/* Underlying background video layer with premium glassy backup */}
                <div 
                  className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
                  aria-hidden="true"
                >
                  <div className="video-fallback" />
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    tabIndex={-1}
                    className="w-full h-full object-cover scale-105 transition-transform duration-1000 relative z-1"
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4"
                    id="hero-bg-video"
                  />
                </div>

                {/* 3. Hero Text Content Wrapper */}
                <div className="relative z-20 flex-1 px-6 sm:px-8 md:px-16 pt-24 sm:pt-20 md:pt-16 pb-32 sm:pb-28 md:pb-16 flex flex-col items-start justify-start md:justify-center">
                  {/* Animate the text layer in (fade in, slide up slightly) */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[750px] space-y-5 md:space-y-6"
                    id="hero-text-layer"
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#0b7c9e]/10 border border-[#0b7c9e]/20 px-3.5 py-1.5 rounded-full text-[#0b7c9e] text-[11px] font-bold tracking-wide uppercase">
                      {t("hero.badge")}
                    </div>

                    <TypewriterHeroTitle language={language} />

                    {/* Subheadline using font-sans */}
                    <p 
                      id="hero-subtitle"
                      className="font-sans text-[14px] md:text-[15.5px] text-slate-text leading-relaxed max-w-[540px]"
                    >
                      {t("hero.desc")}
                    </p>

                    {/* Request Audit CTA Button */}
                    <div className="pt-2 flex w-full items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        id="contact-button"
                        onClick={() => scrollToSection("contact")}
                        aria-label="Request a custom security audit"
                        className="bg-navy hover:bg-navy-dark text-white font-semibold rounded-full px-5 sm:px-6 py-3.5 text-[12px] sm:text-[13px] shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <ShieldCheck className="w-4 h-4 text-white/90" />
                        {language === "fr" ? "Demander un audit de sécurité" : "Request a Security Audit"}
                      </motion.button>

                      <button
                        onClick={() => scrollToSection("solutions")}
                        className="hidden sm:inline-flex text-[13px] font-bold text-slate-text hover:text-[#0b7c9e] py-3 px-4 transition-colors cursor-pointer"
                      >
                        {t("hero.btnExplore")} &rarr;
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* 4. Floating Bottom Navbar */}
                <div className="absolute bottom-5 sm:bottom-7 md:bottom-10 left-1/2 w-[calc(100%-32px)] sm:w-auto -translate-x-1/2 z-30" id="navbar-wrapper">
                  <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    aria-label="Quick directory connections"
                    className="flex w-full sm:w-auto items-center justify-between bg-white/95 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/40 animate-pulse-subtle"
                    id="floating-nav"
                  >
                    {/* Logo icon representation of the custom shield orbits */}
                    <div 
                      id="nav-logo"
                      aria-hidden="true"
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-white border border-slate-100 shadow-sm rounded-full flex items-center justify-center mr-0.5 sm:mr-1 select-none shrink-0"
                    >
                      <Logo onlyIcon={true} iconSize={26} />
                    </div>

                    {/* Standard navigation buttons tailored to Services and Solutions */}
                    <div className="flex min-w-0 items-center gap-0 sm:gap-1.5 px-0.5 sm:px-1 md:px-2">
                      <button 
                        id="nav-services-btn"
                        onClick={() => scrollToSection("services")}
                        aria-label="Scroll to Services Catalog"
                        className="whitespace-nowrap px-2 sm:px-3 py-1.5 rounded-full text-[10.5px] sm:text-[12px] font-semibold text-slate-text hover:text-navy focus-visible:ring-2 focus-visible:ring-navy focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        {t("nav.services")}
                      </button>
                      <button 
                        id="nav-solutions-btn"
                        onClick={() => scrollToSection("solutions")}
                        aria-label="Scroll to Solutions Platforms"
                        className="whitespace-nowrap px-2 sm:px-3 py-1.5 rounded-full text-[10.5px] sm:text-[12px] font-semibold text-slate-text hover:text-navy focus-visible:ring-2 focus-visible:ring-navy focus-visible:outline-none transition-colors cursor-pointer"
                      >
                        {t("nav.solutions")}
                      </button>
                    </div>

                    {/* "Contact Us" button on the right */}
                    <div className="pl-0.5 sm:pl-1">
                      <button
                        id="nav-get-in-touch"
                        onClick={() => scrollToSection("contact")}
                        aria-label="Scroll to secure communication form"
                        className="flex items-center gap-0.5 sm:gap-1 bg-white px-3 sm:px-5 py-2 rounded-full text-[10.5px] sm:text-[12px] font-semibold text-navy whitespace-nowrap border border-slate-200/60 shadow-sm hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-navy focus-visible:outline-none transition-all cursor-pointer"
                      >
                        {t("nav.contactUs")}
                        <ChevronRight className="w-3.5 h-3.5 text-navy" aria-hidden="true" />
                      </button>
                    </div>
                  </motion.nav>
                </div>
              </section>

              {/* 5. Seamless Marquee Logo Scroller Component */}
              <div className="w-full max-w-[1400px] mt-10" id="scroller-container">
                <MarqueeScroller />
              </div>

              {/* 6. About The Shield Corporation Section */}
              <AboutSection />

              {/* 7. Services Catalog Section */}
              <ServicesSection onNavigateToService={navigateToService} />

              {/* 8. Enterprise Solutions Section */}
              <SolutionsSection onNavigateToSolution={navigateToService} />

              {/* 9. Compact Store discovery module */}
              <StorePromoSection onNavigate={navigateToPath} />

              {/* 10. Value Pillars & Business Impact Stats */}
              <WhyChooseUs />

              {/* 11. Client Testimonials Section */}
              <TestimonialsSection />

              {/* 12. Secure Contact Dashboard Section */}
              <ContactSection />
        </div>
      </main>

      {/* 12. Corporate Footer Section */}
      <FooterSection />

      {/* 13. Persistent Interactive Floating Assistant */}
      <Chatbot />

    </div>
  );
}
