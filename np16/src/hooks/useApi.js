import { BarChart3, DollarSign, TrendingUp, User } from "lucide-react";
import { useEffect, useState } from "react";

export const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockData = {
          stats: [
            {
              id: 1,
              title: "Total Revenue",
              value: "$45,231",
              change: "+20.1%",
              icon: DollarSign,
            },
            {
              id: 2,
              title: "Total Users",
              value: "2,345",
              change: "+12.5%",
              icon: User,
            },
            {
              id: 3,
              title: "Active Now",
              value: "573",
              change: "+8.2%",
              icon: TrendingUp,
            },
            {
              id: 4,
              title: "Conversion",
              value: "24.5%",
              change: "+4.3%",
              icon: BarChart3,
            },
          ],
          chartData: [
            { name: "Jan", value: 4000, users: 2400 },
            { name: "Feb", value: 3000, users: 1398 },
            { name: "Mar", value: 2000, users: 9800 },
            { name: "Apr", value: 2780, users: 3908 },
            { name: "May", value: 1890, users: 4800 },
            { name: "Jun", value: 2390, users: 3800 },
          ],
          activities: [
            {
              id: 1,
              user: "John Doe",
              action: "Created new project",
              time: "2 hours ago",
            },
            {
              id: 2,
              user: "Jane Smith",
              action: "Updated dashboard",
              time: "4 hours ago",
            },
            {
              id: 3,
              user: "Mike Johnson",
              action: "Completed task",
              time: "6 hours ago",
            },
          ],
        };
        setData(mockData[endpoint] || []);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};
