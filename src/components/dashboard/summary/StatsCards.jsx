import StatCard from "./StatCard";
import { useDashboard } from "../../../context/DashboardContext";

export default function StatsCards() {

  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!dashboard) return null;

  const totalLeads = Object.values(dashboard).reduce(
    (sum, value) => sum + Number(value || 0),
    0
  );

  const conversionRate =
    totalLeads > 0
      ? ((dashboard.Closed || 0) / totalLeads * 100).toFixed(1)
      : 0;

  const cards = [
    {
      title: "Total Leads",
      value: totalLeads,
      growth: "+0%"
    },
    {
      title: "Qualified",
      value: dashboard.Qualified || 0,
      growth: "+0%"
    },
    {
      title: "Follow-up",
      value: dashboard["Follow-up"] || 0,
      growth: "+0%"
    },
    {
      title: "Admissions Closed",
      value: dashboard.Closed || 0,
      growth: "+0%"
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      growth: "+0%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

      {cards.map((card) => (
        <StatCard
          key={card.title}
          {...card}
        />
      ))}

    </div>
  );
}