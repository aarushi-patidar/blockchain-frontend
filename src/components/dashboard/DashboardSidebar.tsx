"use client";

import React from "react";
import {
  User,
  Battery,
  ArrowRightLeft,
  ShoppingCart,
  HelpCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

interface DashboardSidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeNav,
  setActiveNav,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "account", label: "Account Details", icon: User },
    { id: "list-battery", label: "List a Battery", icon: Battery },
    { id: "Track-order", label: "Track-order", icon: ArrowRightLeft },
    { id: "my-orders", label: "My Orders", icon: ShoppingCart },
    { id: "contact", label: "Contact Us", icon: HelpCircle },
  ];

  const externalLinks = [
    { label: "Scan Battery", href: "/ocr", icon: "Scan" },
    { label: "Health Status", href: "/health", icon: "Activity" },
    { label: "NFT Management", href: "/nft", icon: "Zap" },
  ];

  return (
    <div className="w-64 h-[70vh] mt-30 ml-5 glass-scrollbar-bold fixed left-0 top-0 rounded-3xl bg-black/60 backdrop-blur-md border-r border-cyan-400/20 ml-0 flex flex-col shadow overflow-y-auto">
      <div className="flex-1 px-4 py-8">
        <h2 className="font-avant text-2xl italic font-semibold mb-8">
          DASHBOARD
        </h2>
        <nav className="space-y-2 mb-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-avant">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* External Links Section */}
        <div className="border-t border-cyan-400/20 pt-6">
          <p className="text-xs text-gray-500 font-avant uppercase mb-3 px-4">
            Tools
          </p>
          <nav className="space-y-2">
            {externalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-cyan-400/10 transition-all"
              >
                <span className="w-5 h-5 flex items-center justify-center text-cyan-400">
                  •
                </span>
                <span className="text-sm font-avant">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="px-4 pb-8 border-t border-cyan-400/20 pt-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-avant">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
