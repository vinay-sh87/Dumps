import { ChartComponent } from "../components/dashboard/ChartComponent";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { StatsCard } from "../components/dashboard/StatsCard";
import { useApi } from "../hooks/useApi";

export const Dashboard = () => {
  const { data: stats, loading: statsLoading } = useApi("stats");
  const { data: chartData } = useApi("chartData");
  const { data: activities } = useApi("activities");

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats?.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {chartData && <ChartComponent data={chartData} />}
        {activities && <RecentActivity activities={activities} />}
      </div>
    </>
  );
};
