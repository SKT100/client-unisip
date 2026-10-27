import React from 'react';
import SelectedWorkItem from './SelectedWorkItem';
import SplitReveal from '../../../ui/SplitReveal';

const images = '/images';

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'UNISIP LAUNCH',
    category: 'BRAND CAMPAIGN',
    subtitle: 'Unveiling the core identity through bespoke glass and plastic hydration formats.',
    mediaSrc: 'https://youtu.be/_Q5Olk-aXb0?si=HFbxtRp-0Myt__dP',
    mediaType: 'youtube',
  },
  {
    id: 2,
    title: "AQUA PARTNER AT XAVRANG'25",
    category: 'FESTIVAL PARTNERSHIP',
    subtitle: 'Custom branded bottles for thousands of college fest attendees and VIP lounges.',
    mediaSrc: 'https://youtu.be/2btSDWyi5oQ?si=16l4cRxqWUyjTLPs',
    mediaType: 'youtube',
  },
  {
    id: 3,
    title: 'UNISIP x Boat',
    category: 'CO-BRANDED DROP',
    subtitle: 'Limited edition high-impact matte black bottles crafted for product launch kits.',
    mediaSrc: `${images}/boat.webp`,
    mediaType: 'image',
  },
  {
    id: 4,
    title: 'Ashish Solanki trusts Unisip',
    category: 'CREATOR EDITION',
    subtitle: 'Exclusive backstage comedy tour bottles designed for live show audiences.',
    mediaSrc: `${images}/ashish_solanki.webp`,
    mediaType: 'image',
  },
];

export default function SelectedWorksSection({
  titleOutlined = 'SELECTED',
  titleSolid = 'WORKS',
  subtitle = "A look at a few brands, moments, and projects we've helped bring to life.",
  projects = DEFAULT_PROJECTS,
  className = '',
}) {
  return (
    <section className={`w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative ${className}`}>
      
      {/* Section Header with SplitReveal */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-16">
        <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.83] text-center">
          {titleOutlined && (
            <span className="block text-[48px] sm:text-[76px] lg:text-[104px] xl:text-[116px]">
              <SplitReveal
                delay={0.06}
                charStyle={{
                  WebkitTextStroke: '2.5px var(--color-darkblue)',
                  color: 'transparent',
                }}
              >
                {titleOutlined}
              </SplitReveal>
            </span>
          )}

          {titleSolid && (
            <span className="block text-darkblue text-[48px] sm:text-[76px] lg:text-[104px] xl:text-[116px] -mt-1 sm:-mt-3">
              <SplitReveal delay={0.22}>
                {titleSolid}
              </SplitReveal>
            </span>
          )}
        </h2>

        {subtitle && (
          <p className="mt-4 sm:mt-6 font-fira font-normal text-darkblue/80 text-sm sm:text-lg lg:text-xl leading-snug tracking-tight m-0 max-w-md text-center">
            {subtitle}
          </p>
        )}
      </div>

      {/* Synchronized Spotlight Scroll Track */}
      <div className="w-full flex flex-col items-center">
        {projects.map((project, idx) => (
          <SelectedWorkItem
            key={project.id || idx}
            title={project.title}
            subtitle={project.subtitle}
            category={project.category}
            mediaSrc={project.mediaSrc}
            mediaType={project.mediaType}
            isReversed={idx % 2 !== 0}
            index={idx}
            totalCount={projects.length}
          />
        ))}
      </div>

    </section>
  );
}