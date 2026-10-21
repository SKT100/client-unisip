import React, { useState } from 'react';
import PageShell from '../components/layout/PageShell';
import ActionCard from '../components/ui/ActionCard';
import PillButton from '../components/ui/PillButton';
import PillTag from '../components/ui/PillTag';

const images = '/images';

// Google Apps Script Web App URL & WhatsApp target number
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxF0fODcef_vfty3_Qg_z63CT28v-1xmqqqLbH2CfPUJws6FF8b12YFd3MAfr2P05k/exec';
const WHATSAPP_NUMBER = '918585034143';

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
        <header className="mb-8 sm:mb-12">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-6 sm:mb-10">

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

              {/* Option 2: Send via WhatsApp with Official WhatsApp SVG Logo */}
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-fira font-extrabold text-sm sm:text-base uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                {/* Official Crisp WhatsApp SVG Icon */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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