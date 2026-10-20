import React from 'react';
import PageShell from '../components/layout/PageShell';
import HomeHero from '../components/sections/home/HomeHero';
import HomeAboutBanner from '../components/sections/home/HomeAboutBanner';
import BottleTypesCarousel from '../components/sections/shared/BottleCarrousal/BottleTypesCarousel';
import ProcessSection from '../components/sections/shared/ProcessSection/ProcessSection';
import BlogSection from '../components/sections/shared/BlogSection';
import FAQSection from '../components/sections/shared/FAQSection';
import TickerBanner from '../components/sections/shared/TickerBanner';
import WhereBrandShowsUpSection from '../components/sections/home/brandshowsup/WhereBrandShowsUpSection';
import StoryBannerSection from '../components/sections/home/StoryBannerSection';
import TestimonialSection from '../components/sections/shared/TestimonialSection/TestimonialSection';

export default function HomePage() {
  return (
    <PageShell maxWidth="max-w-[1680px]">
      <div className="flex flex-col gap-12 sm:gap-20 lg:gap-28">
        {/* Section 1: Hero Banner */}
        <HomeHero />
        <HomeAboutBanner />
        <BottleTypesCarousel />
        <ProcessSection />
        <TickerBanner />
        <WhereBrandShowsUpSection />
        <StoryBannerSection />
        <TestimonialSection />
        <BlogSection />
        <FAQSection />
      </div>
    </PageShell>
  );
}