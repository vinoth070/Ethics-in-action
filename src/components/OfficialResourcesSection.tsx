import React from 'react';
import { ExternalLink, Mail, Phone, MapPin, ShieldCheck, AlertCircle } from 'lucide-react';
import { OFFICIAL_RESOURCES, RESOURCES_DISCLAIMER } from '../data/officialResources';

interface OfficialResourcesSectionProps {
  compact?: boolean;
}

export const OfficialResourcesSection: React.FC<OfficialResourcesSectionProps> = ({
  compact = false,
}) => {
  return (
    <section
      id="official-resources"
      aria-labelledby="official-resources-heading"
      className={compact ? '' : 'py-16 sm:py-20'}
    >
      <div className={compact ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-[#2563EB] dark:text-[#EAB308]">
            Verified Institutional Directory · India
          </p>
          <h2
            id="official-resources-heading"
            className="mt-2 font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B162C] dark:text-white"
          >
            Official Ethics Resources &amp; Support
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Discover legitimate Indian statutory commissions, higher-education councils, and public
            grievance portals dedicated to ethical governance, academic integrity, and fair
            treatment.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {OFFICIAL_RESOURCES.map((org) => (
            <article
              key={org.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {org.acronym} · {org.category}
                    </p>
                    <h3 className="mt-1 font-editorial text-xl font-semibold text-[#0B162C] dark:text-white">
                      {org.name}
                    </h3>
                  </div>
                  <ShieldCheck
                    className="w-5 h-5 text-[#B47B1B] dark:text-[#EAB308] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {org.purpose}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  {org.contacts.map((contact) => (
                    <div key={`${org.id}-${contact.value}`} className="flex items-start gap-2.5 text-sm">
                      {contact.type === 'phone' ? (
                        <Phone className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                      ) : (
                        <Mail className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <div>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                          {contact.label}
                        </span>
                        <a
                          href={contact.href}
                          className="font-mono text-sm font-medium text-[#0B162C] dark:text-slate-100 hover:text-[#2563EB] dark:hover:text-[#EAB308] underline underline-offset-2"
                        >
                          {contact.value}
                        </a>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-2.5 text-sm pt-1">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {org.address}
                    </span>
                  </div>
                </div>

                {org.note && (
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Note: {org.note}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {org.websiteLabel}
                </span>
                <a
                  href={org.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#0B162C] hover:bg-[#1A2B4C] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Visit Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Verification Disclaimer */}
        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1426] p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#B47B1B] dark:text-[#EAB308] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {RESOURCES_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
};
