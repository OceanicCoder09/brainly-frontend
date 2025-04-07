import { BrainIcon } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YouTubeIcon } from "../../icons/YouTubeIcon";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { BlogIcon } from "../../icons/BlogIcon";
import { OtherIcon } from "../../icons/OtherIcon";
import { SidebarItem } from "./SidebarItem";
import { AllIcon } from "../../icons/AllIcon";
import { motion } from "framer-motion";

export function Sidebar({ onSelect }) {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 w-72 fixed left-0 top-0 flex flex-col shadow-sm z-10"
    >
      {/* Logo */}
      <div className="pt-8 pb-6 flex items-center px-6">
        <div className="mr-3 text-purple-600">
          <BrainIcon className="w-8 h-8" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent tracking-tight">
          Brainly
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto pb-8">
        {/* All */}
        <SidebarItem 
          icon={<AllIcon className="w-5 h-5" />} 
          text="All" 
          onClick={() => onSelect("All")}
          className="hover:bg-purple-50 hover:text-purple-700"
        />

        {/* Social Media */}
        <div className="pt-6 text-xs font-medium text-gray-500 pl-3 uppercase tracking-wider">Social</div>
        <SidebarItem 
          icon={<YouTubeIcon className="w-5 h-5 text-red-500" />} 
          text="YouTube" 
          onClick={() => onSelect("YouTube")}
          className="hover:bg-red-50 hover:text-red-700"
        />
        <SidebarItem 
          icon={<TwitterIcon className="w-5 h-5 text-blue-400" />} 
          text="Twitter" 
          onClick={() => onSelect("Twitter")}
          className="hover:bg-blue-50 hover:text-blue-700"
        />
        <SidebarItem 
          icon={<InstagramIcon className="w-5 h-5 text-pink-500" />} 
          text="Instagram" 
          onClick={() => onSelect("Instagram")}
          className="hover:bg-pink-50 hover:text-pink-700"
        />

        {/* Professional / Blogs */}
        <div className="pt-6 text-xs font-medium text-gray-500 pl-3 uppercase tracking-wider">Professional</div>
        <SidebarItem 
          icon={<LinkedInIcon className="w-5 h-5 text-blue-600" />} 
          text="LinkedIn" 
          onClick={() => onSelect("LinkedIn")}
          className="hover:bg-blue-50 hover:text-blue-700"
        />
        <SidebarItem 
          icon={<BlogIcon className="w-5 h-5 text-green-500" />} 
          text="Blog" 
          onClick={() => onSelect("Blog")}
          className="hover:bg-green-50 hover:text-green-700"
        />

        {/* Misc */}
        <div className="pt-6 text-xs font-medium text-gray-500 pl-3 uppercase tracking-wider">Other</div>
        <SidebarItem 
          icon={<OtherIcon className="w-5 h-5 text-gray-500" />} 
          text="Other" 
          onClick={() => onSelect("Other")}
          className="hover:bg-gray-50 hover:text-gray-700"
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        <div className="flex justify-between items-center">
          <span>Brainly v1.0</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </motion.div>
  );
}