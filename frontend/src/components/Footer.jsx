import { Mail, Phone, MapPin, Globe, MessageCircleMore, ArrowUp, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--navy-900)] text-[var(--cream-50)] border-t border-white/10 w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-bold tracking-tight">Mwiti Bakers</h2>
          <p className="text-xs sm:text-sm text-white/70">
            Home of Sweetness — Where We Make Memories.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2 text-[var(--cream-50)]">
            <a
              href="tel:+254757365203"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Call Mwiti Bakers"
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              <Phone size={18} />
            </a>
            <a
              href="https://wa.me/254757365203"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              <MessageCircleMore size={18} />
            </a>
            <a
              href="https://www.facebook.com/mwiti.bakers/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/mwiti_bakers/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/mwiti-bakers/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.pinterest.com/mwiti_bakers/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12c0-2.5 2-4.5 4.5-4.5S17 9.5 17 12c0 1.5-.5 2.5-1.5 3.5-.5.5-1 .5-1.5.5h-1c-.5 0-.5-.5-.5-1v-2"/>
              </svg>
            </a>
            <a
              href="https://mwitibakers.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="hover:text-[var(--accent-gold)] transition-colors"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-center sm:text-left">
          <h3 className="text-base font-semibold">Contact Us</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Mail size={14} /> mwitibakers@gmail.com
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone size={14} /> Embu: +254 757 365 203
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone size={14} /> Makueni: +254713552374
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin size={14} /> Embu &amp; Makueni, Kenya
            </li>
          </ul>
        </div>

        {/* Mission */}
        <div className="space-y-3 text-center sm:text-left">
          <h3 className="text-base font-semibold">Our Mission</h3>
          <p className="text-sm text-white/75 leading-relaxed">
            To make high-quality bakery products made with passion, integrity, and care—delivering unforgettable taste and freshness that keep celebrations sweet.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={handleScrollTop}
        className="fixed right-4 bottom-20 md:bottom-6 bg-white text-[var(--navy-900)] p-2 rounded-full shadow-md transition hover:shadow-lg hover:-translate-y-0.5 z-50"
        aria-label="Back to Top"
      >
        <ArrowUp size={16} />
      </button>

      <div className="text-center text-xs text-white/50 py-3 border-t border-white/10">
        &copy; {new Date().getFullYear()} Mwiti Bakers. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
