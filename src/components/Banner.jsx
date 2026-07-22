"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Link } from "@heroui/react";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaBookOpen, 
  FaArrowRight,
  FaStar,
  FaUsers,
  FaDownload,
  FaUserCog,
  FaPenFancy,
  FaUser
} from "react-icons/fa";
import Image from "next/image";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Discover Your Next Great Read",
      subtitle: "For Readers - Browse thousands of ebooks",
      description: "Explore our vast collection of digital books across all genres. Find your next favorite read today!",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=400&fit=crop",
      cta: "Browse Ebooks",
      link: "/all-ebooks",
      gradient: "from-yellow-400/20 via-orange-400/10 to-red-600/20",
      role: "reader",
      stats: [
        { icon: FaBookOpen, value: "5K+", label: "Ebooks" },
        { icon: FaUsers, value: "100K+", label: "Readers" },
        { icon: FaDownload, value: "600K+", label: "Downloads" },
      ]
    },
    {
      id: 2,
      title: "Share Your Stories",
      subtitle: "For Writers - Publish your work",
      description: "Join our community of authors. Publish your books, reach millions of readers, and build your audience.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
      cta: "Publish Your Book",
      link: "/dashboard",
      gradient: "from-blue-400/20 via-purple-400/10 to-pink-600/20",
      role: "writer",
      stats: [
        { icon: FaPenFancy, value: "600+", label: "Authors" },
        { icon: FaStar, value: "4.8", label: "Avg Rating" },
        { icon: FaDownload, value: "50K+", label: "Copies Sold" },
      ]
    },
    {
  id: 3,
  title: "Track Your Reading Journey",
  subtitle: "For Readers - Personalized dashboard",
  description: "Track your reading progress, set goals, and discover personalized book recommendations based on your interests.",
  image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&h=400&fit=crop",
  cta: "View Dashboard",
  link: "/dashboard",
  gradient: "from-purple-400/20 via-pink-400/10 to-rose-600/20",
  role: "reader",
  stats: [
    { icon: FaBookOpen, value: "156", label: "Books Read" },
    { icon: FaStar, value: "4.8★", label: "Avg Rating" },
    { icon: FaUsers, value: "1.2K", label: "Reading Hours" },
    { icon: FaDownload, value: "45", label: "Books Saved" },
  ]
}
    
  ];

  useEffect(() => {
    let interval; NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index, number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getRoleIcon = (role, string) => {
    switch(role) {
      case 'reader': return FaUser;
      case 'writer': return FaPenFancy;
      case 'admin': return FaUserCog;
      default: return FaUser;
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0f] via-[#0a0a0f]/50 to-[#0a0a0f]" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            {/* Left Content */}
            <div className="space-y-6">
              {/* Role Badge */}
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full bg-linear-to-r ${slides[currentSlide].gradient} px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm border border-white/10`}>
                  {(() => {
                    const RoleIcon = getRoleIcon(slides[currentSlide].role);
                    return <RoleIcon size={14} />;
                  })()}
                  {slides[currentSlide].subtitle}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                {slides[currentSlide].title}
              </h1>

              <p className="text-lg text-white/60 md:text-xl max-w-lg">
                {slides[currentSlide].description}
              </p>

              <Button
                as={Link}
                href={slides[currentSlide].link}
                className="bg-linear-to-r from-yellow-400 to-red-600 text-black font-semibold px-8 py-6 text-lg rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-400/20 group"
              >
                <span className="flex items-center gap-2">
                  {slides[currentSlide].cta}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-6">
                {slides[currentSlide].stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="rounded-lg bg-white/5 p-2 border border-white/10">
                        <Icon className="text-yellow-400" size={20} />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-white/40">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-transparent">
                <Image src={slides[currentSlide].image} width={400} height={400} alt={slides[currentSlide].title} className="h-62.5 w-full object-cover md:h-87.5 lg:h-100"></Image>
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-transparent to-transparent" />
                <div className={`absolute inset-0 bg-linear-to-r ${slides[currentSlide].gradient} opacity-20`} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="rounded-full bg-white/5 p-3 text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/10"
          >
            <FaChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-linear-to-r from-yellow-400 to-red-600"
                    : "w-2 bg-white/20 hover:bg-white/40"
                } h-2 rounded-full`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="rounded-full bg-white/5 p-3 text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/10"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-400/20 to-transparent" />
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-yellow-400/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-red-600/5 blur-3xl" />
    </section>
  );
}