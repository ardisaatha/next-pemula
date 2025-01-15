"use client";

import Sidebar from "./sidebar";


export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-5">
      <div className="w-full">
      <Sidebar />
      </div>
        
      <div
        className="col-span-4"
      >
        {children}
      </div>
    </div>
  );
}
