import { IdeasProvider } from "./lib/context/ideas";
import { UserProvider, useUser } from "./lib/context/user";
import Hero from "./pages/Hero";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  const isLoginPage = window.location.pathname === "/login";
  return (
    <>
      {/* <Home /> */}
      <UserProvider>
        <IdeasProvider>
          <Header />
          <main>{isLoginPage ? <Login /> : <Hero />}</main>
        </IdeasProvider>
      </UserProvider>
    </>
  );
}

function Header() {
  const user = useUser();

  return (
    <>
      <nav>
        <a href="/">Idea Tracker</a>
        <div>
          {user.current ? (
            <>
              <span>{user.current.email}</span>
              <button onClick={() => user.logout()}>Logout</button>
            </>
          ) : (
            <button onClick={() => (window.location.replace("/login"))}>
              Login
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
