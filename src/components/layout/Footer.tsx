import React from 'react';
import { siteConfig } from '../../data/config';
import { footerText } from '../../data/content';

const Footer: React.FC = () => {
  return (
    <footer className="bg-night text-quartz/85 py-16 px-4 md:px-8" data-surface="dark">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display text-xl text-quartz mb-2">
              {siteConfig.brand.name}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-quartz/60 mb-4">
              {footerText.tagline}
            </p>
            <p className="font-sans text-sm text-quartz/70">
              {siteConfig.contact.address}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass mb-4">
              Navegação
            </p>
            <ul className="space-y-2">
              {[
                { label: 'Vitrine', href: '#vitrine' },
                { label: 'Intenções', href: '#intencoes' },
                { label: 'Monte sua joia', href: '#monte' },
                { label: 'A bancada', href: '#atelier' },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-quartz/70 hover:text-brass transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass mb-4">
              Contato
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-quartz/70 hover:text-brass transition-colors"
                  aria-label="WhatsApp da Cidinha"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-quartz/70 hover:text-brass transition-colors"
                >
                  {siteConfig.contact.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-sans text-sm text-quartz/70 hover:text-brass transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-quartz/10 pt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-quartz/40 text-center mb-2">
            {footerText.bottomStrip}
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-quartz/30 text-center">
            {footerText.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
