// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../index.css";
import { Button } from "../components/ui/Button.jsx";
import { Card } from "../components/ui/Card.jsx";
import { PlusIcon } from "../icons/Plusicon.jsx";
import { ShareIcon } from "../icons/ShareIcon.jsx";
import { CreateContentModal } from "../components/ui/CreateContentModal.jsx";
import { Sidebar } from "../components/ui/Sidebar.jsx";
import useContent from "../hooks/useContent.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { LogoutIcon } from "../icons/LogoutIcons.jsx";
import { RefreshIcon } from "../icons/RefreshIcon.jsx";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const { contents, refresh, loading } = useContent();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredContents = contents.filter(({ link }) => {
    if (!link) return false;

    const l = link.toLowerCase();

    const matches = {
      YouTube: l.includes("youtube.com") || l.includes("youtu.be"),
      Twitter: l.includes("twitter.com") || l.includes("x.com"),
      Instagram: l.includes("instagram.com"),
      LinkedIn: l.includes("linkedin.com"),
      Blog:
        l.includes("blog") ||
        l.includes("medium.com") ||
        l.includes("hashnode.com") ||
        l.includes("dev.to"),
    };

    if (selectedType === "All") return true;
    if (selectedType === "Other") {
      return !Object.values(matches).some(Boolean);
    }

    return matches[selectedType] === true;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onSelect={setSelectedType} />

      <main className="flex-1 p-6 ml-72 transition-all duration-300">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedType === "All" ? "All Content" : `${selectedType} Content`}
          </h1>

          <div className="flex gap-3">
            <Button
              startIcon={<PlusIcon />}
              size="sm"
              text="Add Content"
              variant="primary"
              onClick={() => setModalOpen(true)}
              className="hover:scale-105 transition-transform"
            />

            <Button
              startIcon={<ShareIcon />}
              size="sm"
              text="Share"
              variant="secondary"
              className="hover:scale-105 transition-transform"
            />

            <Button
              startIcon={<RefreshIcon spinning={loading} />}
              size="sm"
              text={loading ? "Refreshing..." : "Refresh"}
              variant="secondary"
              onClick={refresh}
              disabled={loading}
              className="hover:scale-105 transition-transform"
            />

            <Button
              startIcon={<LogoutIcon />}
              size="sm"
              text="Logout"
              variant="danger"
              onClick={handleLogout}
              className="hover:scale-105 transition-transform"
            />
          </div>
        </header>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredContents.length > 0 ? (
              filteredContents.map(({ type, link, title }, index) => (
                <motion.div
                  key={link || index}
                  variants={item}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    type={type}
                    link={link}
                    title={title || "Untitled"}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No content available.</p>
                <p className="text-gray-400 mt-2">Click "Add Content" to get started</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Modal with auto-refresh */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onContentAdded={refresh}
        />
      </main>
    </div>
  );
}

export default Dashboard;
