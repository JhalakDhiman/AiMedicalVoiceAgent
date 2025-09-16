import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#012434] to-[#012434] text-white py-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand / About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">AI Medical Voice Agent</h2>
          <p className="text-gray-200 text-sm leading-relaxed">
            Empowering healthcare with AI-driven voice consultations, 
            automated reports, and 24/7 medical support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Features</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>Email: support@aimedical.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Delhi, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} AI Medical Voice Agent. All rights reserved.
      </div>
    </footer>
  );
}
