"use client"
import { useState, useEffect } from "react";
import { Link, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBookOpen, 
  FaHome, 
  FaBook, 
  FaSignInAlt, 
  FaUserPlus,
  FaBars,
  FaTimes,
  FaLayerGroup
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session } = authClient.useSession();
  const userRole = session?.user?.role || "reader";

  const pathname= usePathname();
  
    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Don't render navbar on dashboard
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }


  

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: FaHome,
    },
    {
      name: "Browse Ebooks",
      path: "/all-ebooks",
      icon: FaBook,
    },
    {
      name: "Dashboard",
      path: '/dashboard',
      icon: FaLayerGroup,
    },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl shadow-2xl shadow-black/30"
          : "border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-lg"
      }`}
    >
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-yellow-400/20 to-red-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-linear-to-br from-yellow-400/20 to-red-600/20 border border-white/10">
                  <FaBookOpen className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-red-600 bg-clip-text text-transparent">
                  EbookShop
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.path}
                  className="group relative px-4 py-2 text-sm font-medium not-[]:transition-colors no-underline"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-yellow-400 to-red-600 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="group flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors no-underline"
          >
            <FaSignInAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Login
          </Link>
          <Link href="/register" className={"no-underline"}>
            <Button
            className="relative overflow-hidden bg-linear-to-r from-yellow-400 to-red-600 text-black font-semibold px-6 py-2.5 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-400/20 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaUserPlus className="w-4 h-4" />
              Sign Up
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-yellow-300 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          </Link>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="overflow-hidden border-t border-white/10 md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 p-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 no-underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 opacity-50" />
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4"
              >
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaSignInAlt className="w-5 h-5" />
                  Login
                </Link>
                <Link href="/register" className={"no-underline"}> 
                    <Button
                  className="w-full bg-linear-to-r from-yellow-400 to-red-600 text-black font-semibold py-3 rounded-lg hover:scale-[1.02] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserPlus className="w-5 h-5" />
                  Sign Up
                </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}