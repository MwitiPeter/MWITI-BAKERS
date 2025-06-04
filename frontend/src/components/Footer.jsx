import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircleMore,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#F5E9FF] text-[#1E1B2F] border-t border-[#D7B8FB] mt-10 text-sm relative">
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Brand Info */}
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-bold">Acey Crochets</h2>
          <p className="text-xs">
            Handcrafted with love. Bringing warmth and style to every thread.
          </p>
          <div className="flex justify-center sm:justify-start space-x-3 pt-2 text-[#6A3D9A]">
            <a
              href="https://www.instagram.com/acey_crochets/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#4C9D6C] transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://acey-crochet.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="hover:text-[#4C9D6C] transition-colors"
            >
              <Globe size={18} />
            </a>
            <a
              href="https://wa.me/254713552374"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-[#4C9D6C] transition-colors"
            >
              <MessageCircleMore size={18} />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-base font-semibold">Contact Us</h3>
          <ul className="space-y-1">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Mail size={14} /> aceycrochets@gmail.com
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone size={14} /> +254713552374
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin size={14} /> Nairobi, Kenya
            </li>
          </ul>
        </div>

        {/* Mission */}
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-base font-semibold">Our Mission</h3>
          <p className="text-xs">
            Unique, quality crochet products that bring warmth, love & comfort
            to every home.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={handleScrollTop}
        className="absolute right-4 bottom-12 md:bottom-6 bg-[#6A3D9A] hover:bg-[#4C9D6C] text-white p-2 rounded-full shadow-md transition"
        aria-label="Back to Top"
      >
        <ArrowUp size={16} />
      </button>

      <div className="text-center text-xs text-gray-600 py-3 border-t border-[#D7B8FB]">
        &copy; {new Date().getFullYear()} Acey Crochets. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
