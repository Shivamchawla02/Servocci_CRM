import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0b0f1a] text-gray-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* ================= BRAND ================= */}
        <div>
          <img
            src="/logoblack.png"
            alt="Servocci CRM"
            className="h-12 mb-4"
          />

          <p className="mb-4 text-sm leading-relaxed">
            Smarter CRM for high-performing EdTech teams. Manage leads,
            automate workflows, and scale your revenue with confidence.
          </p>

          {/* SOCIALS */}
          <div className="flex space-x-4 text-lg">
            <a href="https://www.facebook.com/share/17pZGe1Nas/" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/servocci/" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@SERVOCCI" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
            <a href="https://in.linkedin.com/company/servocci" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* ================= PRODUCT ================= */}
        <div>
          <h3 className="text-white font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Overview</Link></li>
            <li><Link to="/" className="hover:text-white">Features</Link></li>
            <li><Link to="/" className="hover:text-white">Integrations</Link></li>
            <li><Link to="/" className="hover:text-white">Pricing</Link></li>
          </ul>
        </div>

        {/* ================= SOLUTIONS ================= */}
        <div>
          <h3 className="text-white font-semibold mb-3">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li><span className="hover:text-white cursor-pointer">Lead Management</span></li>
            <li><span className="hover:text-white cursor-pointer">Call Tracking</span></li>
            <li><span className="hover:text-white cursor-pointer">Automation</span></li>
            <li><span className="hover:text-white cursor-pointer">Analytics</span></li>
          </ul>
        </div>

        {/* ================= COMPANY ================= */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://servocci.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Main Website
              </a>
            </li>
            <li><Link to="/" className="hover:text-white">About</Link></li>
            <li><Link to="/" className="hover:text-white">Blogs</Link></li>
            <li><Link to="/" className="hover:text-white">Careers</Link></li>
          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <div className="flex flex-col gap-2 text-sm">
            <div>
              📞{" "}
              <a href="tel:+919958219958" className="hover:text-white">
                +91-9958-21-9958
              </a>
            </div>

            <div>
              📧{" "}
              <a href="mailto:hello@servocci.com" className="hover:text-white">
                hello@servocci.com
              </a>
            </div>

            <div>
              🌐{" "}
              <a
                href="https://servocci.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                servocci.com
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM ================= */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

        <p>© 2026 Servocci CRM. All rights reserved.</p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-white">Privacy</Link>
          <Link to="/" className="hover:text-white">Terms</Link>
        </div>

      </div>
    </footer>
  );
}