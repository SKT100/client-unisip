import React, { useState } from 'react';
import PageShell from '../components/layout/PageShell';
import ActionCard from '../components/ui/ActionCard';
import PillButton from '../components/ui/PillButton';
import PillTag from '../components/ui/PillTag';

const images = '/images';

// Google Apps Script Web App URL & WhatsApp target number
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxF0fODcef_vfty3_Qg_z63CT28v-1xmqqqLbH2CfPUJws6FF8b12YFd3MAfr2P05k/exec';
const WHATSAPP_NUMBER = '917980258550';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: '',
  });

  const [isSubmittingSheet, setIsSubmittingSheet] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. Send via WhatsApp (Direct Chat with pre-filled template)
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setStatusMessage('Please fill in at least your Name and Phone number for WhatsApp.');
      return;
    }

    const message = `*NEW UNISIP ENQUIRY*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Company / Brand:* ${formData.company || 'N/A'}\n` +
      `*Requirement:* ${formData.requirement || 'N/A'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  // 2. Submit to Google Sheets via Webhook (using URLSearchParams for no-cors compatibility)
  const handleSheetSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setStatusMessage('Please fill in your Name and Phone number.');
      return;
    }

    setIsSubmittingSheet(true);
    setStatusMessage('');

    try {
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('phone', formData.phone);
      params.append('company', formData.company);
      params.append('requirement', formData.requirement);

      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      setStatusMessage('Thank you! Your details have been submitted successfully.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        requirement: '',
      });
    } catch (error) {
      console.error('Error submitting to Google Sheet:', error);
      setStatusMessage('Something went wrong. Please try again or reach out directly.');
    } finally {
      setIsSubmittingSheet(false);
    }
  };

  const contactItems = [
    {
      icon: 'email',
      label: 'enquiry.unisip@gmail.com',
      href: 'mailto:enquiry.unisip@gmail.com',
    },
    {
      icon: 'phone',
      label: '+91 8585034143',
      href: 'tel:+918585034143',
      dividerAfter: true,
    },
    {
      icon: 'address',
      label: '3/7 Girish Ghosh Road P.O Belurmath, nr. Rangoli Mall',
      subtext: 'West Bengal 711202',
    },
  ];

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-fira">

        {/* Header Section */}
        <header className="mb-12 sm:mb-16">
          <div className="mb-1.5 sm:mb-3">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              Contact
            </PillTag>
          </div>

          <h1 className="m-0 font-fira font-extrabold text-darkblue uppercase tracking-tight leading-[0.82] text-[48px] sm:text-[84px] lg:text-[130px] xl:text-[165px]">
            TELL US ABOUT
          </h1>

          <div className="-mt-2 sm:-mt-4 lg:-mt-6 inline-block relative bg-cream p-1.5 sm:p-2.5 lg:p-3 -rotate-[2.5deg] rounded-none shadow-none">
            <div className="relative bg-[#223856] text-cream font-fira font-extrabold uppercase leading-[0.823] tracking-tight text-[34px] sm:text-[64px] lg:text-[98px] xl:text-[126px] px-3 sm:px-5 lg:px-7 py-1.5 sm:py-2.5 lg:py-3 overflow-hidden whitespace-nowrap">
              <img
                src={`${images}/logo/water-texture.svg`}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none"
              />
              <span className="relative z-10">YOUR BRAND</span>
            </div>
          </div>
        </header>

        {/* Form + Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          {/* Contact Form Column */}
          <form className="lg:col-span-7 flex flex-col gap-6 font-fira">

            {/* NAME */}
            <div>
              <label className="block font-fira font-extrabold text-base sm:text-lg text-darkblue uppercase tracking-wide mb-2 leading-none">
                NAME *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="ENTER YOUR NAME"
                required
                className="w-full bg-cream border border-darkblue/30 rounded-full px-6 py-3 sm:py-3.5 font-fira font-semibold text-base sm:text-lg tracking-wider text-darkblue placeholder:text-darkblue/35 focus:outline-none focus:border-darkblue transition-colors"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block font-fira font-extrabold text-base sm:text-lg text-darkblue uppercase tracking-wide mb-2 leading-none">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="w-full bg-cream border border-darkblue/30 rounded-full px-6 py-3 sm:py-3.5 font-fira font-semibold text-base sm:text-lg tracking-wider text-darkblue placeholder:text-darkblue/35 focus:outline-none focus:border-darkblue transition-colors"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block font-fira font-extrabold text-base sm:text-lg text-darkblue uppercase tracking-wide mb-2 leading-none">
                PHONE *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="ENTER YOUR PHONE NUMBER"
                required
                className="w-full bg-cream border border-darkblue/30 rounded-full px-6 py-3 sm:py-3.5 font-fira font-semibold text-base sm:text-lg tracking-wider text-darkblue placeholder:text-darkblue/35 focus:outline-none focus:border-darkblue transition-colors"
              />
            </div>

            {/* COMPANY / BRAND */}
            <div>
              <label className="block font-fira font-extrabold text-base sm:text-lg text-darkblue uppercase tracking-wide mb-2 leading-none">
                COMPANY / BRAND
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="ENTER YOUR BRAND NAME"
                className="w-full bg-cream border border-darkblue/30 rounded-full px-6 py-3 sm:py-3.5 font-fira font-semibold text-base sm:text-lg tracking-wider text-darkblue placeholder:text-darkblue/35 focus:outline-none focus:border-darkblue transition-colors"
              />
            </div>

            {/* WHAT DO YOU NEED? */}
            <div>
              <label className="block font-fira font-extrabold text-base sm:text-lg text-darkblue uppercase tracking-wide mb-2 leading-none">
                WHAT DO YOU NEED?
              </label>
              <div className="w-full bg-cream border border-darkblue/30 rounded-[28px] p-3 overflow-hidden focus-within:border-darkblue transition-colors">
                <textarea
                  rows={5}
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  placeholder="TELL US ABOUT YOUR REQUIREMENT"
                  className="custom-scrollbar w-full bg-transparent px-3 py-1 font-fira font-semibold text-base sm:text-lg tracking-wider text-darkblue placeholder:text-darkblue/35 focus:outline-none resize-none overflow-y-auto break-words"
                />
              </div>
            </div>

            {/* Status Feedback Notification */}
            {statusMessage && (
              <p className="font-fira font-bold text-sm sm:text-base text-darkblue/90 bg-midblue/20 p-3 rounded-2xl border border-darkblue/20">
                {statusMessage}
              </p>
            )}

            {/* Dual Action Submit Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              
              {/* Option 1: Send / Submit to Google Sheets */}
              <PillButton
                onClick={handleSheetSubmit}
                disabled={isSubmittingSheet}
                type="button"
                variant="dark"
                size="md"
                logo={`${images}/logo/bottle-logo-mini.svg`}
                iconSize={22}
                className="!px-7 !py-3.5 !text-sm sm:!text-base uppercase tracking-wider font-extrabold"
              >
                {isSubmittingSheet ? 'SUBMITTING...' : 'SUBMIT FORM'}
              </PillButton>

              {/* Option 2: Send via WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-fira font-extrabold text-sm sm:text-base uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                Send via WhatsApp
              </button>

            </div>

          </form>

          {/* ActionCard Sidebar Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ActionCard
              title="LET'S MAKE IT HAPPEN"
              variant="dark"
              badgeHeader={true}
              items={contactItems}
            />
          </div>

        </div>
      </div>
    </PageShell>
  );
}