"use client"
import { Link } from "@heroui/react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { 
  FaHeart, 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaArrowRight
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname=usePathname();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "FAQs", href: "/faqs" },
  ];

  const socialLinks = [
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (pathname?.includes('/dashboard')) {
    return null;
  }


  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="relative mt-16 border-t bg-[#0a0a0f]"
    >
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-yellow-400 to-transparent opacity-50" />

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-linear-to-br from-yellow-400/20 to-red-600/20 border border-white/10">
                <span className="text-2xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-red-600 bg-clip-text text-transparent">
                  EbookShop
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Your premium destination for digital books and e-learning resources. 
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1  text-white/70 hover:text-white">
                <FaHeart className="text-red-500 animate-pulse" size={12} />
                Made with love
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm transition-colors no-underline  text-white/70 hover:text-white"
                  >
                    <span className="h-0.5 w-0 linear-to-r from-yellow-400 to-red-600 group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4  text-white/70">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm transition-colors">
                <FaEnvelope className="mt-0.5 text-yellow-400" size={14} />
                <span>support@ebookshop.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm transition-colors">
                <FaPhone className="mt-0.5 text-yellow-400" size={14} />
                <span>+031 234567896</span>
              </li>
              <li className="flex items-start gap-3 text-sm transition-colors">
                <FaMapMarkerAlt className="mt-0.5 text-yellow-400" size={14} />
                <span>Agrabad, Chattogram, Bangladesh</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4  text-white/70">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Newsletter
            </h3>
            <p className="text-sm">
              Subscribe to get updates on new releases and special offers.
            </p>
            <form 
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg bg-white/5 px-4 py-3 pr-12 text-sm text-white  placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 border border-white/10 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg bg-linear-to-r from-yellow-400 to-red-600 p-2 text-black hover:scale-105 transition-all duration-300"
                >
                  <FaArrowRight size={14} />
                </button>
              </div>
            </form>
            <p className="text-xs text-white/70">
              No spam, unsubscribe anytime.
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row"
        >
          {/* Copyright */}
          <p className="text-sm text-white/70">
            &copy; {currentYear} EbookShop. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="group relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon 
                    size={18} 
                    className="text-white/40 group-hover:text-white transition-colors duration-300" 
                  />
                  <span className="absolute -inset-1 rounded-full bg-linear-to-r from-yellow-400/0 to-red-600/0 group-hover:from-yellow-400/10 group-hover:to-red-600/10 transition-all duration-500 blur-sm" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}