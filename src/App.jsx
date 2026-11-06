import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/utils/SmoothScroll';
import LiquidLoader from './components/ui/LiquidLoader';

// Dynamic route code-splitting with preloading support
const loadHomePage = () => import('./pages/HomePage');
const loadAboutPage = () => import('./pages/AboutPage');
const loadWorkPage = () => import('./pages/WorkPage');
const loadContactPage = () => import('./pages/ContactPage');
const loadBlogPage = () => import('./pages/BlogPage');
const loadBlogDetailPage = () => import('./components/sections/blog/BlogDetailPage');
const loadTermsPage = () => import('./pages/TermsPage');
const loadNotFoundPage = () => import('./pages/NotFoundPage');

const HomePage = lazy(loadHomePage);
const AboutPage = lazy(loadAboutPage);
const WorkPage = lazy(loadWorkPage);
const ContactPage = lazy(loadContactPage);
const BlogPage = lazy(loadBlogPage);
const BlogDetailPage = lazy(loadBlogDetailPage);
const TermsPage = lazy(loadTermsPage);
const NotFoundPage = lazy(loadNotFoundPage);

function AppContent() {
  const location = useLocation();

  // Holds the rendered route until the water encapsulation covers the screen
  const [displayLocation, setDisplayLocation] = useState(location);
  const pendingLocationRef = useRef(location);

  const [loaderState, setLoaderState] = useState({
    active: true,
    mode: 'initial',
    key: 0,
  });

  // Warm up route chunks in idle time so page switches have 0ms suspense lag
  useEffect(() => {
    const timer = setTimeout(() => {
      loadHomePage();
      loadAboutPage();
      loadWorkPage();
      loadContactPage();
      loadBlogPage();
      loadBlogDetailPage();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.pathname !== pendingLocationRef.current.pathname) {
      pendingLocationRef.current = location;
      setLoaderState((prev) => ({
        active: true,
        mode: 'transition',
        key: prev.key + 1,
      }));
    } else {
      setDisplayLocation(location);
    }
  }, [location]);

  // Swaps the route underneath while the screen is 100% encapsulated
  const handleScreenCovered = () => {
    setDisplayLocation(pendingLocationRef.current);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleTransitionComplete = () => {
    setLoaderState((prev) => ({ ...prev, active: false }));
  };

  return (
    <>
      <LiquidLoader
        active={loaderState.active}
        mode={loaderState.mode}
        triggerKey={loaderState.key}
        onCovered={handleScreenCovered}
        onComplete={handleTransitionComplete}
      />

      <SmoothScroll>
        <Suspense fallback={<div className="min-h-screen bg-cream" />}>
          <Routes location={displayLocation}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SmoothScroll>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}