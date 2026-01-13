import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 p-6 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
};
