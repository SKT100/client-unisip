import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogDetailPage from './components/sections/blog/BlogDetailPage';
import ScrollToTop from './components/utils/ScrollToTop';
import SmoothScroll from './components/utils/SmoothScroll';

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Catch-All 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SmoothScroll>
    </Router>
  );
}