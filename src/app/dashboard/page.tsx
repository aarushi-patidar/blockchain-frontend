import React from "react";
import DashboardMain from "@/components/dashboard/DashboardMain";

const page = () => {
  return (
    <div className="relative">
      <img src="dashboardBg.svg" className="fixed -z-10 w-full h-full" alt="" />
      <DashboardMain />
    </div>
  );
};

export default page;
