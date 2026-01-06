import LoginForm from "./components/LoginForm";
// import CartProvider from "./components/CartProvider";
import CustomHooks from "./components/CustomHooks";
import Layout from "./Layouts/Layout";

const App = () => {
  return (
    <>
      <LoginForm />
      {/* <CartProvider></CartProvider> */}
      <CustomHooks />
      <Layout />
    </>
  );
};
export default App;
