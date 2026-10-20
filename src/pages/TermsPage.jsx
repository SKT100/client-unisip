import React from 'react';
import PageShell from '../components/layout/PageShell';

export default function TermsPage() {
  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hero Banner Card */}
        <section className="w-full bg-[#2D468A] text-[#F5F4EF] rounded-[28px] sm:rounded-[44px] lg:rounded-[60px] py-14 sm:py-20 lg:py-28 px-6 sm:px-12 text-center shadow-xl font-fira relative overflow-hidden">

          <h1 className="font-fira font-extrabold uppercase text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.85] text-white">
            Terms &<br />Conditions
          </h1>
          <p className="font-fira font-medium text-base sm:text-lg lg:text-xl text-white tracking-wider uppercase mt-6">
            Last Updated: October 2026
          </p>
        </section>

        {/* Legal Document Content Area */}
        <article className="mt-12 sm:mt-16 lg:mt-20 max-w-4xl mx-auto font-fira text-[#101A35] leading-relaxed">
          
          <p className="text-lg sm:text-xl font-medium text-[#101A35]/80 mb-10 border-l-4 border-[#39B8F2] pl-4 py-1">
            Welcome to UNISIP. Please read these Terms and Conditions carefully before engaging our services or placing an order for custom-branded water bottles. By accessing our platform or placing an order, you agree to be bound by these terms.
          </p>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="font-fira font-bold text-2xl sm:text-3xl text-[#101A35] uppercase border-b-2 border-[#101A35]/15 pb-2 mb-4">
              1. Overview & Service Scope
            </h2>
            <p className="text-base sm:text-lg text-[#101A35]/80 mb-3">
              UNISIP ("we", "us", "our") provides custom-packaged mineral water and custom-branded hydration products for corporate events, hospitality venues, retail brands, and private occasions.
            </p>
            <p className="text-base sm:text-lg text-[#101A35]/80">
              All quotes, production agreements, artwork proofs, and deliveries issued by UNISIP are subject to the terms outlined on this page.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="font-fira font-bold text-2xl sm:text-3xl text-[#101A35] uppercase border-b-2 border-[#101A35]/15 pb-2 mb-4">
              2. Custom Branding & Artwork Approvals
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-[#101A35]/80">
              <li>
                <strong>Artwork Submission:</strong> Clients must provide vector logo files (.AI, .EPS, .SVG, or high-res PDF) or high-density raster graphics matching UNISIP’s label print specifications.
              </li>
              <li>
                <strong>Digital Proof Sign-Off:</strong> Production will only begin after explicit written approval (via email or digital sign-off) of the final label design proof provided by UNISIP.
              </li>
              <li>
                <strong>Color Accuracy:</strong> While we utilize precision digital and offset printing, minor color variations between digital screens and physical labels on polypropylene/matte material may occur.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="font-fira font-bold text-2xl sm:text-3xl text-[#101A35] uppercase border-b-2 border-[#101A35]/15 pb-2 mb-4">
              3. Orders, Pricing & Payment Terms
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-[#101A35]/80">
              <li>
                <strong>Minimum Order Quantities (MOQ):</strong> Custom orders are subject to product-specific MOQs as indicated during quotation.
              </li>
              <li>
                <strong>Payment Schedule:</strong> A standard advance deposit (typically 50% to 100% depending on order size) is required upon order confirmation. Final balance must be settled prior to dispatch unless explicit credit terms have been granted in writing.
              </li>
              <li>
                <strong>Taxes & Invoicing:</strong> All prices quoted are exclusive of statutory GST and applicable logistics fees unless explicitly stated otherwise in the proforma invoice.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="font-fira font-bold text-2xl sm:text-3xl text-[#101A35] uppercase border-b-2 border-[#101A35]/15 pb-2 mb-4">
              4. Cancellations & Returns Policy
            </h2>
            <p className="text-base sm:text-lg text-[#101A35]/80 mb-3">
              Because all products feature custom client branding, <strong>orders cannot be cancelled or refunded once label printing or bottling has commenced</strong>.
            </p>
            <p className="text-base sm:text-lg text-[#101A35]/80">
              In the rare event of physical transit damage or manufacturing defects, clients must notify UNISIP within 48 hours of delivery with photo evidence. Verified defective items will be replaced or credited promptly.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="font-fira font-bold text-2xl sm:text-3xl text-[#101A35] uppercase border-b-2 border-[#101A35]/15 pb-2 mb-4">
              5. Shipping, Logistics & Storage
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-[#101A35]/80">
              <li>
                Estimated delivery timelines are provided in good faith. UNISIP is not liable for transport delays caused by weather conditions, traffic restrictions, or third-party courier disruptions.
              </li>
              <li>
                Clients are responsible for providing clear delivery location details and ensuring adequate unloading personnel or loading dock facilities at the destination address.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="font-fira font-bold text-2xl sm:text-3xl text-[#101A35] uppercase border-b-2 border-[#101A35]/15 pb-2 mb-4">
              6. Intellectual Property & Brand Rights
            </h2>
            <p className="text-base sm:text-lg text-[#101A35]/80 mb-3">
              You warrant that you hold all necessary trademarks, copyrights, and usage permissions for logos and graphics submitted to UNISIP. You agree to indemnify UNISIP against any third-party trademark or copyright claims arising from your custom label graphics.
            </p>
            <p className="text-base sm:text-lg text-[#101A35]/80">
              UNISIP reserves the right to photograph finished bottles for promotional usage in our portfolio, website, and marketing materials unless a written Non-Disclosure Agreement (NDA) is executed beforehand.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="font-fira font-bold text-2xl sm:text-3xl text-[#101A35] uppercase border-b-2 border-[#101A35]/15 pb-2 mb-4">
              7. Contact & Governing Law
            </h2>
            <p className="text-base sm:text-lg text-[#101A35]/80 mb-4">
              These terms are governed by the laws of India. Any legal disputes shall be subject to the exclusive jurisdiction of the courts in Howrah / Kolkata, West Bengal.
            </p>
            <div className="bg-[#101A35]/5 p-6 rounded-2xl border border-[#101A35]/10">
              <p className="font-bold text-lg text-[#101A35] mb-1">Have questions regarding our Terms?</p>
              <p className="text-base text-[#101A35]/80">
                Email us at{' '}
                <a href="mailto:hello@unisip.in" className="text-[#39B8F2] font-bold hover:underline">
                  hello@unisip.in
                </a>{' '}
                or call us at <span className="font-bold text-[#101A35]">+91 XXXXX XXXXX</span>.
              </p>
            </div>
          </section>

        </article>

      </div>
    </PageShell>
  );
}