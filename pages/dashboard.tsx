import React from "react";
import Datalist from "@/components/dashboard/Datalist";
import Sidebar from "@/components/dashboard/Sidebar";
import { LayoutProps } from "@/type";
const Dashboard = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="flex justify-between ">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4">{children}</div>
      </div>
    </>
  );
};

export default Dashboard;
