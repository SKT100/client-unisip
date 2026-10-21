import React from 'react';
import PageShell from '../components/layout/PageShell';
import AboutHero from '../components/sections/about/AboutHero';
import OurStorySection from '../components/sections/about/OurStorySection';
import OurBeliefSection from '../components/sections/about/belief/OurBeliefSection';
import BlogSection from '../components/sections/shared/BlogSection';
import FAQSection from '../components/sections/shared/FAQSection';

export default function AboutPage() {
  return (
    <PageShell maxWidth="max-w-[1680px]">
      {/* Unified rhythm: 48px mobile | 64px tablet | 96px desktop */}
      <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
        <AboutHero />
        <OurStorySection />
        <OurBeliefSection />
        <BlogSection />
        <FAQSection />
      </div>
    </PageShell>
  );
}