import { BarChart, Home, Icon, Settings } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export const Sidebar = () => {
  const { sidebarOpen, currentPage, setCurrentPage } = useAppContext();
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (!sidebarOpen) return null;

  return (
    <>
      <aside className="w-64 bg-gray-900 text-white p-6 flex-shrink-0">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Logo</h2>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 
                transition-colors
                ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}
              `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
