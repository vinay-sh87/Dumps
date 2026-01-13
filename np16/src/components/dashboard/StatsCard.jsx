import { Card } from "../common/Card";

export const StatsCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="text-blue-600" size="24" />
          </div>
        </div>
      </Card>
    </>
  );
};
