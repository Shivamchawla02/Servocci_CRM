import { DashboardProvider } from "../../context/DashboardContext";

import ApplicationOverview from "./summary/ApplicationOverview";
import CountryChart from "./summary/CountryChart";
import DashboardHeader from "./summary/DashboardHeader";
import PipelineSection from "./summary/PipelineSection";
import QuickActions from "./summary/QuickActions";
import RecentActivity from "./summary/RecentActivity";
import RecentApplications from "./summary/RecentApplications";
import StatsCards from "./summary/StatsCards";
import TopInstitutions from "./summary/TopInstitutions";

export default function AdminSummaryV2() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

function DashboardContent() {
  return (
    <div className="min-h-screen bg-[#F6F7FB] overflow-x-hidden">

      {/* Scaled Dashboard */}
      <div
        style={{
          transform: "scale(0.90)",       // Change between 0.88 - 0.95 as needed
          transformOrigin: "top left",
          width: "111.111%",              // 100 / 0.90
        }}
      >

        <div className="max-w-[1850px] mx-auto px-5 py-5">

          <DashboardHeader />

          <div className="mt-7">
            <StatsCards />
          </div>

          <div className="mt-7 grid grid-cols-12 gap-6">

            <div className="col-span-12 xl:col-span-9">
              <PipelineSection />
            </div>

            <div className="col-span-12 xl:col-span-3">
              <QuickActions />
            </div>

          </div>

          <div className="grid grid-cols-12 gap-6 mt-7">

            <div className="col-span-12 xl:col-span-3">
              <CountryChart />
            </div>

            <div className="col-span-12 xl:col-span-6">
              <ApplicationOverview />
            </div>

            <div className="col-span-12 xl:col-span-3">
              <TopInstitutions />
            </div>

          </div>

          <div className="grid grid-cols-12 gap-6 mt-7">

            <div className="col-span-12 xl:col-span-9">
              <RecentApplications />
            </div>

            <div className="col-span-12 xl:col-span-3">
              <RecentActivity />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}