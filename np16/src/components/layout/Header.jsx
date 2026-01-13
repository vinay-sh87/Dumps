import { Menu, X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export const Header = () => {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        {
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        }
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 hidden sm:block">
            John Doe
          </span>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
        </div>
      </header>
    </>
  );
};
