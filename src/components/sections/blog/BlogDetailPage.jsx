import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageShell from '../../layout/PageShell';
import BlogCard from './BlogCard';
import ActionCard from '../../ui/ActionCard';
import PillButton from '../../ui/PillButton';
import PillTag from '../../ui/PillTag';
import { BLOG_POSTS } from '../../../data/blogs';

const fallbackImage = '/images/hand-bottle-about.webp';

function DashedDivider() {
  return (
    <div className="w-full my-10 sm:my-14">
      <svg
        className="w-full h-1 text-darkblue/20"
        viewBox="0 0 1200 4"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="2"
          x2="1200"
          y2="2"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="12 8"
        />
      </svg>
    </div>
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = currentIndex !== -1 ? BLOG_POSTS[currentIndex] : BLOG_POSTS[0];

  const prevPost =
    currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : BLOG_POSTS[BLOG_POSTS.length - 1];
  const nextPost =
    currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : BLOG_POSTS[0];

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <PageShell>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center font-fira">
          <h2 className="heading-mid text-darkblue">Article Not Found</h2>
          <button
            onClick={() => navigate('/blog')}
            className="mt-6 bg-darkblue text-cream text-micro px-6 py-2.5 rounded-full"
          >
            Back to All Blogs
          </button>
        </div>
      </PageShell>
    );
  }

  // Social share items array for ActionCard
  const shareItems = [
    {
      icon: 'x',
      label: 'X / TWITTER',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`,
    },
    {
      icon: 'instagram',
      label: 'INSTAGRAM',
      href: 'https://instagram.com/unisip.in',
    },
    {
      icon: 'facebook',
      label: 'FACEBOOK',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    },
  ];

  return (
    <PageShell>
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-fira">
        
        {/* Top Header Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-2 mb-4">
          <div className="mb-1.5 sm:mb-3">
            <PillTag variant="dark" size="md" rotate="-rotate-[0deg]">
               {post.category}
            </PillTag>
          </div>
          <div className="mb-1.5 sm:mb-3">
            <PillTag variant="dark" size="md" rotate="-rotate-[0deg]">
               {post.publishDate}
            </PillTag>
          </div>
        </div>

        {/* Article Title Headline */}
        <h1 className="heading-display text-midblue mb-8 max-w-5xl">
          {post.title}
        </h1>

        {/* Main Hero Cover Image */}
        <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-[#D9D9D9] rounded-[28px] sm:rounded-[40px] overflow-hidden mb-12 shadow-md">
          <img
            src={post.image || fallbackImage}
            alt={post.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
          />
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Article Body Column */}
          <div className="lg:col-span-8 text-darkblue">
            
            <h2 className="heading-semi-big text-darkblue mb-2">
              Brewing A Perfect Impression
            </h2>

            <h3 className="heading-small text-midblue mb-4">
              The Importance of Freshness &amp; Detail
            </h3>

            <p className="text-general text-darkblue/85 mb-8">
              {post.excerpt} A crucial part of turning any everyday physical touchpoint into an unforgettable brand experience lies in intentional design. When your clients or guests hold a custom bottle, every tactile interaction—from the weight in hand to the label texture—leaves a lasting imprint.
            </p>

            <h3 className="heading-small text-midblue mb-3">
              Brewing With Intention
            </h3>

            <p className="text-general text-darkblue/85 mb-8">
              Every brand has a unique story. Tailoring physical packaging ensures that your visual identity translates seamlessly into reality. Choose colors, typography, and finishes that resonate with your target audience.
            </p>

            {/* DYNAMIC 2-IMAGE INLINE GALLERY GRID */}
            {post.subImages && post.subImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-8">
                {post.subImages.map((subImg, idx) => (
                  <div
                    key={idx}
                    className="aspect-[4/3] bg-[#D9D9D9] rounded-[24px] overflow-hidden shadow-sm group"
                  >
                    <img
                      src={subImg}
                      alt={`${post.title} detail photo ${idx + 1}`}
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <h2 className="heading-semi-big text-darkblue mb-2">
              The Importance of Freshness
            </h2>

            <p className="text-general text-darkblue/85 mb-8">
              Freshly packaged mineral water is about more than just hydration—it's a statement of quality. Premium filtration and pristine packaging demonstrate uncompromising attention to detail for your guests and clients.
            </p>

            <h2 className="heading-semi-big text-darkblue mb-2">
              Brewing With Intention
            </h2>

            <h3 className="heading-small text-midblue mb-3">
              Water Makes A Difference
            </h3>

            <p className="text-general text-darkblue/85 mb-6">
              Water is the core ingredient. Paying attention to water purity ensures a crisp, refreshing taste that enhances your brand's reputation at every event or hospitality lounge.
            </p>

            <h3 className="heading-small text-midblue mb-3">
              Balance Time And Temperature
            </h3>

            <p className="text-general text-darkblue/85">
              Delivering chilled, beautifully branded water creates an instant sense of care and luxury.
            </p>

          </div>

          {/* Reusable ActionCard Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28">
              <ActionCard
                title="SHARE THIS POST"
                variant="light"
                items={shareItems}
              />
            </div>
          </aside>

        </div>

        {/* Prev / Next Article Navigation */}
        <div className="flex items-center justify-between gap-4 pt-10">
          <Link
            to={`/blog/${prevPost.slug}`}
            className="inline-flex items-center gap-2 bg-darkblue text-cream hover:bg-midblue px-5 py-2.5 rounded-full text-micro transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span>PREV POST</span>
          </Link>

          <Link
            to={`/blog/${nextPost.slug}`}
            className="inline-flex items-center gap-2 bg-darkblue text-cream hover:bg-midblue px-5 py-2.5 rounded-full text-micro transition-colors duration-200"
          >
            <span>NEXT POST</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        {/* Dashed Separator */}
        <DashedDivider />

        {/* Related Posts Section */}
        <section className="mb-16">

          <div className="flex items-center justify-between gap-4 mb-8">
            <h3 className="heading-semi-big text-darkblue">
              Related Post
            </h3>
            <PillButton
              to="/blog"
              variant="dark"
              size="sm"
              logo="/images/logo/bottle-logo-mini.svg"
              iconSize={20}
              className="!px-5 !py-2 text-micro"
            >
              VIEW ALL
            </PillButton>
          </div>

          {/* 3 Related Article Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedPosts.map((related) => (
              <BlogCard key={related.id} post={related} />
            ))}
          </div>

        </section>

      </article>
    </PageShell>
  );
}