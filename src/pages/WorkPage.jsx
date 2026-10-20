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
      <div className="flex flex-col gap-12 sm:gap-20 lg:gap-28">
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