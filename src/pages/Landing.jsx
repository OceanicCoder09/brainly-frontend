import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTwitter, FiYoutube, FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";
import { FaReddit, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const features = [
  {
    icon: <FaTwitter className="text-blue-400 text-4xl" />,
    title: "Twitter Capture",
    desc: "Save tweets, threads, and conversations directly from Twitter with our browser extension.",
  },
  {
    icon: <FaYoutube className="text-red-500 text-4xl" />,
    title: "YouTube Highlights",
    desc: "Clip and save key moments from videos with timestamps and personal notes.",
  },
  {
    icon: <FaInstagram className="text-pink-600 text-4xl" />,
    title: "Visual Bookmarks",
    desc: "Save Instagram posts, stories, and reels with full context and metadata.",
  },
  {
    icon: <FaLinkedinIn className="text-blue-600 text-4xl" />,
    title: "LinkedIn Insights",
    desc: "Capture valuable articles and posts from your professional network.",
  },
  {
    icon: <FaReddit className="text-orange-500 text-4xl" />,
    title: "Reddit Threads",
    desc: "Save entire Reddit discussions with comments and upvote tracking.",
  },
  {
    icon: <FiGithub className="text-gray-800 text-4xl" />,
    title: "Code Snippets",
    desc: "Save and organize GitHub repos, gists, and code examples with syntax highlighting.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const floatingIcons = [
  {
    icon: <FaTwitter className="text-blue-400" />,
    initial: { opacity: 0, x: -100, y: -50 },
    animate: { opacity: 0.7, x: 0, y: 0, rotate: [0, 10, -10, 0] },
    transition: { rotate: { repeat: Infinity, duration: 8, ease: "easeInOut" }, duration: 1 },
    className: "left-20 top-40 text-4xl"
  },
  {
    icon: <FaYoutube className="text-red-500" />,
    initial: { opacity: 0, x: 100, y: -100 },
    animate: { opacity: 0.8, x: 0, y: 0, scale: [1, 1.1, 1] },
    transition: { scale: { repeat: Infinity, duration: 6, ease: "easeInOut" }, duration: 1.2 },
    className: "right-32 top-60 text-5xl"
  },
  {
    icon: <FaInstagram className="text-pink-600" />,
    initial: { opacity: 0, y: 100, x: -50 },
    animate: { opacity: 0.7, y: 0, x: 0, rotate: [0, 360] },
    transition: { rotate: { repeat: Infinity, duration: 20, ease: "linear" }, duration: 1.5 },
    className: "left-1/3 bottom-20 text-6xl"
  },
  {
    icon: <FaLinkedinIn className="text-blue-600" />,
    initial: { opacity: 0, x: 150, y: 50 },
    animate: { opacity: 0.6, x: 0, y: 0, y: [0, -20, 0] },
    transition: { y: { repeat: Infinity, duration: 7, ease: "easeInOut" }, duration: 1.3 },
    className: "right-1/4 bottom-40 text-3xl"
  },
  {
    icon: <FaReddit className="text-orange-500" />,
    initial: { opacity: 0, x: -150, y: 150 },
    animate: { opacity: 0.5, x: 0, y: 0, x: [0, 15, 0] },
    transition: { x: { repeat: Infinity, duration: 9, ease: "easeInOut" }, duration: 1.7 },
    className: "left-1/4 top-1/3 text-5xl"
  }
];

export default function Landing() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-6 flex justify-between items-center backdrop-blur-sm bg-white/70 sticky top-0 z-50 shadow-sm"
      >
        <div className="flex items-center">
          <motion.div whileHover={{ rotate: 20, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
            <svg className="w-12 h-12 text-purple-600" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 10C25.1 10 5 30.1 5 55c0 15.9 8.2 29.9 20.7 38.1 1.3-12.9 11.6-23.1 24.3-23.1s23 10.3 24.3 23.1C86.8 84.9 95 70.9 95 55c0-24.9-20.1-45-45-45z" />
              <path d="M50 75c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z" fill="white" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold ml-2  bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">BRAINLY</h1>
        </div>
        <nav className="flex gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/signin" className="text-gray-700 hover:text-purple-600 transition-colors duration-300 px-4 py-2 rounded-full hover:bg-purple-100">
              Sign In
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 font-medium"
            >
              Sign Up
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 overflow-hidden">
          {floatingIcons.map((icon, index) => (
            <motion.div
              key={index}
              initial={icon.initial}
              animate={icon.animate}
              transition={icon.transition}
              className={`absolute ${icon.className}`}
            >
              {icon.icon}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={scaleUp}
            className="mb-12"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
              <svg className="w-20 h-20 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10C25.1 10 5 30.1 5 55c0 15.9 8.2 29.9 20.7 38.1 1.3-12.9 11.6-23.1 24.3-23.1s23 10.3 24.3 23.1C86.8 84.9 95 70.9 95 55c0-24.9-20.1-45-45-45z" />
                <path d="M50 75c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z" fill="white" />
              </svg>
            </div>
          </motion.div>

          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent leading-tight"
          >
            Capture Knowledge from Anywhere
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Save content from Twitter, YouTube, LinkedIn and more. Organize, connect and rediscover your digital knowledge.
          </motion.p>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 flex items-center"
              >
                <span>Get Started Free</span>
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/" 
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-purple-500 hover:text-purple-600 transition-all duration-300 flex items-center"
              >
                <span>See Demo</span>
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Save from Your Favorite Platforms
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our browser extension works seamlessly with all major platforms
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-100 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
              Ready to build your second brain?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of users who are saving and organizing their digital knowledge effortlessly.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full text-lg font-medium hover:shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-indigo-700"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <svg className="w-10 h-10 text-purple-600" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10C25.1 10 5 30.1 5 55c0 15.9 8.2 29.9 20.7 38.1 1.3-12.9 11.6-23.1 24.3-23.1s23 10.3 24.3 23.1C86.8 84.9 95 70.9 95 55c0-24.9-20.1-45-45-45z" />
                <path d="M50 75c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z" fill="white" />
              </svg>
              <h2 className="text-2xl font-bold ml-2 text-gray-800">BRAINLY</h2>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <FiYoutube className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <FiInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <FiLinkedin className="text-xl" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">© 2023 Second Brain. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}