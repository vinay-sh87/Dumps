import HeroSlider from "../components/HeroSlider";
import Navbar from "../components/Navbar";
import Products from '../components/Products'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <div className="container py-5">
        <h4 className="text-center fw-bold">New Arrivals</h4>
        <p
          className="text-center py-2"
          style={{ fontSize: "15px", color: "#555" }}
        >
          Check out our new furniture collection! Cozy sofa, fancy chair, wooden
          casket, and many more. The new collection
          <br /> brings an informal elegance to your home.
        </p>
        <Products />
        <div className="row">
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
