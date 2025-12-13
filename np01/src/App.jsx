import MyClass from "./components/MyClass";
import SearchBar from "./components/SearchBar";
import Tasks from "./components/Tasks";
import Toggle from "./components/Toggle";
import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <>
      <div className="main-container w-75 mx-auto my-5">
        <SearchBar />
        <Toggle />
        <Tasks />
        <UserProfile />
        <MyClass />
      </div>
    </>
  );
}
