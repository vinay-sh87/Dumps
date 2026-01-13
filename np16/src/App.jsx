import { Settings } from "./pages/Settings";
import { useAppContext } from "./context/AppContext";
import { Analytics } from "./pages/Analytics";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./components/layout/Layout";

export default function App() {
  const { currentPage } = useAppContext();
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <>
      <Layout>{renderPage()}</Layout>
    </>
  );
}
