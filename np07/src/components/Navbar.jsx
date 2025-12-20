import { Search, ShoppingCart, User } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">
            <div className="logo fw-semibold fs-5 ">Flatlogic</div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto gap-4 mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>

              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle text-gray"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pages
                </a>
                <ul className="dropdown-menu border-0 rounded-0">
                  <li>
                    <a className="dropdown-item" href="#">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      About team
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      404
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Wishlist
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Login
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle  text-gray"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu border-0 rounded-0">
                  <li>
                    <a className="dropdown-item" href="#">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Account
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle  text-gray"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Blog
                </a>
                <ul className="dropdown-menu border-0 rounded-0">
                  <li>
                    <a className="dropdown-item" href="#">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Blog Article
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex gap-4" role="search">
              <a href="#" className="nav-icons text-decoration-none text-black">
                <Search size={16} />
              </a>
              <a href="#" className="nav-icons text-decoration-none text-black">
                <User size={16}/>
              </a>
              <a href="#" className="nav-icons text-decoration-none text-black">
                <ShoppingCart size={16}/>
              </a>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
