"use client";

import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardOverview from "./DashboardOverview";
import AccountDetails from "./AccountDetails";
import ListBattery from "./ListBattery";
import SwapOrder from "./SwapOrder";
import RecentOrders from "./RecentOrders";
import ContactUs from "./ContactUs";

const DashboardMain: React.FC = () => {
  const [activeNav, setActiveNav] = useState("dashboard");

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardOverview />;
      case "account":
        return <AccountDetails />;
      case "list-battery":
        return <ListBattery />;
      case "Track-order":
        return <SwapOrder />;
      case "my-orders":
        return <RecentOrders />;
      case "contact":
        return <ContactUs />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden w-full">
      <img
        src="dashboardBg.svg"
        className="h-screen w-full scale-x-125 fixed -z-10"
        alt=""
      />
      <DashboardSidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main Content Area */}
      <div className="ml-64 flex-1 pt-24 px-8 pb-8 relative z-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardMain;
