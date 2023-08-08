import { DashboardHeader } from "./DashboardHeader";
import React from "react";
import { Outlet } from "react-router-dom";

export function Dashboard(){
  return (
    <div className="d-flex flex-column flex-root app-root">
      <div className="app-page flex-column flex-column-fluid">
        <DashboardHeader />
        <div className="app-wrapper flex-column flex-row-fluid">
          <div className="app-main flex-column flex-row-fluid">
            <div className="d-flex flex-column flex-column-fluid">
              <div className="app-content flex-column-fluid py-3 py-lg-6">
                <div className="container">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
