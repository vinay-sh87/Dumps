import { Facebook, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#262626" }}>
        <div className="container">
          <div className="row py-4">
            <div className="col-md-6">
              <div>
                <h5 className="fw-bold text-white pb-1">
                  Many desktop publishing
                </h5>
                <p className="me-5" style={{ color: "#555", fontSize: "15px" }}>
                  Do you want to receive exclusive email offers? Subscribe to
                  our newsletter! You will receive a unique promo code which
                  gives you a 20% discount on all our products in 10 minutes.
                </p>
              </div>
            </div>
            <div className="col-md-6 my-auto">
              <div className="ms-5">
                <div className="input-group d-flex gap-3">
                  <input
                    className="form-control px-4 py-3 rounded-0 "
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button
                    className="btn text-white rounded-0 px-5 fw-semibold"
                    style={{ backgroundColor: "#BD744C" }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <hr className="mb-4 mt-2 text-white" />
          </div>
          <div className="row">
            <div className="col-md-5">
              <div>
                <h4 className="text-white mb-4">Flatlogic.</h4>
                <p className="text-white" style={{ fontSize: "15px" }}>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s,
                </p>
                <div className="footer-icons d-flex flex-column gap-2">
                  <Mail color="white" size={20} />
                  <Twitter color="white" size={20} />
                  <Linkedin color="white" size={20} />
                  <Facebook color="white" size={20} />
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <h5 className="text-white text-uppercase mb-4">Company</h5>
                    <a className="footer-links mb-2" href="#">
                      What We Do
                    </a>
                    <a className="footer-links mb-2" href="#">
                      Available Services
                    </a>
                    <a className="footer-links mb-2" href="#">
                      Latest Posts
                    </a>
                    <a className="footer-links mb-2" href="#">
                      FAQs
                    </a>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <h5 className="text-white text-uppercase mb-4">
                      my account
                    </h5>
                    <a className="footer-links mb-2" href="#">
                      Sign In
                    </a>
                    <a className="footer-links mb-2" href="#">
                      View Cart
                    </a>
                    <a className="footer-links mb-2" href="#">
                      Order Tracking
                    </a>
                    <a className="footer-links mb-2" href="#">
                      Help & Support
                    </a>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <h5 className="text-white text-uppercase mb-4">
                      customer service
                    </h5>
                    <a className="footer-links mb-2" href="#">
                      Help & Contact Us
                    </a>
                    <a className="footer-links mb-2" href="#">
                      Returns & Refunds
                    </a>
                    <a className="footer-links mb-2" href="#">
                      Online Stores
                    </a>
                    <a className="footer-links mb-2" href="#">
                      Terms & Conditions
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <hr className="text-white my-4" />
            <p className="" style={{ fontSize: "15px", color: "#555" }}>
              © 2020-2025 powered by Flatlogic
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
