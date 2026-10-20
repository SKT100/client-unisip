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
      <div className="flex flex-col gap-12 sm:gap-20 lg:gap-28">
        <AboutHero />
        <OurStorySection />
        <OurBeliefSection />
        <BlogSection />
        <FAQSection />
      </div>
    </PageShell>
  );
}