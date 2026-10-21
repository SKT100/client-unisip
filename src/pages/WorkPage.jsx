import React from 'react';
import PageShell from '../components/layout/PageShell';

import ChooseBottleSection from '../components/sections/work/ChooseBottleSection/ChooseBottleSection'
import WhereBrandShowsUpSection from '../components/sections/home/brandshowsup/WhereBrandShowsUpSection';
import TestimonialSection from '../components/sections/shared/TestimonialSection/TestimonialSection';
import FAQSection from '../components/sections/shared/FAQSection';
import BottleTypesCarousel from '../components/sections/shared/BottleCarrousal/BottleTypesCarousel';
import WorkHero from '../components/sections/work/WorkHero';
import SelectedWorksSection from '../components/sections/work/SelectedWorks/SelectedWorksSection';


export default function WorkPage() {
  return (
    <PageShell maxWidth="max-w-[1680px]">
      {/* Universal rhythm: 48px mobile | 64px tablet | 96px desktop */}
      <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
        <WorkHero />
        <BottleTypesCarousel />
        <WhereBrandShowsUpSection />
        <ChooseBottleSection />
        <SelectedWorksSection />
        <TestimonialSection />
        <FAQSection />
      </div>
    </PageShell>
  );
}