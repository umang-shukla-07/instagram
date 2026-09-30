import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = [
    { label: 'Meta', href: 'https://about.meta.com/' },
    { label: 'About', href: 'https://about.instagram.com/' },
    { label: 'Blog', href: 'https://about.instagram.com/blog' },
    { label: 'Jobs', href: 'https://about.instagram.com/about-us/careers' },
    { label: 'Help', href: 'https://help.instagram.com/' },
    { label: 'API', href: 'https://developers.facebook.com/docs/instagram' },
    { label: 'Privacy', href: 'https://privacycenter.instagram.com/policy' },
    { label: 'Terms', href: 'https://help.instagram.com/581066165581870' },
    { label: 'Locations', href: 'https://www.instagram.com/explore/locations/' },
    { label: 'Instagram Lite', href: 'https://www.instagram.com/web/lite/' },
    { label: 'Threads', href: 'https://www.threads.net/' },
    { label: 'Contact Uploading & Non-Users', href: 'https://www.facebook.com/help/instagram/261704639352628' },
    { label: 'Meta Verified', href: 'https://about.meta.com/technologies/meta-verified/' },
  ];

  return (
    <footer className="w-full max-w-[1024px] mx-auto py-8 px-4 flex flex-col items-center text-xs text-[#737373]">
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 leading-relaxed">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors text-[12px]"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4 text-[12px]">
        <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-900 transition-colors">
          <span>English</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
        <span>© 2026 Instagram from Meta</span>
      </div>
    </footer>
  );
};
