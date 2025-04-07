import React, { useRef, useState } from "react";
import axios from "axios";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../../config";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Twitter, Instagram, Linkedin, Globe, Link as LinkIcon } from "lucide-react";

const ContentType = {
  YouTube: "youtube",
  Twitter: "twitter",
  Instagram: "instagram",
  LinkedIn: "linkedin",
  Blog: "blog",
  Other: "other",
};

const typeIcons = {
  youtube: <Youtube className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  blog: <Globe className="w-5 h-5" />,
  other: <LinkIcon className="w-5 h-5" />,
};

// Softer color palette with better opacity values
const typeColors = {
  youtube: "bg-red-50/80 border-red-100/70 text-red-600/90",
  twitter: "bg-blue-50/80 border-blue-100/70 text-blue-600/90",
  instagram: "bg-pink-50/80 border-pink-100/70 text-pink-600/90",
  linkedin: "bg-sky-50/80 border-sky-100/70 text-sky-600/90",
  blog: "bg-green-50/80 border-green-100/70 text-green-600/90",
  other: "bg-purple-50/80 border-purple-100/70 text-purple-600/90",
};

export function CreateContentModal({ open, onClose, onContentAdded }) {
  const titleRef = useRef();
  const linkRef = useRef();
  const [type, setType] = useState(ContentType.YouTube);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addContent() {
    const title = titleRef.current.value.trim();
    const link = linkRef.current.value.trim();

    if (!title || !link) {
      alert("Please fill in both title and link.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}api/v1/content`, {
        title,
        link,
        type,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      titleRef.current.value = "";
      linkRef.current.value = "";
      onClose();
      if (onContentAdded) onContentAdded();
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop with softer opacity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}  // Reduced from 0.6 for better eye comfort
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-400/70 to-purple-500/70"  // Added opacity to gradient stops
            onClick={onClose}
          />

          {/* Modal with softer shadow */}
          <motion.div
            initial={{ scale: 0.95, y: 10 }}  // More subtle initial animation
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}  // Smoother spring animation
            className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg/30 w-full max-w-md overflow-hidden border border-white/20"  // Added glass morphism effect
          >
            {/* Header with softer border */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100/50">
              <h2 className="text-xl font-semibold text-gray-800/90">Add New Content</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100/50 transition"
              >
                <CrossIcon className="w-5 h-5 text-gray-500/80" />
              </button>
            </div>

            {/* Body with adjusted opacities */}
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <Input 
                  ref={titleRef} 
                  placeholder="Content title" 
                  icon={<span className="text-gray-400/80">#</span>}
                />
                <Input 
                  ref={linkRef} 
                  placeholder="Paste URL here" 
                  icon={<LinkIcon className="w-4 h-4 text-gray-400/80" />}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500/80 mb-3">CONTENT TYPE</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(ContentType).map(([label, value]) => (
                    <motion.button
                      key={value}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setType(value)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                        type === value 
                          ? `${typeColors[value]} border-current shadow-inner/30` 
                          : "bg-gray-50/70 border-gray-200/50 hover:bg-gray-100/60"
                      }`}
                    >
                      <div className={`p-2 rounded-full mb-2 ${
                        type === value ? "bg-white/90" : "bg-gray-200/70"
                      }`}>
                        {React.cloneElement(typeIcons[value], {
                          className: `w-4 h-4 ${type === value ? typeColors[value].split(' ')[2] : "text-gray-500/80"}`
                        })}
                      </div>
                      <span className="text-xs font-medium text-gray-700/90">{label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with subtle background */}
            <div className="px-6 py-4 bg-gray-50/40 flex justify-end space-x-3 border-t border-gray-100/30">
              <Button
                onClick={onClose}
                variant="secondary"
                text="Cancel"
                className="px-6 bg-white/80 hover:bg-gray-100/70"
              />
              <Button
                onClick={addContent}
                variant="primary"
                text={isSubmitting ? "Adding..." : "Add Content"}
                disabled={isSubmitting}
                className="px-6 bg-blue-500/90 hover:bg-blue-600/90"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Input component with improved focus states
const Input = React.forwardRef(({ placeholder, icon }, ref) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        ref={ref}
        placeholder={placeholder}
        type="text"
        className="pl-10 pr-4 py-3 w-full border border-gray-200/60 rounded-lg focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition bg-white/90 hover:bg-white"
      />
    </div>
  );
});